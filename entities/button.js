class Button {
    
    constructor(x, y, canvas, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
        var ratio = this.atlas.sprites[this.name].width / this.atlas.sprites[this.name].height;
        this.width = canvas.width * 0.15 * ratio;
        this.height = canvas.width * 0.15;
        this.visible = true;
    }
    
    render(context) {
        if (this.visible) {
            context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[this.name].x, this.atlas.sprites[this.name].y, this.atlas.sprites[this.name].width, this.atlas.sprites[this.name].height, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }
    }
    
    collide(x, y) {
        return x >= this.x - this.width / 2 && x <= this.x + this.width / 2 &&
                y >= this.y - this.height / 2 && y <= this.y + this.height / 2 && this.visible;
    }
    
}


