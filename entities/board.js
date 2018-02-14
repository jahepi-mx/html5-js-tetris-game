class Board {
    
    constructor() {
        
        this.matrix = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
        
        this.width = 10;
        this.height = 20;
        this.piece = null;
        this.downSpeedTimeLimit = 0.2;
        this.downSpeedTime = 0;
        this.moveTime = 0;
        this.moveTimeLimit = 0.1;
        this.moveRotationTime = 0;
        this.moveRotationTimeLimit = 0.3;
        this.tileSize = 40;
        this.moveLeft = false;
        this.moveRight = false;
        this.rotated = false;
        this.piecesClasses = [Piece1, Piece2, Piece3, Piece4, Piece5, Piece6, Piece7];
    }
    
    add(piece) {
        this.piece = piece;
    }
    
    update(deltatime) {
        
        if (this.piece === null) {
            return;
        }
        
        this.downSpeedTime += deltatime;
        if (this.downSpeedTime >= this.downSpeedTimeLimit) {
            this.downSpeedTime = 0;
            var prevY = this.piece.getY();
            this.piece.down();
            if (this.collide(this.piece)) {
                this.piece.y = prevY;         
                for (var y = this.piece.getY(); y < this.piece.getY() + this.piece.size; y++) {
                    for (var x = this.piece.getX(); x < this.piece.getX() + this.piece.size; x++) {
                        if (this.piece.getRotationMatrixValue(x - this.piece.getX(), y - this.piece.getY()) === 1) {
                            this.matrix[y * this.width + x] = 1;
                        }
                    }
                }
                this.clearLines();
                this.piece = null;
                return;
            }
        }
        
        this.moveTime += deltatime;
        this.moveRotationTime += deltatime;
        
        if (this.moveLeft && this.moveTime >= this.moveTimeLimit) {
            this.moveTime = 0;
            var prevX = this.piece.getX();
            this.piece.left();
            if (this.collide(this.piece)) {
                this.piece.x = prevX;
            }
        }
        
        if (this.moveRight && this.moveTime >= this.moveTimeLimit) {
            this.moveTime = 0;
            var prevX = this.piece.getX();
            this.piece.right();
            if (this.collide(this.piece)) {
                this.piece.x = prevX;
            }
        }
        
        if (this.rotated && this.moveRotationTime >= this.moveRotationTimeLimit) {
            this.moveRotationTime = 0;
            var prevRotationIndex = this.piece.rotationIndex;
            this.piece.rotate();
            if (this.collide(this.piece)) {
                this.piece.rotationIndex = prevRotationIndex;
            }
        }       
    }
    
    hasPiece() {
        return this.piece !== null;
    }
    
    render(context) {
        
        for (var a = 0; a < this.width * this.height; a++) {
            var x = a % this.width;
            var y = Math.floor(a / this.width);
            if (this.matrix[a] === 1) {
                context.fillStyle = "#8ED6FF";
            } else {
                context.fillStyle = "#FF00FF";
            }
            context.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        }
        
        if (this.piece !== null) {
            this.piece.render(context);
        }
    }
    
    left(bool) {
        if (bool) {
            this.moveRight = false;
        }
        this.moveLeft = bool;
    }
    
    right(bool) {
        if (bool) {
            this.moveLeft = false;
        }
        this.moveRight = bool;
    }
    
    rotate(bool) {
        this.rotated = bool;
    }
    
    collide(piece) {
        for (var y = 0; y < piece.size; y++) {
            for (var x = 0; x < piece.size; x++) {
                if (piece.getRotationMatrixValue(x, y) === 1) {
                    var currX = piece.getX() + x;
                    var currY = piece.getY() + y;
                    if (currX < 0 || currX >= this.width || currY >= this.height || this.matrix[currY * this.width + currX] === 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    clearLines() {
        for (var y = 0; y < this.height; y++) {
            var clear = true;
            for (var x = 0; x < this.width; x++) {
                if (this.matrix[y * this.width + x] === 0) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                for (var x = 0; x < this.width; x++) {
                    this.matrix[y * this.width + x] = 0;
                }
                
                for (var innerY = y - 1; innerY >= 0; innerY--) {
                    for (var x = 0; x < this.width; x++) {
                        if (this.matrix[innerY * this.width + x] === 1) {
                            this.matrix[innerY * this.width + x] = 0;
                            this.matrix[(innerY + 1) * this.width + x] = 1;
                        }
                    }
                }
            }
        }
    }
    
    getRandomPiece() {
        var index = Math.round((this.piecesClasses.length - 1) * Math.random());
        return new this.piecesClasses[index](0, 0, this.tileSize);
    }
}
