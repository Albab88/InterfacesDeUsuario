class App {
    //encargada de manejar la interacción entre el usuario y la clase Paint

    constructor() {
        this.paint = new Paint("canvas");
        this.initEventListeners();
    }

    initEventListeners() {
        const { canvas, filterManager } = this.paint;

        //  --- MANEJO DE EVENTOS ---

        // Mouse Events
        canvas.onmousedown = (e) => this.paint.startDrawing(e.offsetX, e.offsetY);
        canvas.onmousemove = (e) => this.paint.draw(e.offsetX, e.offsetY);
        canvas.onmouseup = () => this.paint.stopDrawing();
        canvas.onmouseleave = () => this.paint.stopDrawing();

        // Herramientas básicas
        document.getElementById("pencilBtn").onclick = () => this.paint.setTool("pencil");
        document.getElementById("eraserBtn").onclick = () => this.paint.setTool("eraser");
        document.getElementById("undoBtn").onclick = () => this.paint.undo();
        document.getElementById("clearBtn").onclick = () => this.paint.clear();

        // Inputs para elegir color y tamaño del lapiz - tamaño de la goma
        document.getElementById("colorPicker").oninput = (e) => this.paint.setColor(e.target.value);
        document.getElementById("sizeInput").oninput = (e) => this.paint.setSize(e.target.value);

        // Guardar y Cargar
        document.getElementById("saveBtn").onclick = () => this.saveImage();
        document.getElementById("uploadInput").onchange = (e) => {
            this.paint.saveState();
            this.loadImage(e);
            e.target.value = "";
        };

        // Menús de filtros desplegable cuando se hace click
        document.getElementById("toggleFiltros").onclick = () => {
            document.getElementById("filtrosMenu").classList.toggle("open");
        };

        // Filtros (Llamando a la instancia)
        document.getElementById("btn-FiltroBrillo").onclick = () => {
            this.paint.saveState();
            filterManager.aplicarFiltroBrillo(10);
        };

        document.getElementById("btn-FiltroBN").onclick = () => {
            this.paint.saveState();      // Primero Paint guarda el historial
            filterManager.aplicarFiltroBN(); // Luego la clase estática procesa
        };

        document.getElementById("btn-FiltroBinarizacion").onclick = () => {
            this.paint.saveState();
            filterManager.aplicarFiltroBinarizacion();
        };

        document.getElementById("btn-FiltroSepia").onclick = () => {
            this.paint.saveState();
            filterManager.aplicarFiltroSepia();
        };

        document.getElementById("btn-FiltroNegativo").onclick = () => {
            this.paint.saveState();
            filterManager.aplicarFiltroNegativo();
        };

        document.getElementById("btn-FiltroRojo").onclick = () => {
            this.paint.saveState();
            filterManager.aplicarFiltroRojo();
        };

        document.getElementById("btn-FiltroVerde").onclick = () => {
            this.paint.saveState();
            filterManager.aplicarFiltroVerde();
        }

        document.getElementById("btn-FiltroAzul").onclick = () => {
            this.paint.saveState();
            filterManager.aplicarFiltroAzul();
        };

        document.getElementById("btn-FiltroBlur").onclick = () => {
            this.paint.saveState();
            filterManager.aplicarFiltroBlur();
        };

        document.getElementById("btn-FiltroBordes").onclick = () => {
            this.paint.saveState();
            filterManager.aplicarFiltroBordes();
        };

        document.getElementById("btn-FiltroDetalles").onclick = () => {
            this.paint.saveState();
            filterManager.aplicarFiltroDetalles();
        };
    }

    // --- FIN DE MANEJO DE EVENTOS ---

    //funcion para guarda la imagen creada por el usuario
    saveImage() {
        // Pedirle el nombre al usuario mediante una ventana emergente
        let nombreArchivo = prompt("Ingresa el nombre para tu dibujo:");
        if (nombreArchivo.trim() === "") {
            nombreArchivo = "sin-titulo";
        }
        // Crear el enlace de descarga
        const link = document.createElement("a");
        // Usamos el nombre que eligió el usuario + la extensión
        link.download = `${nombreArchivo}.png`;
        link.href = this.paint.canvas.toDataURL();
        // Ejecutar la descarga
        link.click();
    }

    //funcion para cargar una imagen al canvas desde la pc del usuario
    loadImage(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                this.paint.ctx.globalCompositeOperation = "source-over";
                this.paint.ctx.drawImage(img, 0, 0, this.paint.canvas.width, this.paint.canvas.height);
                e.target.vakue = "";
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

}

new App();