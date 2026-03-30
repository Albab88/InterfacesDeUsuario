class Circulo extends Figura {

    constructor(posX, posY, radio, fill, estilo) {
        super(posX, posY, fill, estilo);
        this.radio = radio;
    } // constructor()

    draw(ctx) {
        ctx.fillStyle = this.fill; 
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        ctx.fill();
        if (this.estilo) {
            ctx.stroke();
        }
    } // draw()

   isPointInside(x, y) {
    let dx = (this.posX-x);
    let dy = (this.posY-y);
    let dx2 = dx*dx;
    let dy2= dy*dy;
    let dist = Math.sqrt(dx2+dy2);
    return (dist<=this.radio);
   } // isPointInside()

} // Circulo
