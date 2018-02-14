class Piece {
    
    constructor(x, y, size, tileSize) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize; // tile pixel width height
        this.size = size; // tetromino width height size
        this.rotationIndex = 0;
        this.rotations = [];
        
    }
    
    setRotationsMatrix(rotations) {
        for (let rotation of rotations) {
            this.rotations.push(rotation);
        }
    }
    
    render(context) {
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                if (this.rotations[this.rotationIndex][y * this.size + x] === 1) {
                    var currX = this.x + x;
                    var currY = this.y + y;
                    context.fillStyle = "#0000FF";
                    context.fillRect(currX * this.tileSize, currY * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }
    }
    
    update(deltatime) {
        
    }
    
    rotate() {
        this.rotationIndex++;
        this.rotationIndex %= this.rotations.length;
    }
    
    left() {
        this.x--;
    }
    
    right() {
        this.x++;
    }
    
    down() {
        this.y++;
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
    
    getRotationMatrix() {
        return this.rotations[this.rotationIndex];
    }
    
    getRotationMatrixValue(x, y) {
        return this.rotations[this.rotationIndex][y * this.size + x];
    }
}
