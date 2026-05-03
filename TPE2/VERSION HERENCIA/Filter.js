class Filter {
    constructor(paint) {
        this.paint = paint;
    }

    getImageData() {
        return this.paint.ctx.getImageData(0, 0, this.paint.canvas.width, this.paint.canvas.height);
    }

    apply(imageData) {
        this.paint.ctx.putImageData(imageData, 0, 0);
    }

    //filtros

    //filtro de brillo
    aplicarFiltroBrillo(valorBrillo) {
        let imageData = this.getImageData();
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = Math.min(255, imageData.data[i] + valorBrillo);
            imageData.data[i + 1] = Math.min(255, imageData.data[i + 1] + valorBrillo);
            imageData.data[i + 2] = Math.min(255, imageData.data[i + 2] + valorBrillo);
        }
        this.apply(imageData);
    }

    //filtro escala de grises
    aplicarFiltroBN() {
        let imageData = this.getImageData();
        let index;
        let r, g, b;
        let promedio;

        for (let i = 0; i < canvas.height; i++) {
            for (let j = 0; j < canvas.width; j++) {
                index = (i * canvas.width + j) * 4;

                r = imageData.data[index];
                g = imageData.data[index + 1];
                b = imageData.data[index + 2];
                promedio = parseInt((r + g + b) / 3);

                imageData.data[index] = promedio;
                imageData.data[index + 1] = promedio;
                imageData.data[index + 2] = promedio;
            }
        }
        //genera la nueva imagen con el filtro aplicado
        this.apply(imageData);
    }

    //filtro para binarizar
    aplicarFiltroBinarizacion() {
        let imageData = this.getImageData();

        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                let index = (y * imageData.width + x) * 4;
                let r = imageData.data[index];
                let g = imageData.data[index + 1];
                let b = imageData.data[index + 2];
                let value = (r + g + b) / 3; // promedio
                //determina hasta que valor se vuelve blanco y hasta que valor se vuelve negro
                if (value < 128) {
                    value = 0;
                } else {
                    value = 255;
                }

                imageData.data[index] = value; // R
                imageData.data[index + 1] = value; // G
                imageData.data[index + 2] = value; // B
                // mantenemos el alfa igual
            }
        }
        this.apply(imageData);
    }

    //filtro sepia
    aplicarFiltroSepia() {
        let imageData = this.getImageData();
        for (let i = 0; i < imageData.data.length; i += 4) {
            let r = imageData.data[i];
            let g = imageData.data[i + 1];
            let b = imageData.data[i + 2];
            imageData.data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
            imageData.data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
            imageData.data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
        }
        this.apply(imageData);
    }

    //filtro negativo
    aplicarFiltroNegativo() {
        let imageData = this.getImageData();
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = 255 - imageData.data[i];
            imageData.data[i + 1] = 255 - imageData.data[i + 1];
            imageData.data[i + 2] = 255 - imageData.data[i + 2];
        }
        this.apply(imageData);
    }

    //filtro todo rojo
    aplicarFiltroRojo() {
        let imageData = this.getImageData();
        let index;
        let r;
        for (let y = 0; y < this.paint.canvas.height; y++) {
            for (let x = 0; x < this.paint.canvas.width; x++) {
                index = (y * this.paint.canvas.width + x) * 4;
                r = imageData.data[index];
                imageData.data[index] = r;
                imageData.data[index + 1] = 0;
                imageData.data[index + 2] = 0;
            }
        }
        this.apply(imageData);
    }

    //filtro todo verde
    aplicarFiltroVerde() {
        let imageData = this.getImageData();
        let index;
        let g;
        for (let y = 0; y < this.paint.canvas.height; y++) {
            for (let x = 0; x < this.paint.canvas.width; x++) {
                index = (y * this.paint.canvas.width + x) * 4;
                g = imageData.data[index];
                imageData.data[index] = 0;
                imageData.data[index + 1] = g;
                imageData.data[index + 2] = 0;
            }
        }
        this.apply(imageData);
    }

    //filtro todo azul
    aplicarFiltroAzul() {
        let imageData = this.getImageData();
        let index;
        let b;
        for (let y = 0; y < this.paint.canvas.height; y++) {
            for (let x = 0; x < this.paint.canvas.width; x++) {
                index = (y * this.paint.canvas.width + x) * 4;
                b = imageData.data[index];
                imageData.data[index] = 0;
                imageData.data[index + 1] = 0;
                imageData.data[index + 2] = b;
            }
        }
        this.apply(imageData);
    }

    // Filtro que difumina la imagen
    aplicarFiltroBlur() {
        let imageData = this.getImageData();
        let width = this.paint.canvas.width;
        let height = this.paint.canvas.height;
        let copiaimageData = this.paint.ctx.createImageData(width, height);

        let kernel = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ];
        let kernelSize = 3;
        let limit = Math.floor(kernelSize / 2);

        //estos son los valores de la matriz
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let sumR = 0, sumG = 0, sumB = 0;
                let index = (x + y * width) * 4;

                //estos son los valores del kernel
                for (let i = 0; i < kernelSize; i++) {
                    for (let j = 0; j < kernelSize; j++) {
                        let nY = y + i - limit;
                        let nX = x + j - limit;

                        //permite validar los limits del canvas
                        if (nX >= 0 && nX < width && nY >= 0 && nY < height) {
                            let offsetIndex = (nX + nY * width) * 4;
                            sumR += imageData.data[offsetIndex];
                            sumG += imageData.data[offsetIndex + 1];
                            sumB += imageData.data[offsetIndex + 2];
                        }
                    }
                }

                //normaliza el resultado segun la formula del kernel
                copiaimageData.data[index] = sumR / 9;
                copiaimageData.data[index + 1] = sumG / 9;
                copiaimageData.data[index + 2] = sumB / 9;
                copiaimageData.data[index + 3] = 255;
            }
        }
        this.apply(copiaimageData);
    }

    //filtro bordes con Sobel
    aplicarFiltroBordes() {
        let imageData = this.getImageData();
        const width = this.paint.canvas.width;
        const height = this.paint.canvas.height;
        const pixels = imageData.data;

        // 1. Escala de grises (necesaria para Sobel)
        let gris = new Array(width * height);
        for (let i = 0; i < gris.length; i++) {
            const r = pixels[i * 4];
            const g = pixels[i * 4 + 1];
            const b = pixels[i * 4 + 2];
            gris[i] = 0.299 * r + 0.587 * g + 0.114 * b;
        }

        // 2. Máscaras Sobel
        const sobelX = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        const sobelY = [
            [-1, -2, -1],
            [0, 0, 0],
            [1, 2, 1]
        ];

        let output = new Uint8ClampedArray(pixels.length);

        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let gx = 0, gy = 0;

                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const pixelGris = gris[(y + ky) * width + (x + kx)];
                        gx += sobelX[ky + 1][kx + 1] * pixelGris;
                        gy += sobelY[ky + 1][kx + 1] * pixelGris;
                    }
                }

                const magnitude = Math.min(255, Math.sqrt(gx * gx + gy * gy));
                const index = (y * width + x) * 4;

                output[index] = magnitude;     // R
                output[index + 1] = magnitude; // G
                output[index + 2] = magnitude; // B
                output[index + 3] = 255;       // Alpha
            }
        }

        // 3. Crear nuevo ImageData con el resultado y aplicar
        const resultImage = new ImageData(output, width, height);
        this.apply(resultImage);
    }

    //filtro para resaltar detalles
    aplicarFiltroDetalles() {
        let imageData = this.getImageData();
        const width = this.paint.canvas.width;
        const height = this.paint.canvas.height;
        const pixels = imageData.data;

        // kernel de realce de detalles (sharpen)
        const kernel = [
            [ 0, -1,  0],
            [-1,  5, -1],
            [ 0, -1,  0]
        ];

        let output = new Uint8ClampedArray(pixels.length);

        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let accR = 0, accG = 0, accB = 0;

                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const xn = x + kx;
                        const yn = y + ky;
                        const index = (yn * width + xn) * 4;

                        // Multiplicamos cada canal por el valor del kernel
                        const kValue = kernel[ky + 1][kx + 1];
                        accR += pixels[index] * kValue;
                        accG += pixels[index + 1] * kValue;
                        accB += pixels[index + 2] * kValue;
                    }
                }

                const outIndex = (y * width + x) * 4;
                // Validamos que los valores estén entre 0 y 255
                output[outIndex] = Math.min(255, Math.max(0, accR));
                output[outIndex + 1] = Math.min(255, Math.max(0, accG));
                output[outIndex + 2] = Math.min(255, Math.max(0, accB));
                output[outIndex + 3] = 255; // Alpha siempre opaco
            }
        }

        const resultImage = new ImageData(output, width, height);
        this.apply(resultImage);
    }
}