class Piece5 extends Piece {
    
    constructor(x, y, tileSize) {
        
        super(x, y, 3, tileSize);
        
        var rotated0 = [
            1, 1, 0,
            0, 1, 1,
            0, 0, 0
        ];
        
        var rotated90 = [
            0, 1, 0,
            1, 1, 0,
            1, 0, 0
        ];
        
        var rotated180 = [
            0, 0, 0,
            1, 1, 0,
            0, 1, 1
        ];
        
        var rotated360 = [
            0, 0, 1,
            0, 1, 1,
            0, 1, 0
        ];

        this.setRotationsMatrix([rotated0, rotated90, rotated180, rotated360]);
        
    }
}