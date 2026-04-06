import { Rectangulo } from './Rectangulo.js';

export class Cuadrado extends Rectangulo {

    constructor(posX, posY, width, fill, estilo) {
        super(posX, posY, width, width, fill, estilo);
        this.width = width;
        this.height = width;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.rect(this.posX, this.posY, this.width, this.height);
        ctx.fill();
        if (this.estilo) {
            ctx.stroke();
        }
        ctx.restore();
    }

    soyUn() {
            return "Cuadrado";
    }
}