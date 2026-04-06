let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let Figuras = [];

const CANT_FIGURAS = 20;
const MOVIMIENTO = 10; // Cantidad de píxeles que se mueve con el teclado

let mouseDown = false;
let figuraSeleccionada = null;
let figuraArrastrada = null;
let seleccionadas = []; // Arreglo de las figuras seleccionadas para mover juntas

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
    for(let i=0 ; i < Figuras.length; i++) {
            Figuras[i].draw(ctx);
    }
    for(let j = 0; j < seleccionadas.length; j++) { //toma las seleccionadas
        seleccionadas[j].draw(ctx);
    }
}

// Función auxiliar para obtener la posición real porque el canvas esta centrado y no en la esquina
function getMousePos(e) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

canvas.addEventListener('mousedown', (e) => {
    let mouse = getMousePos(e);
    let figuraSeleccionada = buscarFiguras(mouse.x, mouse.y);
    
    if(figuraSeleccionada) {
        mouseDown = true;
        figuraArrastrada = figuraSeleccionada //me quedo con la figura para moverla con el mouse
        // Agrego la figura si NO está ya en el arreglo
        if (!seleccionadas.includes(figuraSeleccionada)) {
            if (seleccionadas.length < 2) {
                figuraSeleccionada.select(true);
                seleccionadas.push(figuraSeleccionada);
            }
        }
        //calculo la distancia del puntero a
        offsetX = mouse.x - figuraSeleccionada.posX;
        offsetY = mouse.y - figuraSeleccionada.posY;
        cartel.innerText = "Cantidad de figuras seleccionadas: " + seleccionadas.length;
    } else {
        seleccionadas.forEach(f => f.select(false));
        seleccionadas = [];
        cartel.innerText = "Selección limpia";
    }
    redibujar();
});

canvas.addEventListener('mousemove', (e) => {
    if(mouseDown && figuraArrastrada) {
        let mouse = getMousePos(e);
        let newX = mouse.x - offsetX;
        let newY = mouse.y - offsetY;

        figuraArrastrada.moveTo(newX,newY); //lo mueve a la nueva posicion
        redibujar();
    }
});

canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
})

//evento mover con el teclado
window.addEventListener('keydown', (e) => {
    // Si no seleccionaste ninguna figura con el mouse, no hacemos nada
    if (seleccionadas.length == 0) return;
    seleccionadas.forEach(figuraSeleccionada => {
    switch (e.key) { //cada caso del teclado
        case 'ArrowUp':
            figuraSeleccionada.moveTo(figuraSeleccionada.posX, figuraSeleccionada.posY - MOVIMIENTO);
            cartel.innerText = "Estas moviendo hacia arriba " + seleccionadas.length + " figura/s"; // Muestra el mensaje con el nombre de la figura
            break;
        case 'ArrowDown':
            figuraSeleccionada.moveTo(figuraSeleccionada.posX, figuraSeleccionada.posY + MOVIMIENTO);
            cartel.innerText = "Estas moviendo hacia abajo " + seleccionadas.length + " figura/s"; // Muestra el mensaje con el nombre de la figura
            break;
        case 'ArrowLeft':
            figuraSeleccionada.moveTo(figuraSeleccionada.posX - MOVIMIENTO, figuraSeleccionada.posY);
            cartel.innerText = "Estas moviendo hacia la izquierda " + seleccionadas.length + " figura/s"; // Muestra el mensaje con el nombre de la figura
            break;
        case 'ArrowRight':
            figuraSeleccionada.moveTo(figuraSeleccionada.posX + MOVIMIENTO, figuraSeleccionada.posY);
            cartel.innerText = "Estas moviendo hacia la derecha " + seleccionadas.length + " figura/s"; // Muestra el mensaje con el nombre de la figura
            break;
        default:
            return; // Si toca cualquier otra tecla, ignoramos el evento
    }
});
    // Evita que la página web suba o baje al usar las flechas
    e.preventDefault();
    redibujar();
});

document.getElementById("btn-dibujar").addEventListener("click", () => {
    dibujarFiguras();
});

document.getElementById("btn-borrar").addEventListener("click", () => {
    Figuras = [];
    figuraSeleccionada = null;
    redibujar(); 
    cartel.innerText = "Figuras borradas - Puedes dibujar otra vez";
});

const selectorColor = document.getElementById("color-fondo");

selectorColor.addEventListener("input", () => {
    redibujar(); 
});

//--------------------------- FIN DE EVENTOS ---------------------------

function dibujarCanvas() {
    let colorElegido = document.getElementById("color-fondo").value;
    let rectangulo = new Rectangulo (0, 0, canvasWidth - 1, canvasHeight - 1, colorElegido, true);
    rectangulo.draw(ctx);
}
// Guardamos un color inicial por si sale un cuadrado antes que el primer círculo
let ultimoColorCirculo = 'rgba(255, 0, 0, 1)'; 

function obtenerComplementario(rgba) {
    let componentes = rgba.match(/\d+/g);
    let r = 255 - parseInt(componentes[0]);
    let g = 255 - parseInt(componentes[1]);
    let b = 255 - parseInt(componentes[2]);
    return `rgba(${r}, ${g}, ${b}, 1)`;
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
        //se guarda el color del ultimo circulo que salio
        ultimoColorCirculo = color;
        Figura = crearCirculo(posX, posY, color);
    } else if(valor >= 0.25 && valor < 0.5){
        Figura = crearRectangulo(posX, posY, color);
    } else if(valor >= 0.5 && valor < 0.75){
        let complementario = obtenerComplementario(ultimoColorCirculo)
        Figura = crearCuadrado(posX, posY, complementario);
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
}