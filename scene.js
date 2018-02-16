class Scene {
    
    constructor(canvas) {
        this.canvas = canvas;
        this.board = new Board();
        this.startGame = false;
        document.onkeydown = this.onKeyDown.bind(this);
        document.onkeyup = this.onKeyUp.bind(this);
        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.startButton = new Button(200, 400, 8, "start");
    }
    
    update(deltatime) {
        this.board.update(deltatime);
        if (this.board.isOver) {
            this.startButton.visible = true;
            this.startGame = false;
        }
    }
    
    render(context) {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.imageSmoothingEnabled = false;
        this.board.render(context);
        this.startButton.render(context);
    }
    
    onMouseDown(evt) {
        var rect = this.canvas.getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;
        if (this.startButton.collide(x, y)) {
            this.startButton.visible = false;
            this.startGame = true;
            this.board.reset();
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


