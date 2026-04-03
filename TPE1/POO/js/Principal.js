let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let Figuras = [];

const CANT_FIGURAS = 20;
const MOVIMIENTO = 10; // Cantidad de píxeles que se mueve con el teclado

let mouseDown = false;

let figuraSeleccionada = null;

//variables para ubicar la figura y arrastrar no desde el vertice
let offsetX = 0;
let offsetY = 0;

let cartel = document.getElementById("notificacion");

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
    if(figuraSeleccionada) { //dibuja la seleccionada para que quede arriba
        figuraSeleccionada.draw(ctx);
    }
}


// Función auxiliar para obtener la posición real porque el canvasesta centrado y no en la esquina
function getMousePos(e) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

canvas.addEventListener('mousedown', (e) => {
    let mouse = getMousePos(e); // <--- Usamos la posición corregida
    figuraSeleccionada = buscarFiguras(mouse.x, mouse.y);
    
    if(figuraSeleccionada) {
        cartel.innerText = "Seleccionaste un " + figuraSeleccionada.constructor.name; // Muestra el mensaje con el nombre de la figura
        //calculo la distancia del puntero a
        offsetX = mouse.x - figuraSeleccionada.posX;
        offsetY = mouse.y - figuraSeleccionada.posY;
        figuraSeleccionada.select(true);
        mouseDown = true;
        redibujar();
    }
});

canvas.addEventListener('mousemove', (e) => {
    if(mouseDown && figuraSeleccionada) {
        let mouse = getMousePos(e);
        // MOVEMOS CONSIDERANDO EL OFFSET
        let newX = mouse.x - offsetX;
        let newY = mouse.y - offsetY;

        figuraSeleccionada.moveTo(newX,newY); //lo mueve a la nueva posicion
        redibujar();
    }
});

canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
    cartel.innerText = ""; // El mensaje desaparece al soltar
    if(figuraSeleccionada !=null) {
        figuraSeleccionada.select(false);
        figuraSeleccionada.draw(ctx);
    }
    //figuraSeleccionada = null; se saca para que no quede seleccionada con el mouse
})

//evento mover con el teclado
//si pongo canvas en lugar de window me mueve toda la pantalla, no la imagen
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

function crearCuadrado(posX, posY, color) {
    let lado = Math.round(Math.random() * 100) + 50; 
    // Pasamos "lado" para el ancho y para el alto
    return new Rectangulo(posX, posY, lado, lado, color, false);
}

function crearHexagono(posX, posY, color){
    let radio = Math.round(Math.random() * 50) + 40; 
    return new Hexagono(posX, posY, color, false, radio);
}

function crearFigura() {
    let posX = Math.round(Math.random()* (canvasWidth - 50));
    let posY = Math.round(Math.random()* (canvasHeight - 50));
    let color = randomRGBA();
    let Figura = null;
    let valor = Math.random();
    if(valor < 0.25) {
        Figura = crearCirculo(posX, posY, color);
    } else if(valor >= 0.25 && valor < 0.5){
        Figura = crearRectangulo(posX, posY, color);
    } else if(valor >= 0.5 && valor < 0.75){
        Figura = crearCuadrado(posX, posY, color);
    } else {
        Figura = crearHexagono(posX, posY, color);
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