// --------------------------------------------------
// Programa principal
// --------------------------------------------------

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let color = "black";
let estilo = 1;
let pen = 'pencil';

// --------------------------------------------------
// comportamiento del mouse
// --------------------------------------------------
let mouseDown = false;
let pencilClicked = false;

let miPen = null;

canvas.addEventListener("mousedown", function (e) {
    mouseDown = true;
    if (pencilClicked) {
        let posX = e.offsetX;
        let posY = e.offsetY;
        miPen = new Pen(posX, posY, color, estilo);
        miPen.draw(ctx);
    }
}); // mousedown

canvas.addEventListener("mousemove", function (e) {
    if (mouseDown && pencilClicked && miPen != null) {
        let posX = e.offsetX;
        let posY = e.offsetY;
        miPen.moveTo(posX, posY);
        miPen.draw(ctx);
    }   
}); // mousemove

canvas.addEventListener("mouseup", function (e) {
    mouseDown = false;
    //pencilClicked = false;
    //miPen = null;
}); // mouseup

// --------------------------------------------------
// comportamiento de los botones
// --------------------------------------------------
let pencilButton = document.getElementById("pen");
let eraserButton = document.getElementById("eraser");

pencilButton.addEventListener("click", function () {
    pencilClicked = true;
    color = "black";
    estilo = 1;
}); // pencilButton click

eraserButton.addEventListener("click", function () {
    pencilClicked = true;
    color = "white";
    estilo = 10;
}); // eraserButton click

function main() {
    // Aquí puedes agregar cualquier código de inicialización si es necesario
} // main()
