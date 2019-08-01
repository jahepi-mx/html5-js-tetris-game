class Piece {
    
    constructor(x, y, size, tileWidth, tileHeight, type, matrix) {
        this.x = x;
        this.y = y;
        this.tileWidth = tileWidth; // tile pixel width height
        this.tileHeight = tileHeight;
        this.size = size; // tetromino width height size
        this.type = type;
        this.matrix = matrix;
        this.prevMatrix = matrix;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
    }
    
    render(context) {
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                if (this.matrix[y * this.size + x] === 1) {
                    var currX = this.x + x;
                    var currY = this.y + y;
                    var name = "s" + this.type;
                    context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[name].x, this.atlas.sprites[name].y, this.atlas.sprites[name].width, this.atlas.sprites[name].height, currX * this.tileWidth, currY * this.tileHeight, this.tileWidth, this.tileHeight);
                }
            }
        }
    }
    
    update(deltatime) {
        
    }
    
    rotate() {
        /* 
         Rotation sample of 3x3 matrix to help build the algorithm
            0,0 - 0,2
            1,0 - 0,1
            2,0 - 0,0

            0,1 - 1,2
            1,1 - 1,1
            2,1 - 1,0
        
            0,2 - 2,2
            1,2 - 2,1
            2,2 - 2,0   
         */
        var newMatrix = [];
        for (var a = 0; a < this.size * this.size; a++) {
            var x = a % this.size;
            var y = Math.floor(a / this.size);
            var newX = y;
            var newY = this.size - x - 1;
            newMatrix[newY * this.size + newX] = this.matrix[a];
        }
        this.prevMatrix = this.matrix;
        this.matrix = newMatrix;
    }
    
    restorePreviousMatrix() {
        this.matrix = this.prevMatrix;
    }
    
    getValue(x, y) {
        return this.matrix[y * this.size + x];
    }
    
    clone() {
        return new Piece(this.x, this.y, this.size, this.tileWidth, this.tileHeight, this.type, this.matrix);
    }
}
