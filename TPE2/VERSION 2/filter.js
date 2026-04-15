//el filtro es blanco y negro
    let btnFiltroBN = document.getElementById("btn-FiltroBN");
    btnFiltroBN.addEventListener("click", () => {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //let data = imageData.data;
        //console.log(imageData);

        let index;
        let r, g, b;
        let promedio;

        for(let y = 0; y < canvas.height ; y++){
            for(let x = 0; x < canvas.width; x++){
                index = (y * canvas.width + x) * 4;

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
    });

    //filtro todo rojo
    let btnFiltroRojo = document.getElementById("btn-FiltroRojo");
        btnFiltroRojo.addEventListener("click", () => {
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let index;
            let r;
            for(let y = 0; y < canvas.height ; y++){
                for(let x = 0; x < canvas.width; x++){
                    index = (y * canvas.width + x) * 4;
                    r = imageData.data[index];
                    imageData.data[index] = r;
                    imageData.data[index + 1] = 0;
                    imageData.data[index + 2] = 0;
                    }
        }
        ctx.putImageData(imageData, 0, 0);
        });

    //filtro blur
    let btnFiltroBlur = document.getElementById("btn-FiltroBlur");
    btnFiltroBlur.addEventListener("click", () => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let copiaimageData = ctx.createImageData(canvas.width, canvas.height);

    let kernelSize = 3;
    let limit = Math.floor(kernelSize / 2);

    //estos son los valores de la matriz
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
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
});