"use strict"

/*@type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let img = new Image();
img.onload = () => {
    ctx.drawImage(img, 0, 0);
}

img.src = "imagen.jpg";

let btnLoad = document.getElementById("btnLoad");
btnLoad.addEventListener("change", (e) => {
    let file = e.target.files[0];
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
    e.preventDefault()};

    let file = e.dataTransfer.files[0];
    //console.log(file);
    loadImage(file);

    //el filtro es blanco y negro
    let btnFiltro = document.getElementById("btnFiltro");
    btnFiltro.addEventListener("click", () => {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        console.log(imageData);

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

    /*filtro todo rojo
        imageData.data[index] = r;
        imageData.data[index + 1] = 0;
        imageData.data[index + 2] = 0;
    */ 
    
