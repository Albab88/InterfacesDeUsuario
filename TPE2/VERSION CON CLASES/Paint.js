class Paint {
//encargada de manejar el canvas, las herramientas, el historial y la lógica de dibujo

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        
        // Configuración inicial
        this.canvas.width = 1024;
        this.canvas.height = 768;
        
        this.drawing = false;
        this.color = "#000000";
        this.brushSize = 5;
        //arreglo del historial de cambios para deshacer
        this.history = []; 
    }

    //funcion para comenzar a dibujar
    startDrawing(x, y) {
        this.saveState();
        this.drawing = true;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }

    draw(x, y) {
        if (!this.drawing) return;

        this.ctx.lineWidth = this.brushSize;
        this.ctx.lineCap = "round";

        if (this.currentTool === "eraser") {
            //dejar marcado el boton de la goma
            document.getElementById("eraserBtn").classList.add("active");
            document.getElementById("pencilBtn").classList.remove("active");
            //la siguiente línea hace que el trazo del borrador sea transparente, eliminando lo que hay debajo
            this.ctx.globalCompositeOperation = "destination-out";
        } else {
            //dejar marcado el boton del lapiz
            document.getElementById("pencilBtn").classList.add("active");
            document.getElementById("eraserBtn").classList.remove("active");
            // Si es lápiz, aseguramos que el trazo sea normal y del color seleccionado
            this.ctx.globalCompositeOperation = "source-over";
            this.ctx.strokeStyle = this.color;
        }

        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    stopDrawing() {
        this.drawing = false;
        this.ctx.closePath();
    }

    //funcion para guardar el estado actual del canvas en el historial que nos permite deshacer cambios
    saveState() {
        this.history.push(this.canvas.toDataURL());
        if (this.history.length > 20) this.history.shift();
    }

    //funcion deshacer
    undo() {
        document.getElementById("pencilBtn").classList.remove("active");
        document.getElementById("eraserBtn").classList.remove("active");
        document.getElementById("saveBtn").classList.remove("active");
        if (this.history.length === 1) {
            if (!confirm("¿Estás seguro de que quieres deshacer? Dejarás el lienzo en blanco.")) {
                return;
            }
            // Si no hay historial, limpia el canvas
            this.clear();
            return;
        };
        const img = new Image();
        img.src = this.history.pop();
        img.onload = () => {
            this.clear(false); // Limpia sin guardar estado
            this.ctx.drawImage(img, 0, 0);
        };
    }

    //funcion borrar el canvas
    clear(save = true) {
        document.getElementById("pencilBtn").classList.remove("active");
        document.getElementById("eraserBtn").classList.remove("active");

        //preguntar antes de borrar
        if (save) {
            if (!confirm("¿Estás seguro de que quieres borrar? Perderás todos los cambios.")) {
                return;
            }
        }   
        //if (save) this.saveState();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setTool(tool) { 
        this.currentTool = tool; 
    }
    setColor(color) { 
        this.color = color; 
    }
    setSize(size) { 
        this.brushSize = size; 
    }
}