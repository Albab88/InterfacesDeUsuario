"use strict"

/*@type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let img = new Image();
img.onload = () => {
    ctx.drawImage(img, 0, 0);
}
img.src = "image.jpg";


let btnLoad = document.getElementById("btn-Load");
btnLoad.addEventListener("change", (e) => {
    let file = e.target.files[0];
    if(file) {
        loadImage(file);
    }
});

//lee la imagen y la carga en el canvas
function loadImage(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        img.src = e.target.result;
    }
}

//arrastrar y soltar
let dropArea = document.getElementById("dropArea");
dropArea.ondragenter = (e) => {
    e.preventDefault()};
    dropArea.ondragleave = (e) => {
    e.preventDefault()};
    dropArea.ondragover = (e) => {
    e.preventDefault()};
    dropArea.ondrop = (e) => {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    //console.log(file);
    loadImage(file);}

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
        let copiaimageData = ctx.createImageData(imageData);

        let index;
        let sumR, sumG, sumB;
        let promedio;

        let kernel = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ];

        let kernelSize = 3;

        let offsetIndex;

    //estos valores son de la matriz
        for(let y = 0; y < canvas.height -1 ; y++){
        for(let x = 0; x < canvas.width -1 ; x++){
            index = (x + y * canvas.width) * 4;
            sumR = 0;
            sumG = 0;
            sumB = 0;
            let valorKernel;

            //estos valores son del kernel
            for(let i = 0; i < kernelSize ; i++){ //de arriba a abajo
            for(let j = 0; j < kernelSize; j++){ //de izquierda a derecha
                //calcular el indice del pixel vecino
                let offsetX = x + i - Math.floor(kernelSize / 2);
                let offsetY = y + j - Math.floor(kernelSize / 2);

                offsetIndex = (offsetX + offsetY * canvas.width) * 4;
                valorKernel = kernel[i][j];

                sumR += imageData.data[offsetIndex] * valorKernel;
                sumG += imageData.data[offsetIndex + 1] * valorKernel;
                sumB += imageData.data[offsetIndex + 2] * valorKernel;
            }
        }

        //normalizar el resultado segun la formula del kernel
        copiaimageData.data[index] = sumR / 9;
        copiaimageData.data[index + 1] = sumG / 9;
        copiaimageData.data[index + 2] = sumB / 9;
    }
    }
    ctx.putImageData(copiaimageData, 0, 0);
    });
    
