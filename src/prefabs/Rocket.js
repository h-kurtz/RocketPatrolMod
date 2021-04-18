// Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);

		// add object to existing scene
		scene.add.existing(this); // <- references scene
        this.isFiring = false;  // track rocket firing status

        this.moveSpeedX = 0;     // pixels per frame
		this.maxSpeed = 3;
		this.minSpeed = 0.1;
		this.acceleration = 0.1;	// acceleration;
		this.friction = 0.075;

		this.moveSpeedY = 0;
		this.isThrust = false;
		this.initialThrust = -4;
		this.thrustSpeed = -0.055;
		this.gravity = 0.075;

		this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
	}

    update() {
	    // left/right movement with acceleration
	    if(!this.isFiring) {
	    	if(keyLEFT.isDown && this.x >= borderUISize - this.width && this.moveSpeedX > -this.maxSpeed) {
		    	this.moveSpeedX -= this.acceleration;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize && this.moveSpeedX < this.maxSpeed) {
			    this.moveSpeedX += this.acceleration;
    		}
			else { // reduce speed with friction if not moving
				if (this.moveSpeedX > 0) {
					this.moveSpeedX -= this.friction;
				} else if (this.moveSpeedX < 0) {
					this.moveSpeedX += this.friction;
				}
			}
	    }
		// update position based on speed if over a threshold
		if (this.moveSpeedX >= this.minSpeed || this.moveSpeedX <= -this.minSpeed) {
			this.x += this.moveSpeedX;
		}

        if(this.x <= borderPadding && this.moveSpeedX < 0) {
            this.x = game.config.width - borderUISize ;
        } else if (this.x >= game.config.width - borderUISize && this.moveSpeedX > 0) {
			this.x = borderUISize-this.width;
		}

		// fire button, setup thrust phase
		if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
			this.isFiring = true;
			this.isThrust = true;
			this.moveSpeedY = this.initialThrust; // add initial thrust
			this.sfxRocket.play(); // play sfx
		}
		
		// if fired, move the rocket up
		// when climbing, if players hold the shoot button, they will continue to thrust
		if(this.isFiring) {
			// If they let go, or reach the apex of their arc, they can no longer thrust
			if (Phaser.Input.Keyboard.JustUp(keyF) && this.isThrust ||this.moveSpeedY > 0) {
				this.isThrust = false;
			} else if (keyF.isDown && this.isThrust) {
				this.moveSpeedY += this.thrustSpeed;
			}
			this.moveSpeedY += this.gravity;
			this.y += this.moveSpeedY;
		}
		// reset on miss, if it touches the ground or the sky
		if (this.y <= borderUISize * 3 + borderPadding || this.y >= game.config.height - borderUISize - borderPadding) {
			this.reset();
		}
    }

	// reset rocket to "ground"
	reset() {
		this.isFiring = false;
		this.y = game.config.height - borderUISize - borderPadding;
	}
}
