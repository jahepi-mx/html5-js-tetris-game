class TileAnimation {
    
    constructor(x, y, tileWidth, tileHeight) {
        this.x = x;
        this.y = y;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.isDead = false;
        this.animation = new Animation(11, 3);
        this.animation.stopAtSequenceNumber(1, this.onStopAnimation.bind(this));
        this.atlas = Atlas.getInstance();
        this.assets = Assets.getInstance();
    }
    
    update(deltatime) {
        this.animation.update(deltatime);
    }
    
    render(context) {
        var frame = "explode" + (this.animation.getFrame() + 1);
        context.drawImage(this.assets.spritesAtlas, this.atlas.sprites[frame].x, this.atlas.sprites[frame].y, this.atlas.sprites[frame].width, this.atlas.sprites[frame].height, this.x * this.tileWidth, this.y * this.tileHeight, this.tileWidth, this.tileHeight);
    }
    
    onStopAnimation() {
        this.isDead = true;
    }
}

