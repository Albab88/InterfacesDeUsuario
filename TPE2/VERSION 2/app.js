const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//esto deja el tamaño fijo, pero se puede hacer que se adapte al tamaño de la ventana con window.innerWidth/Height
canvas.width = 1024;
canvas.height = 768;

// Estado inicial del lapiz
let drawing = false;
let currentTool = "pencil";
let color = "#000000";
let brushSize = 5;

// Historial para ver hasta donde elimina con el boton deshacer
let history = [];

// UI
const pencilBtn = document.getElementById("pencilBtn");
const eraserBtn = document.getElementById("eraserBtn");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const uploadInput = document.getElementById("uploadInput");

const colorPicker = document.getElementById("colorPicker");
const sizeInput = document.getElementById("sizeInput");

const toggleFiltros = document.getElementById("toggleFiltros");
const filtrosMenu = document.getElementById("filtrosMenu");

// Dibujar
function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);

    saveState();
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";

    if (currentTool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
    } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = color;
    }

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// Historial de veces para hacer el deshacer

function saveState() {
    history.push(canvas.toDataURL());
    if (history.length > 20) history.shift();
}

// funcion para deshacer el ultimo cambio
function undo() {
    if (history.length === 0) return;

    const img = new Image();
    img.src = history.pop();

    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    };
}

// =====================
// EVENTOS CANVAS
// =====================

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

// =====================
// BOTONES
// =====================

pencilBtn.onclick = () => currentTool = "pencil";
eraserBtn.onclick = () => currentTool = "eraser";

undoBtn.onclick = undo;

clearBtn.onclick = () => {
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// =====================
// COLOR Y TAMAÑO
// =====================

colorPicker.oninput = (e) => color = e.target.value;
sizeInput.oninput = (e) => brushSize = e.target.value;

// =====================
// GUARDAR IMAGEN
// =====================

saveBtn.onclick = () => {
    const link = document.createElement("a");
    link.download = "dibujo.png";
    link.href = canvas.toDataURL();
    link.click();
};

// =====================
// CARGAR IMAGEN
// =====================

uploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();

        img.onload = () => {
            saveState();
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});

// =====================
// DESPLEGAR EL MENU DE FILTROS
// =====================
toggleFiltros.addEventListener("click", () => {
    filtrosMenu.classList.toggle("open");
});
