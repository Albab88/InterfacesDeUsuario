class Filter {
    static getImageData(paint) {
        return paint.ctx.getImageData(0, 0, paint.canvas.width, paint.canvas.height);
    }

// filtro de brillo
    //genero un metodo auxiliar para que el color se quede entre 0 y 255, evitando que se sobrepase el limite
    /*static rangoColor(valor) {
        if(valor < 0) return 0;
        if(valor > 255) return 255;
        return valor;
    }

    static aplicarFiltroBrillo(paint, valorBrillo) {
        const ctx = paint.ctx;
        const canvas = paint.canvas;
        let imageData = this.getImageData(paint);

        for(let i = 0; i < imageData.data.length; i += 4){
            imageData.data[i] = Math.min(255, imageData.data[i] + valorBrillo); // R
            imageData.data[i + 1] = Math.min(255, imageData.data[i + 1] + valorBrillo); // G
            imageData.data[i + 2] = Math.min(255, imageData.data[i + 2] + valorBrillo); // B
        }
        paint.ctx.putImageData(imageData, 0, 0);
    }*/

//el filtro es blanco y negro
        static aplicarFiltroBN(paint) {
            const ctx = paint.ctx;
            const canvas = paint.canvas;
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            let index;
            let r, g, b;
            let promedio;

            for(let i = 0; i < canvas.height ; i++){
                for(let j = 0; j < canvas.width; j++){
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
            ctx.putImageData(imageData, 0, 0);
        }

    //filtro para binarizar
static aplicarFiltroBinarizacion(paint) {
    const ctx = paint.ctx;
    const canvas = paint.canvas;
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

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

            imageData.data[index]     = value; // R
            imageData.data[index + 1] = value; // G
            imageData.data[index + 2] = value; // B
            // mantenemos el alfa igual
        }
    }

    ctx.putImageData(imageData, 0, 0);
}


    //filtro sepia
        static aplicarFiltroSepia(paint) {
            const ctx = paint.ctx;
            const canvas = paint.canvas;
            let imageData = this.getImageData(paint);
            for(let i = 0; i < imageData.data.length; i += 4){
                let r = imageData.data[i];
                let g = imageData.data[i + 1];
                let b = imageData.data[i + 2];
                imageData.data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
                imageData.data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
                imageData.data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
            }
            paint.ctx.putImageData(imageData, 0, 0);
        }


    //filtro todo rojo
        static aplicarFiltroRojo(paint) {
            const ctx = paint.ctx;
            const canvas = paint.canvas;
            let imageData = paint.ctx.getImageData(0, 0, paint.canvas.width, paint.canvas.height);
            let index;
            let r;
            for(let y = 0; y < paint.canvas.height ; y++){
                for(let x = 0; x < paint.canvas.width; x++){
                    index = (y * paint.canvas.width + x) * 4;
                    r = imageData.data[index];
                    imageData.data[index] = r;
                    imageData.data[index + 1] = 0;
                    imageData.data[index + 2] = 0;
                    }
        }
        paint.ctx.putImageData(imageData, 0, 0);
}

    //filtro todo verde
        static aplicarFiltroVerde(paint) {
            const ctx = paint.ctx;
            const canvas = paint.canvas;
            let imageData = paint.ctx.getImageData(0, 0, paint.canvas.width, paint.canvas.height);
            let index;
            let g;
            for(let y = 0; y < paint.canvas.height ; y++){
                for(let x = 0; x < paint.canvas.width; x++){
                    index = (y * paint.canvas.width + x) * 4;
                    g = imageData.data[index];
                    imageData.data[index] = 0;
                    imageData.data[index + 1] = g;
                    imageData.data[index + 2] = 0;
                    }
        }
        paint.ctx.putImageData(imageData, 0, 0);
    }

        //filtro todo azul
            static aplicarFiltroAzul(paint) {
                const ctx = paint.ctx;
                const canvas = paint.canvas;
                let imageData = paint.ctx.getImageData(0, 0, paint.canvas.width, paint.canvas.height);
                let index;
                let b;
                for(let y = 0; y < paint.canvas.height ; y++){
                    for(let x = 0; x < paint.canvas.width; x++){
                        index = (y * paint.canvas.width + x) * 4;
                        b = imageData.data[index];
                        imageData.data[index] = 0;
                        imageData.data[index + 1] = 0;
                        imageData.data[index + 2] = b;
                        }
            }
            paint.ctx.putImageData(imageData, 0, 0);
    }

    
    //filtro negativo
        static aplicarFiltroNegativo(paint) {
            const ctx = paint.ctx;
            const canvas = paint.canvas;
            let imageData = paint.ctx.getImageData(0, 0, paint.canvas.width, paint.canvas.height);
            for(let i = 0; i < imageData.data.length; i += 4){
                imageData.data[i] = 255 - imageData.data[i];
                imageData.data[i + 1] = 255 - imageData.data[i + 1];
                imageData.data[i + 2] = 255 - imageData.data[i + 2];
        }
        ctx.putImageData(imageData, 0, 0);
        }

    //filtro blur - ver como cambiar el alpha
        static aplicarFiltroBlur(paint) {
            const ctx = paint.ctx;
            const canvas = paint.canvas;
            let imageData = paint.ctx.getImageData(0, 0, paint.canvas.width, paint.canvas.height);
            let copiaimageData = paint.ctx.createImageData(paint.canvas.width, paint.canvas.height);
            //agregar la matriz del kernel
            let kernelSize = 3;
            let limit = Math.floor(kernelSize / 2);

            //estos son los valores de la matriz
            for (let y = 0; y < paint.canvas.height; y++) {
                for (let x = 0; x < paint.canvas.width; x++) {
                    let sumR = 0, sumG = 0, sumB = 0;
                    let index = (x + y * canvas.width) * 4;

                    //estos son los valores del kernel
                    for (let i = 0; i < kernelSize; i++) {
                        for (let j = 0; j < kernelSize; j++) {
                            // i es el desplazamiento en Y, j es el desplazamiento en X
                            let nY = y + i - limit;
                            let nX = x + j - limit;

                            // Validar límites del canvas
                            if (nX >= 0 && nX < canvas.width && nY >= 0 && nY < canvas.height) {
                                let offsetIndex = (nX + nY * canvas.width) * 4;
                                sumR += imageData.data[offsetIndex];
                                sumG += imageData.data[offsetIndex + 1];
                                sumB += imageData.data[offsetIndex + 2];
                            }
                        }
                    }

                //normalizar el resultado segun la formula del kernel
                copiaimageData.data[index] = sumR / 9;     // Rojo
                copiaimageData.data[index + 1] = sumG / 9; // Verde
                copiaimageData.data[index + 2] = sumB / 9; // Azul
                copiaimageData.data[index + 3] = 255;      // ALPHA
            }
        }
        ctx.putImageData(copiaimageData, 0, 0);
}

}