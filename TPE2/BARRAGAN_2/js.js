const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Ajustar tamaño del canvas
canvas.width = 800;
canvas.height = 500;

// Estado
let drawing = false;
let currentTool = "pencil";
let color = "#000000";
let brushSize = 5;

// Historial para deshacer
let history = [];

// Elementos UI
const tools = document.querySelectorAll(".tool");
const colorPicker = document.getElementById("colorPicker");
const sizeInput = document.querySelector("input[type='range']");

// =====================
// FUNCIONES PRINCIPALES
// =====================

function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);

    // Guardar estado antes de dibujar
    saveState();
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";

    if (currentTool === "eraser") {
        ctx.strokeStyle = "#ffffff"; // borra pintando blanco
    } else {
        ctx.strokeStyle = color;
    }

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// =====================
// HISTORIAL (DESHACER)
// =====================

function saveState() {
    history.push(canvas.toDataURL());

    // limitar memoria
    if (history.length > 2) {
        history.shift();
    }
}

function undo() {
    if (history.length === 0) return;

    const lastState = history.pop();
    const img = new Image();

    img.src = lastState;
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
// HERRAMIENTAS
// =====================

tools.forEach(btn => {
    btn.addEventListener("click", () => {
        const text = btn.textContent;

        if (text.includes("Lápiz")) currentTool = "pencil";
        if (text.includes("Borrar")) currentTool = "eraser";
    });
});

// Color
colorPicker.addEventListener("input", (e) => {
    color = e.target.value;
});

// Tamaño
sizeInput.addEventListener("input", (e) => {
    brushSize = e.target.value;
});

// =====================
// BOTÓN DESHACER
// =====================

// Crear botón dinámicamente (para no tocar HTML)
const undoBtn = document.createElement("button");
undoBtn.textContent = "↩️ Deshacer";
undoBtn.classList.add("tool");

document.querySelector(".toolbar").appendChild(undoBtn);

undoBtn.addEventListener("click", undo);