class App {
//encargada de manejar la interacción entre el usuario y la clase Paint

    constructor() {
        this.paint = new Paint("canvas");
        this.initEventListeners();
    }

    initEventListeners() {
        const { canvas } = this.paint;

        // Eventos de Mouse
        canvas.addEventListener("mousedown", (e) => this.paint.startDrawing(e.offsetX, e.offsetY));
        canvas.addEventListener("mousemove", (e) => this.paint.draw(e.offsetX, e.offsetY));
        canvas.addEventListener("mouseup", () => this.paint.stopDrawing());
        canvas.addEventListener("mouseleave", () => this.paint.stopDrawing());

        // Botones de Herramientas
        document.getElementById("pencilBtn").onclick = () => this.paint.setTool("pencil");
        document.getElementById("eraserBtn").onclick = () => this.paint.setTool("eraser");
        document.getElementById("undoBtn").onclick = () => this.paint.undo();
        document.getElementById("clearBtn").onclick = () => this.paint.clear();

        // Inputs
        document.getElementById("colorPicker").oninput = (e) => this.paint.setColor(e.target.value);
        document.getElementById("sizeInput").oninput = (e) => this.paint.setSize(e.target.value);

        // Guardar y Cargar
        document.getElementById("saveBtn").onclick = () => this.saveImage();
        document.getElementById("uploadInput").onchange = (e) => this.loadImage(e);

        // UI Menús
        document.getElementById("toggleFiltros").onclick = () => {
        document.getElementById("filtrosMenu").classList.toggle("open");
        };

        // Filtros
        /*document.getElementById("brillo").oninput = (e) => {
            this.paint.saveState();
            const valorBrillo = parseInt(e.target.value);
            Filter.aplicarFiltroBrillo(this.paint, valorBrillo);
        };*/

        document.getElementById("btn-FiltroBN").onclick = () => {
            this.paint.saveState();      // Primero Paint guarda el historial
            Filter.aplicarFiltroBN(this.paint); // Luego la clase estática procesa
        };

        document.getElementById("btn-FiltroBinarizacion").onclick = () => {
            this.paint.saveState();
            Filter.aplicarFiltroBinarizacion(this.paint);
        }

        document.getElementById("btn-FiltroSepia").onclick = () => {
            this.paint.saveState();
            Filter.aplicarFiltroSepia(this.paint);
        };

        document.getElementById("btn-FiltroRojo").onclick = () => {
            this.paint.saveState();
            Filter.aplicarFiltroRojo(this.paint);
        }

        document.getElementById("btn-FiltroVerde").onclick = () => {
            this.paint.saveState();
            Filter.aplicarFiltroVerde(this.paint);
        }

        document.getElementById("btn-FiltroAzul").onclick = () => {
            this.paint.saveState();
            Filter.aplicarFiltroAzul(this.paint);
        }
        
        document.getElementById("btn-FiltroNegativo").onclick = () => {
            this.paint.saveState();
            Filter.aplicarFiltroNegativo(this.paint);
        }

        document.getElementById("btn-FiltroBlur").onclick = () => {
            this.paint.saveState();
            Filter.aplicarFiltroBlur(this.paint);
        };
    }

    saveImage() {
    // Pedirle el nombre al usuario mediante una ventana emergente
    let nombreArchivo = prompt("Ingresa el nombre para tu dibujo:");
    // Si el usuario cancela el prompt, nombreArchivo será null. 
    if (nombreArchivo === null) return;
    // Validar que no esté vacío, si lo está, ponemos uno por defecto
    if (nombreArchivo.trim() === "") {
        nombreArchivo = "sin-titulo";
    }
    // Crear el enlace de descarga como ya lo hacías
    const link = document.createElement("a");    
    // Usamos el nombre que eligió el usuario + la extensión
    link.download = `${nombreArchivo}.jpeg`;
    link.href = this.paint.canvas.toDataURL();    
    // Ejecutar la descarga
    link.click();
}

    loadImage(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                this.paint.saveState();
                this.paint.ctx.drawImage(img, 0, 0, this.paint.canvas.width, this.paint.canvas.height);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Inicialización
new App();