class Rect extends Figura {
    constructor(posX, posY, width, height, fill, estilo) {
        super(posX, posY, fill, estilo);
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.fillStyle = this.fill; 
        ctx.beginPath();
        ctx.rect(this.posX, this.posY, this.width, this.height);
        ctx.fill();
        if (this.estilo) {
            ctx.stroke();
        }
    } // draw()

   isPointInside(x, y) {
        return ((x >= this.posX) && (x <= (this.posX+this.width)) &&
            (y >= this.posY) && (y <= this.posY+this.height));

    } // isPointInside()

} // Rect