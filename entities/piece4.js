class Piece4 extends Piece {
    
    constructor(x, y, tileSize) {
        
        super(x, y, 3, tileSize);
        
        var rotated0 = [
            0, 1, 1,
            1, 1, 0,
            0, 0, 0
        ];
        
        var rotated90 = [
            1, 0, 0,
            1, 1, 0,
            0, 1, 0
        ];
        
        var rotated180 = [
            0, 0, 0,
            0, 1, 1,
            1, 1, 0
        ];
        
        var rotated360 = [
            0, 1, 0,
            0, 1, 1,
            0, 0, 1
        ];

        this.setRotationsMatrix([rotated0, rotated90, rotated180, rotated360]);
        
    }
}
