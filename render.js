class Render {
    
    constructor(canvas, context, controller) {
        this.context = context;
        this.canvas = canvas;
        this.controller = controller;
    }    
    
    update(deltatime) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.imageSmoothingEnabled = false;
        
        this.controller.update(deltatime);
        
        this.controller.board.render(this.context);
    }
    
}


