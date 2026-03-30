class Figura {

    constructor(posX, posY, fill, estilo) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.estilo = estilo;
    } // constructor()

    draw(ctx) {
        // Nothing to do
    } // draw()

    moveTo(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    } // moveTo()

    select(estilo) {
        this.estilo = estilo;
    } // select()

    isPointInside(x, y) {
        return false;
    } // isPointInside()

} // Figura