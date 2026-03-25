class Figura {

    constructor (posX, posY, fill, estilo) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.estilo = estilo;
    }

    draw(ctx) {

    }

    moveTo(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    
    select(estilo) {
        this.estilo = estilo;
    }

    isPointInside(x, y) {
        return false; //asumimos por defecto que no esta
    } //inPointInside
}