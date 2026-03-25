let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let Figuras = [];

const CANT_FIGURAS = 20;
const MOVIMIENTO = 10; // Cantidad de píxeles que se mueve con el teclado

let mouseDown = false;

let figuraSeleccionada = null;

//---------------------------- EVENTOS --------------------
function buscarFiguras(x, y) {
    for(i=(Figuras.length-1); i>=0; i--) {
        if(Figuras[i].isPointInside(x, y))
            return Figuras [i];
    }
    return null;
}

function redibujar() {
    dibujarCanvas();
    for(i=0 ; i < Figuras.length; i++) {
        if(Figuras[i] != figuraSeleccionada) {
            Figuras[i].draw(ctx);
        }
    }
    figuraSeleccionada.draw(ctx);
}

canvas.addEventListener('mousedown', (e) => {
    figuraSeleccionada = buscarFiguras(e.layerX, e.layerY)
    if(figuraSeleccionada) {
        figuraSeleccionada.select(true);
        mouseDown = true;
        redibujar();
    }
});

canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
    if(figuraSeleccionada !=null) {
        figuraSeleccionada.select(false);
        figuraSeleccionada.draw(ctx);
    }
    //figuraSeleccionada = null; se saca para que no quede seleccionada con el mouse
})

canvas.addEventListener('mousemove', (e) => {
    if(mouseDown && figuraSeleccionada) {
        figuraSeleccionada.moveTo(e.layerX, e.layerY);
        redibujar();
    }
});

//evento mover con el teclado

window.addEventListener('keydown', (e) => {
    // Si no seleccionaste ninguna figura con el mouse, no hacemos nada
    if (!figuraSeleccionada) return;
    switch (e.key) { //cada caso del teclado
        case 'ArrowUp':
            figuraSeleccionada.moveTo(figuraSeleccionada.posX, figuraSeleccionada.posY - MOVIMIENTO);
            break;
        case 'ArrowDown':
            figuraSeleccionada.moveTo(figuraSeleccionada.posX, figuraSeleccionada.posY + MOVIMIENTO);
            break;
        case 'ArrowLeft':
            figuraSeleccionada.moveTo(figuraSeleccionada.posX - MOVIMIENTO, figuraSeleccionada.posY);
            break;
        case 'ArrowRight':
            figuraSeleccionada.moveTo(figuraSeleccionada.posX + MOVIMIENTO, figuraSeleccionada.posY);
            break;
        default:
            return; // Si toca cualquier otra tecla, ignoramos el evento
    }
    // Evita que la página web suba o baje al usar las flechas
    e.preventDefault();
    // Refrescamos el canvas para ver el movimiento
    redibujar();
});


function dibujarCanvas() {
    let color = 'rgba(81, 226, 231, 0.7)';
    let rectangulo = new Rectangulo (0, 0, canvasWidth - 1, canvasHeight - 1, color, true);
    rectangulo.draw(ctx);
}

function randomRGBA() { //funcion aleatoria de color
    let r = Math.round(Math.random() * 256);
    let g = Math.round(Math.random() * 256);
    let b = Math.round(Math.random() * 256);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function crearCirculo(posX, posY, color) {
    let radio = Math.round(Math.random()*150) + 50;
    return new Circulo (posX, posY, color, false, radio);
}

function crearRectangulo(posX, posY, color) {
    let width = Math.round(Math.random()*150) + 50;
    let height = Math.round(Math.random()*150) + 50;
    return new Rectangulo (posX, posY, width, height, color, false);
}

function crearFigura() {
    let posX = Math.round(Math.random()* (canvasWidth - 50));
    let posY = Math.round(Math.random()* (canvasHeight - 50));
    let color = randomRGBA();
    let Figura = null;
    if(Math.random() < 0.5) {
        Figura = crearCirculo(posX, posY, color);
    } else {
        Figura = crearRectangulo(posX, posY, color);
    }
    Figura.draw(ctx);
    Figuras.push(Figura);
}

function dibujarFiguras() {
    //aca se dibujan las figuras
    if(Figuras.length < CANT_FIGURAS) {
        crearFigura();
        setTimeout(() => {dibujarFiguras();},(200 - Figuras.length *4));
    }
}

function main() {
    dibujarCanvas();
    dibujarFiguras();
}