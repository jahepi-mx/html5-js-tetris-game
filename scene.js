class Scene {
    
    constructor(canvas, context) {
        this.controller = new Controller();
        this.render = new Render(canvas, context, this.controller);
        document.onkeydown = this.onKeyDown.bind(this);
        document.onkeyup = this.onKeyUp.bind(this);
    }
    
    update(deltatime) {
        this.render.update(deltatime);
    }
    
    onKeyDown(event) {
        var evt = event || window.event;      
        if (evt.keyCode === 37) {
            this.controller.left(true);
        }
        if (evt.keyCode === 39) {
            this.controller.right(true);
        }
        if (evt.keyCode === 38) {
            this.controller.rotate(true);
        }
        if (evt.keyCode === 40) {
            this.controller.down(true);
        }
    }
    
    onKeyUp(event) {
        var evt = event || window.event;
        if (evt.keyCode === 37) {
            this.controller.left(false);
        }
        if (evt.keyCode === 39) {
            this.controller.right(false);
        }
        if (evt.keyCode === 38) {
            this.controller.rotate(false);
        }
        if (evt.keyCode === 40) {
            this.controller.down(false);
        }
    }
}


