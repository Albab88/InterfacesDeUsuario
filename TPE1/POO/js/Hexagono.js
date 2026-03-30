class Hexagono extends Figura {
    constructor(posX, posY, fill, estilo, radio) {
        super(posX, posY, fill, estilo);
        this.radio = radio;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        
        for (let i = 0; i < 6; i++) { // Dibujamos los 6 lados
            // Dividimos el círculo (2 * PI) en 6 partes
            let angulo = (Math.PI / 3) * i; 
            let x = this.posX + this.radio * Math.cos(angulo);
            let y = this.posY + this.radio * Math.sin(angulo);
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        if (this.estilo) ctx.stroke();
        ctx.restore();
    }

    isPointInside(x, y) {
        return (Math.sqrt((x-this.posX)**2+(y-this.posY)**2)) <= this.radio;
    }
}