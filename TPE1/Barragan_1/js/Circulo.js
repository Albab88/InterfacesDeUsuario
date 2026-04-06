class Circulo extends Figura {

    constructor(posX, posY, fill, estilo, radio) {
        super(posX, posY, fill, estilo);
        this.radio = radio;
    }

     draw(ctx) {
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        ctx.fill();

        if(this.estilo) {
            ctx.stroke()
        }
    }

    isPointInside(x, y) {
        return (Math.sqrt((x-this.posX)**2+(y-this.posY)**2)) <= this.radio;
    }
}