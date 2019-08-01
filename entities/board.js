class Board {
    
    constructor(tileWidth, tileHeight) {   
        this.width = 10;
        this.height = 20;
        this.matrix = [];
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.pieces = [
            new Piece(3, 0, 3, this.tileWidth, this.tileHeight, 1, [1, 0, 0, 1, 1, 1, 0, 0, 0]),
            new Piece(4, 0, 2, this.tileWidth, this.tileHeight, 2, [1, 1, 1, 1]),
            new Piece(3, 0, 3, this.tileWidth, this.tileHeight, 3, [0, 0, 1, 1, 1, 1, 0, 0, 0]),
            new Piece(3, 0, 3, this.tileWidth, this.tileHeight, 4, [0, 1, 1, 1, 1, 0, 0, 0, 0]),
            new Piece(3, 0, 3, this.tileWidth, this.tileHeight, 5, [1, 1, 0, 0, 1, 1, 0, 0, 0]),
            new Piece(3, 0, 3, this.tileWidth, this.tileHeight, 6, [0, 1, 0, 1, 1, 1, 0, 0, 0]),
            new Piece(3, 0, 4, this.tileWidth, this.tileHeight, 7, [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        ];    
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        this.init();
    }
    
    init() {
        this.queue = [];
        for (var a = 0; a < 5; a++) {
           this.queue.push(this.pieces[this.getNextPiece()].clone());
        }
        for (var a = 0; a < this.width * this.height; a++) {
            this.matrix[a] = 0;
        }
        this.animationTiles = [];
        this.time = 0;
        this.lines = 0;
        this.tmpLines = 0;
        this.piece = this.queue.shift();
        this.downSpeedTimeLimit = 0.4;
        this.downSpeedTimeLimitCopy = this.downSpeedTimeLimit;
        this.downSpeedTimeLimitTmp = 0;
        this.downSpeedTime = 0;
        this.moveTime = 0;
        this.moveTimeLimit = 0.1;
        this.moveLeft = false;
        this.moveRight = false;
        this.rotated = false;
        this.rotationDone = false;
        this.isOver = false;
        this.speedTimeIncrementTime = 0;
        this.speedTimeIncrementTimeLimit = 60;
    }
    
    update(deltatime) {
        
        if (this.isOver) {
            return;
        }
        
        this.time += deltatime;
        this.speedTimeIncrementTime += deltatime;
        
        if (this.tmpLines > 0 && this.tmpLines % 10 === 0) {
            if (this.downSpeedTimeLimitTmp > 0) {
                this.downSpeedTimeLimitTmp *= 2;
                if (this.downSpeedTimeLimitTmp > this.downSpeedTimeLimitCopy) {
                    this.downSpeedTimeLimitTmp = this.downSpeedTimeLimitCopy;
                }
            } else {
                this.downSpeedTimeLimit *= 2;
                if (this.downSpeedTimeLimit > this.downSpeedTimeLimitCopy) {
                    this.downSpeedTimeLimit = this.downSpeedTimeLimitCopy;
                }
            }
            this.tmpLines = 0;
            this.speedTimeIncrementTime = 0;
        }
        
        if (this.speedTimeIncrementTime >= this.speedTimeIncrementTimeLimit) {
            if (this.downSpeedTimeLimitTmp > 0) {
                this.downSpeedTimeLimitTmp *= 0.5;
            } else {
                this.downSpeedTimeLimit *= 0.5;
            }
            this.speedTimeIncrementTime = 0;
        }
        
        for (var a = 0; a < this.animationTiles.length; a++) {
            this.animationTiles[a].update(deltatime);
            if (this.animationTiles[a].isDead) {
                this.animationTiles.splice(a--, 1);
            }
        }
        
        this.downSpeedTime += deltatime;
        if (this.downSpeedTime >= this.downSpeedTimeLimit) {
            this.downSpeedTime = 0;
            var prevY = this.piece.y;
            this.piece.y++;
            if (this.collide(this.piece)) {
                this.piece.y = prevY;         
                for (var y = this.piece.y; y < this.piece.y + this.piece.size; y++) {
                    for (var x = this.piece.x; x < this.piece.x + this.piece.size; x++) {
                        if (this.piece.getValue(x - this.piece.x, y - this.piece.y) > 0) {
                            this.matrix[y * this.width + x] = this.piece.type;
                        }
                    }
                }
                this.clearLines();
                this.queue.push(this.pieces[this.getNextPiece()].clone());
                this.piece = this.queue.shift();
                // If it is collinding with something the game must end.
                if (this.collide(this.piece)) {
                    this.isOver = true;
                    this.piece = null;
                }
                return;
            }
        }
        
        this.moveTime += deltatime;
        
        if (this.moveLeft && this.moveTime >= this.moveTimeLimit) {
            this.moveTime = 0;
            var prevX = this.piece.x;
            this.piece.x--;
            if (this.collide(this.piece)) {
                this.piece.x = prevX;
            }
        }
        
        if (this.moveRight && this.moveTime >= this.moveTimeLimit) {
            this.moveTime = 0;
            var prevX = this.piece.x;
            this.piece.x++;
            if (this.collide(this.piece)) {
                this.piece.x = prevX;
            }
        }
        
        if (this.rotated && !this.rotationDone) {
            this.rotationDone = true;
            this.piece.rotate();
            if (this.collide(this.piece)) {
                this.piece.restorePreviousMatrix();
            }
        }       
    }
    
    render(context) {       
        for (var a = 0; a < this.width * this.height; a++) {
            var x = a % this.width;
            var y = Math.floor(a / this.width);
            var name = "s" + this.matrix[a];
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[name].x, this.atlas.sprites[name].y, this.atlas.sprites[name].width, this.atlas.sprites[name].height, x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);  
        }
        
        if (this.piece !== null) {
            this.piece.render(context);
        }
        
        for (let tile of this.animationTiles) {
            tile.render(context);
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
    
    down(bool) {
        if (bool) {
            if (this.downSpeedTimeLimitTmp <= 0) {
                this.downSpeedTimeLimitTmp = this.downSpeedTimeLimit;
                this.downSpeedTimeLimit *= 0.2;
            }
        } else {
            this.downSpeedTimeLimit = this.downSpeedTimeLimitTmp;
            this.downSpeedTimeLimitTmp = 0;
        }
    }
    
    rotate(bool) {
        this.rotated = bool;
        if (!bool) {
            this.rotationDone = false;
        }
    }
    
    collide(piece) {
        for (var y = 0; y < piece.size; y++) {
            for (var x = 0; x < piece.size; x++) {
                if (piece.getValue(x, y) > 0) {
                    var currX = piece.x + x;
                    var currY = piece.y + y;
                    if (currX < 0 || currX >= this.width || currY >= this.height || this.matrix[currY * this.width + currX] > 0) {
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
                this.lines++;
                this.tmpLines = this.lines;
                for (var x = 0; x < this.width; x++) {
                    this.matrix[y * this.width + x] = 0;
                    this.animationTiles.push(new TileAnimation(x, y, this.tileWidth, this.tileHeight));
                }
                
                for (var innerY = y - 1; innerY >= 0; innerY--) {
                    for (var x = 0; x < this.width; x++) {
                        if (this.matrix[innerY * this.width + x] > 0) {
                            this.matrix[(innerY + 1) * this.width + x] = this.matrix[innerY * this.width + x];
                            this.matrix[innerY * this.width + x] = 0;
                        }
                    }
                }
            }
        }
    }
    
    getNextPiece() {
        while (true) {
            var index = Math.round((this.pieces.length - 1) * Math.random());
            var found = false;
            for (let piece of this.queue) {
                if (this.pieces[index].type === piece.type) {
                    found = true;
                }
            }
            if (found === false) {
                return index;
            }
        }
    }
    
    getCurrentSpeed() {
        return Math.round(this.downSpeedTimeLimitCopy / this.downSpeedTimeLimit);
    }
    
    reset() {
        this.init();
    }
}
