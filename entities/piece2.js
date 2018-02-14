class Piece2 extends Piece {
    
    constructor(x, y, tileSize) {
        
        super(x, y, 2, tileSize);
        
        var rotated0 = [
            1, 1,
            1, 1
        ];

        this.setRotationsMatrix([rotated0]);
        
    }
}
