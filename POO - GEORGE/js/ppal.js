let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d')

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let figuras = [];

const CANT_FIGURAS = 20;

let mouseDown = false;

let figuraSeleccionada = null;

// ---------------------------------
// Manejo de eventos
// ---------------------------------
function buscarFigura(x,y) {
    for (i=(figuras.length-1);i >= 0; i--) {
        if (figuras[i].isPointInside(x,y))
            return figuras[i];
    }
    return null;
}

function redibujar() {
    dibujarCanvas();
    for (i= 0; i < figuras.length; i++) {
        if (figuras[i] != figuraSeleccionada) {
            figuras[i].draw(ctx);
        }
    }
    figuraSeleccionada.draw(ctx);

}
canvas.addEventListener('mousedown', (e) => {
    figuraSeleccionada = buscarFigura(e.layerX, e.layerY);
    if (figuraSeleccionada) {
        figuraSeleccionada.select(true);
        mouseDown = true;
        redibujar();
    }
});

canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
    if (figuraSeleccionada != null) {
        figuraSeleccionada.select(false);
        figuraSeleccionada.draw(ctx);
    }
    figuraSeleccionada = null;
});

canvas.addEventListener('mousemove', (e) => {
    if (figuraSeleccionada) {
        figuraSeleccionada.moveTo(e.layerX, e.layerY);
        redibujar();
    }
});

function dibujarCanvas() {
 let unColor = 'rgba(245,245,255,255)';
 let rect = new Rect(0, 0, canvasWidth-1, canvasHeight-1, unColor, true);
 rect.draw(ctx);
} // dibujarCanvas()

function randomRGBA() {
    let r = Math.round(Math.random() * 256);
    let g = Math.round(Math.random() * 256);
    let b = Math.round(Math.random() * 256);
    let a = 255;
    return `rgba(${r},${g},${b},${a})`;
}

function crearCirculo(posX, posY, color) {
    let radio = Math.round(Math.random() * 150) + 50;
    return new Circulo(posX,posY,radio,color,false);
}

function crearRect(posX, posY, color) {
    let largo = Math.round(Math.random() * 150) + 50;
    let alto = Math.round(Math.random() * 150) + 50;
    return new Rect(posX,posY,largo,alto,color,false);
}

function crearUnaFigura() {
  let posX = Math.round( Math.random() * (canvasWidth - 10));
  let posY = Math.round( Math.random() * (canvasHeight - 10));
  let color = randomRGBA();
  let figura = null;
  if (Math.random() < 0.5) {
    figura = crearCirculo(posX, posY, color);
  } else {
    figura = crearRect(posX, posY, color);
  }
  figura.draw(ctx);
  figuras.push(figura);
}

function dibujarFiguras() {
    // Acá vamos a ir dibujando las figuras de una en una
    if (figuras.length < CANT_FIGURAS) {
        crearUnaFigura();
        setTimeout( () => {  dibujarFiguras(); }, 200 - (figuras.length * 4));
    }


} // dibujarFiguras()

function main() {
    dibujarCanvas();
    dibujarFiguras();
} // main()