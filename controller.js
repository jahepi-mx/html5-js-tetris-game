class Controller {
    
    constructor() {
        this.board = new Board();
        this.board.add(this.board.getRandomPiece());
    }
    
    update(deltatime) {
        //console.log("fps: " + (1 / deltatime));
        this.board.update(deltatime);
    }
    
    left(bool) {
        this.board.left(bool);
    }
    
    right(bool) {
        this.board.right(bool);
    }
    
    rotate(bool) {
        this.board.rotate(bool);
    }
}

