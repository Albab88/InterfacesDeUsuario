import { Figura } from './Figura.js';

export class Rombo extends Figura {
    constructor(posX, posY, width, height, fill, estilo) {
        super(posX, posY, fill, estilo);
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.moveTo(this.posX + this.width / 2, this.posY);
        ctx.lineTo(this.posX + this.width, this.posY + this.height / 2);
        ctx.lineTo(this.posX + this.width / 2, this.posY + this.height);
        ctx.lineTo(this.posX, this.posY + this.height / 2);
        ctx.closePath();
        ctx.fill();
        
        if (this.estilo) {
            ctx.stroke();
        }
        ctx.restore();
    }

    soyUn() {
        return "Rombo";
    }

    isPointInside(x, y) {

        const PosX = this.posX + this.width / 2;
        const PosY = this.posY + this.height / 2;

        const dx = Math.abs(x - PosX);
        const dy = Math.abs(y - PosY);

        return (dx / (this.width / 2) + dy / (this.height / 2) <= 1);
    }
}