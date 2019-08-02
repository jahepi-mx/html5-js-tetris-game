class Scene {
    
    constructor(canvas) {
        this.canvas = canvas;
        this.board = new Board(canvas.width * 0.05, canvas.height * 0.05);
        this.startGame = false;
        document.onkeydown = this.onKeyDown.bind(this);
        document.onkeyup = this.onKeyUp.bind(this);
        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.startButton = new Button(canvas.width * 0.25, canvas.height * 0.5, canvas, "start");
        this.music = null;
        this.assets = Assets.getInstance();
        this.atlas = Atlas.getInstance();
    }
    
    update(deltatime) {
        this.board.update(deltatime);
        if (this.board.isOver) {
            this.startButton.visible = true;
            this.startGame = false;
            if (this.music !== null) {
                this.music.stop();
            }
        }
    }
    
    render(context) {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.imageSmoothingEnabled = false;
        this.board.render(context);
        this.startButton.render(context);
        // render board pieces queue
        var xOffset = this.board.width * this.board.tileWidth;
        var sizeX = this.canvas.width * 0.1875;
        var sizeY = this.canvas.height * 0.1875;
        for (var a = 0; a < this.board.queue.length; a++) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites["s0"].x, this.atlas.sprites["s0"].y, this.atlas.sprites["s0"].width, this.atlas.sprites["s0"].height, xOffset, a * sizeY, sizeX, sizeY);
            var piece = this.board.queue[a];
            var pieceTileWidthSize = this.canvas.width * 0.025;
            var pieceTileHeightSize = this.canvas.height * 0.025;
            var width = piece.size * pieceTileWidthSize;
            var height = piece.size * pieceTileHeightSize;
            var centerX = xOffset + (sizeX / 2) - (width / 2);
            var centerY = a * sizeY + (sizeY / 2) - (height / 2);
            for (var b = 0; b < piece.size * piece.size; b++) {
                if (piece.matrix[b] === 1) {
                    var name = "s" + piece.type;
                    context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[name].x, this.atlas.sprites[name].y, this.atlas.sprites[name].width, this.atlas.sprites[name].height, centerX + (b % piece.size) * pieceTileWidthSize, centerY + Math.floor(b / piece.size) * pieceTileHeightSize, pieceTileWidthSize, pieceTileHeightSize);
                }
            }  
        }
        
        context.font = parseInt(this.canvas.height * 0.25) + "px joystix";
        context.fillStyle = "rgba(255, 0, 0, 255)";
        context.textAlign = "left";
        context.fillText("JSTetris", xOffset + this.canvas.width * 0.0395, this.board.height * this.board.tileHeight - this.canvas.height * 0.0625);
        
        context.font = parseInt(this.canvas.width * 0.09) + "px joystix";
        context.fillStyle = "rgba(30, 144, 255, 255)";
        context.fillText("time", xOffset + sizeX + this.canvas.width * 0.0125, this.canvas.height * 0.06875);
        
        context.fillStyle = "rgba(176, 224, 230, 255)";
        var minutes = Math.floor(this.board.time / 60);
        var seconds = Math.floor(this.board.time % 60);
        var hours = Math.floor(minutes / 60);
        var minutesLeft = minutes % 60;
        context.font = parseInt(this.canvas.height * 0.15) + "px joystix";
        context.fillText((hours < 10 ? "0" + hours : hours) + ":" + (minutesLeft < 10 ? "0" + minutesLeft : minutesLeft) + ":" + (seconds < 10 ? "0" + seconds : seconds), xOffset + sizeX + this.canvas.width * 0.0125, this.canvas.height * 0.13125);
        context.font = parseInt(this.canvas.height * 0.15) + "px joystix";
        context.fillStyle = "rgba(255, 255, 0, 255)";
        context.fillText("lines", xOffset + sizeX + this.canvas.width * 0.0125, this.canvas.height * 0.13125 * 2);
        context.fillStyle = "rgba(255, 250, 205, 255)";
        context.fillText(this.board.lines, xOffset + sizeX + this.canvas.width * 0.0125, this.canvas.height * 0.13125 * 2.5);
        
        context.fillStyle = "rgba(255, 20, 147, 255)";
        context.fillText("speed", xOffset + sizeX + this.canvas.width * 0.0125, this.canvas.height * 0.13125 * 3.5);
        context.fillStyle = "rgba(255, 105, 180, 255)";
        context.fillText(this.board.getCurrentSpeed() + "x", xOffset + sizeX + this.canvas.width * 0.0125, this.canvas.height * 0.13125 * 4);
    }
    
    onMouseDown(evt) {
        var rect = this.canvas.getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;
        if (this.startButton.collide(x, y)) {
            this.startButton.visible = false;
            this.startGame = true;
            this.board.reset();
            this.music = this.assets.playAudio(this.assets.tetris, true, 0.5);
        }
    }
    
    onMouseUp(evt) {
        console.log(evt);
    }
    
    onKeyDown(event) {
        
        if (!this.startGame) {
            return;
        }
        
        var evt = event || window.event;      
        if (evt.keyCode === 37) {
            this.board.left(true);
        }
        if (evt.keyCode === 39) {
            this.board.right(true);
        }
        if (evt.keyCode === 38) {
            this.board.rotate(true);
        }
        if (evt.keyCode === 40) {
            this.board.down(true);
        }
    }
    
    onKeyUp(event) {
        
        if (!this.startGame) {
            return;
        }
        
        var evt = event || window.event;
        if (evt.keyCode === 37) {
            this.board.left(false);
        }
        if (evt.keyCode === 39) {
            this.board.right(false);
        }
        if (evt.keyCode === 38) {
            this.board.rotate(false);
        }
        if (evt.keyCode === 40) {
            this.board.down(false);
        }
    }
}


