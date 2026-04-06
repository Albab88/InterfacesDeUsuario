export class Figura {

    constructor(posX, posY, fill, estilo) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.estilo = estilo;
    }

    draw(ctx) {
    }

    moveTo(x, y) {
        this.posX = x;
        this.posY = y;
    }

    select(estilo) {
        this.estilo = estilo;
    }

    soyUn(){
        return "Figura";
    }

    isPointInside(x, y) {
        return false;
    }

}