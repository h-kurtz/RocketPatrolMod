class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        this.points = pointValue;   // store pointValue;
        this.moveSpeed = game.settings.spaceshipMaxSpeed;
        this.dirLeft = true;

        this.reset();
    }

    update () {
        // move spaceship 
        if (this.dirLeft) {
            this.x -= this.moveSpeed;
        } else {
            this.x += this.moveSpeed
        }
        // wrap around
        if(this.dirLeft && this.x <= 0 - this.width) {
            this.x = game.config.width;
        } else if (!this.dirLeft && this.x > game.config.width) {
            this.x = 0 - this.width;
        }
    }

    // reset and randomize
    reset () {
        let random = Math.random()
        this.dirLeft = Math.floor(random * 2) == 0;
        random = Math.abs(random - 0.5) * 2;
        this.moveSpeed = Math.ceil(game.settings.spaceshipMaxSpeed * random);
        if (this.dirLeft) {
            this.flipX = false;
            this.x = game.config.width + (borderUISize * random * 6);
        } else {
            this.flipX = true;
            this.x = 0 - (borderUISize * random * 6);
        }
    }
}