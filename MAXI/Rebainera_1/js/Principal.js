'use strict';
import { Circulo } from "./Circulo.js";
import { Cuadrado } from "./Cuadrado.js";
import { Rectangulo } from "./Rectangulo.js";
import { Rombo } from "./Rombo.js";
import { Triangulo } from "./Triangulo.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let figuras = [];

const CANT_FIGURAS = 15;
const MAX_FIGURAS = 25;

let mouseDown = false;

let figurasSeleccionadas = [];
let figuraSeleccionada = null;

//-----------------------------------------
//---------Manejo de eventos---------------
//-----------------------------------------

let offsetX = 0;
let offsetY = 0;

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let figuraClickeada = null;

    figuraClickeada = buscarFigura(x, y);

    if (figuraClickeada) {

        if (figurasSeleccionadas.length >= 2) {
            figurasSeleccionadas.forEach(fig => fig.select(false));
            figurasSeleccionadas = [];
        }

        if (!figurasSeleccionadas.includes(figuraClickeada)) {
            figuraClickeada.select(true);
            figurasSeleccionadas.push(figuraClickeada);
        }

        if (figurasSeleccionadas.length === 1) {
            figuraSeleccionada = figuraClickeada;
            offsetX = x - figuraSeleccionada.posX;
            offsetY = y - figuraSeleccionada.posY;
        } else {
            figuraSeleccionada = null;
        }

        const nombres = figurasSeleccionadas.map(fig => fig.soyUn()).join(" y ");
        nombrar(nombres);
        mouseDown = true;
    } else {
        figurasSeleccionadas.forEach(fig => fig.select(false));
        figurasSeleccionadas = [];
        figuraSeleccionada = null;
        nombrar("Ninguna aún");
    }
    redibujar();
});

canvas.addEventListener('mousemove', (e) => {
    if (mouseDown && figuraSeleccionada) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        figuraSeleccionada.moveTo(mouseX - offsetX, mouseY - offsetY);
        redibujar();
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (figuraSeleccionada) {
        redibujar();
    }
    mouseDown = false;
});

window.addEventListener('keydown', (e) => {
    const velocidad = 10;

    if (figurasSeleccionadas.length > 0) {
        let movio = false;
        figurasSeleccionadas.forEach(figura => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    figura.moveTo(figura.posX, figura.posY - velocidad);
                    movio = true;
                    break;
                case 'ArrowDown':
                case 's':
                    figura.moveTo(figura.posX, figura.posY + velocidad);
                    movio = true;
                    break;
                case 'ArrowLeft':
                case 'a':
                    figura.moveTo(figura.posX - velocidad, figura.posY);
                    movio = true;
                    break;
                case 'ArrowRight':
                case 'd':
                    figura.moveTo(figura.posX + velocidad, figura.posY);
                    movio = true;
                    break;
            }
        });

        if (movio) {
            redibujar();
        }
    }
});

function buscarFigura(x, y) {
    for (let i = (figuras.length - 1); i >= 0; i--) {
        if (figuras[i].isPointInside(x, y)) {
            let seleccion = figuras[i]
            figuras.splice(i, 1);
            figuras.push(seleccion);
            return seleccion;
        }
    }
    return null;
}

//-----------------------------------------
//-------Contrucción de figuras------------
//-----------------------------------------

function dibujarCanvas() {
    let fondo = 'rgba(228, 241, 170, 0.8)';
    let rect = new Rectangulo(0, 0, canvasWidth - 1, canvasHeight - 1, fondo, true);
    rect.draw(ctx);
}

function redibujar() {
    dibujarCanvas();

    for (let i = 0; i < figuras.length; i++) {
        if (!figurasSeleccionadas.includes(figuras[i])) {
            figuras[i].draw(ctx);
        }
    }

    figurasSeleccionadas.forEach(f => {
        f.draw(ctx);
    });
}

function dibujarFiguras(e) {
    if (e === 'principal') {
        dibujarPrincipales();
    } else dibujarAlternativa();
}

function dibujarPrincipales() {
    if (figuras.length < CANT_FIGURAS) {
        crearFiguraPrincipal();
        setTimeout(() => { dibujarPrincipales() }, (200 - figuras.length * 5));
    }
}

function dibujarAlternativa() {
    if (figuras.length < MAX_FIGURAS)
        crearFiguraAlternativa();
}

function randomRGBA() {
    let r = Math.round(Math.random() * 256);
    let g = Math.round(Math.random() * 256);
    let b = Math.round(Math.random() * 256);
    let a = 255;
    return `rgba(${r},${g},${b},${a})`;
}

function obtenerComplementario(color) {
    let colores = color.match(/\d+/g);

    let r = 255 - parseInt(colores[0]);
    let g = 255 - parseInt(colores[1]);
    let b = 255 - parseInt(colores[2]);
    let a = 255;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

//----------------------------------------
//------------Figueras posibles-----------
//----------------------------------------

function crearCirculo(posX, posY, color) {
    let radio = Math.round((Math.random() * 50) + 50);
    return new Circulo(posX, posY, radio, color, false);
}

function crearRectangulo(posX, posY, color) {
    let width = Math.round(Math.random() * 150) + 50;
    let height = Math.round(Math.random() * 150) + 50;
    return new Rectangulo(posX, posY, width, height, color, false);
}

function crearTriangulo(posX, posY, color) {
    let width = Math.round(Math.random() * 150) + 50;
    let height = Math.round(Math.random() * 150) + 50;
    return new Triangulo(posX, posY, width, height, color, false);
}

function crearCuadrado(posX, posY, color) {
    let width = Math.round(Math.random() * 150) + 50;
    return new Cuadrado(posX, posY, width, color, false);
}

function crearRombo(posX, posY, color) {
    let width = Math.round(Math.random() * 150) + 50;
    let height = Math.round(Math.random() * 150) + 50;
    return new Rombo(posX, posY, width, height, color, false);
}

//----------------------------------------
//----------Creación de figuras-----------
//----------------------------------------

function crearFiguraPrincipal() {
    let posX = Math.round(Math.random() * (canvasWidth - 150)) + 50;
    let posY = Math.round(Math.random() * (canvasHeight - 150)) + 50;
    let color = randomRGBA();
    let figura;
    let random = Math.random();

    if (random < 0.34) {
        for (let i = 0; i < figuras.length; i++) {
            if (figuras[i].soyUn() === "Cuadrado")
                figura = crearCirculo(posX, posY, obtenerComplementario(figuras[i].fill));
            break;
        }
        figura = crearCirculo(posX, posY, color);
    }
    else if (random < 0.67) {
        figura = crearRectangulo(posX, posY, color);
    }
    else {
        for (let i = 0; i < figuras.length; i++) {
            if (figuras[i].soyUn() === "Círculo")
                figura = crearCuadrado(posX, posY, obtenerComplementario(figuras[i].fill));
            break;
        }
        figura = crearCuadrado(posX, posY, color);
    }
    figura.draw(ctx);
    figuras.push(figura);
}

function crearFiguraAlternativa() {
    let posX = Math.round(Math.random() * (canvasWidth - 150)) + 50;
    let posY = Math.round(Math.random() * (canvasHeight - 150)) + 50;
    let color = randomRGBA();
    let figura;
    let random = Math.random();

    if (random <= 0.5) {
        figura = crearTriangulo(posX, posY, color);
    }
    else {
        figura = crearRombo(posX, posY, color);
    };
    figura.draw(ctx);
    figuras.push(figura);
}

//----------------------------------------
//----------Acciones de botones-----------
//----------------------------------------

function nombrar(nombre) {
    document.getElementById("soy").innerHTML = nombre;
}

let secundarias = document.getElementById("figExt");
secundarias.addEventListener('click', () => {
    dibujarFiguras('');
    actualizarBotonLimpiar();
});

let dibujar = document.getElementById("dibujar");
dibujar.addEventListener('click', () => {
    figuras = [];
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    dibujarCanvas();
    dibujarFiguras('principal');
    actualizarBotonLimpiar();
    dibujar.innerHTML = "Redibujar";
});


let limpiar = document.getElementById("limpiar");
limpiar.addEventListener('click', () => {
    figuras = [];
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    actualizarBotonLimpiar();
    dibujarCanvas();
});

function actualizarBotonLimpiar() {
    if (figuras.length === 0) {
        dibujar.innerHTML = "Figuras principales";
        limpiar.style.backgroundColor = "rgba(200, 200, 200, 0.8)";
        limpiar.disabled = true;
        secundarias.style.backgroundColor = "rgba(200, 200, 200, 0.8)";
        secundarias.disabled = true;
    } else {
        limpiar.style.backgroundColor = "#af4c4c";
        limpiar.disabled = false;
        secundarias.style.backgroundColor = "#4CAF50";
        secundarias.disabled = false;
    }
}

onload = () => {
    dibujarCanvas();
    actualizarBotonLimpiar();
}
