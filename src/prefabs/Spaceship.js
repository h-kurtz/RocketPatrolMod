class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speedMult) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        this.points = pointValue;   // store pointValue;
        this.moveSpeed = game.settings.spaceshipMaxSpeed;
    }

    create(speedMult) {
        this.moveSpeed *= speedMult;
    }

    update () {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap aorund from left to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset () {
        this.x = game.config.width;
    }
}