class Piece2 extends Piece {
    
    constructor(tileSize) {
        
        super(4, 0, 2, tileSize);
        
        var rotated0 = [
            1, 1,
            1, 1
        ];

        this.setRotationsMatrix([rotated0]);
        
    }
}
