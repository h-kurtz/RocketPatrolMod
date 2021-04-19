// Player (ship) prefab
class Player extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame, keyLEFT, keyRIGHT, scoreboard) {
		super(scene, x, y, texture, frame);

        // add object to existing scene
		scene.add.existing(this); // <- references scene

        this.moveSpeedX = 0;     // pixels per frame
		this.maxSpeed = 3;
		this.minSpeed = 0.1;
		this.acceleration = 0.1;	// acceleration;
		this.friction = 0.075;

        // setup controls
        this.keyLEFT = keyLEFT;
        this.keyRIGHT = keyRIGHT;

        // initialize score
        this.score = 0;
        this.scoreboard = scoreboard;

        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
	}

    update() {
	    // left/right movement with acceleration
        if(this.keyLEFT.isDown && this.x >= 0 - this.width / 2 && this.moveSpeedX > -this.maxSpeed) {
            this.moveSpeedX -= this.acceleration;
        } 
        else if (this.keyRIGHT.isDown && this.x <= game.config.width + this.width / 2 && this.moveSpeedX < this.maxSpeed) {
            this.moveSpeedX += this.acceleration;
        } 
        else { // reduce speed with friction if not moving
            if (this.moveSpeedX > 0) {
                this.moveSpeedX -= this.friction;
            } 
            else if (this.moveSpeedX < 0) {
                this.moveSpeedX += this.friction;
            }
        }

        // update position based on speed if over a threshold
		if (this.moveSpeedX >= this.minSpeed || this.moveSpeedX <= -this.minSpeed) {
			this.x += this.moveSpeedX;
		} else {
            this.moveSpeedX = 0;
        }

        // update position based on speed if over a threshold
		if (this.moveSpeedX >= this.minSpeed || this.moveSpeedX <= -this.minSpeed) {
			this.x += this.moveSpeedX;
		}

		// wrap around
        if(this.x <= 0 - this.width / 2 && this.moveSpeedX < 0) {
            this.x = game.config.width + this.width / 2;
        } else if (this.x >= game.config.width + this.width / 2 && this.moveSpeedX > 0) {
			this.x = 0 - this.width / 2;
		}
    }
}