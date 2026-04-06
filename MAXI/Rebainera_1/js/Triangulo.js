import { Figura } from './Figura.js';

export class Triangulo extends Figura {
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
        ctx.lineTo(this.posX, this.posY + this.height);
        ctx.lineTo(this.posX + this.width, this.posY + this.height);
        ctx.closePath();
        ctx.fill();
        
        if (this.estilo) {
            ctx.stroke();
        }
        ctx.restore();
    }

    soyUn() {
        return "Triángulo";
    }


    isPointInside(x, y) {

    const XladoA = this.posX + this.width / 2;
    const YladoA = this.posY;
    
    const XladoB = this.posX;
    const YladoB = this.posY + this.height;
    
    const XladoC = this.posX + this.width;
    const YladoC = this.posY + this.height;

    const denominadorComun = (YladoB - YladoC) * (XladoA - XladoC) + (XladoC - XladoB) * (YladoA - YladoC);
    
    const w1 = ((YladoB - YladoC) * (x - XladoC) + (XladoC - XladoB) * (y - YladoC)) / denominadorComun;
    const w2 = ((YladoC - YladoA) * (x - XladoC) + (XladoA - XladoC) * (y - YladoC)) / denominadorComun;
    const w3 = 1 - w1 - w2;

    return w1 >= 0 && w2 >= 0 && w3 >= 0;
    }
}
