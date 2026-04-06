import { Figura } from './Figura.js';

export class Circulo extends Figura {

constructor(posX, posY, rad, fill, estilo) {
    super(posX, posY, fill, estilo);
    this.rad = rad;
}

draw(ctx){
    ctx.save();
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.rad, 0, 2 * Math.PI);
    ctx.fill();
    if(this.estilo){
        ctx.stroke();
    }
    ctx.restore();
}

soyUn() {
        return "Círculo";
    }

isPointInside(x, y){
        return Math.sqrt((x-this.posX)**2+(y-this.posY)**2) <= this.rad;
    }
}