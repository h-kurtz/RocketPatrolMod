// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame, playerParent, keyUP, inverted) {
		super(scene, x, y, texture, frame);

		// add object to existing scene
		scene.add.existing(this); // <- references scene
        this.isFiring = false;  // track rocket firing status
		this.isMissed = false;
		this.isThrust = false;

		// initialize movement and acceleration variables
		this.moveSpeedX = 0;
		this.moveSpeedY = 0;
		this.initialThrust = -8;
		this.thrustSpeed = -0.11;
		this.gravity = 0.18;

		this.player = playerParent;

		// set controls
		this.keyUP = keyUP;

		this.inverted = inverted;
		if (inverted) {
            this.invert = -1;
			this.flipY = true;
			this.player.flipY = true;
        } else {
			this.invert = 1;
		}

		this.sfxRocket = scene.sound.add('sfx_rocket', {volume:0.5}); // add rocket sfx
	}

    update() {
		if (!this.isFiring) {
			this.x = this.player.x;
		}

		// fire button, setup thrust phase
		if(Phaser.Input.Keyboard.JustDown(this.keyUP) && !this.isFiring) {
			this.isFiring = true;
			this.isThrust = true;
			this.moveSpeedY = this.initialThrust * this.invert; // add initial thrust
			this.moveSpeedX = this.player.moveSpeedX;
			this.sfxRocket.play(); // play sfx
		}
		
		// if fired, move the rocket up
		// when climbing, if players hold the shoot button, they will continue to thrust
		if(this.isFiring) {
			this.x += this.moveSpeedX

			// wrap around
			if(this.x <= 0 - (this.width / 2) && this.moveSpeedX < 0) {
				this.x = game.config.width + (this.width / 2);
			} else if (this.x >= game.config.width + (this.width / 2) && this.moveSpeedX > 0) {
				this.x = 0 - (this.width / 2);
			}

			// If they let go, or reach the apex of their arc, they can no longer thrust
			if (Phaser.Input.Keyboard.JustUp(this.keyUP) && this.isThrust ||((this.moveSpeedY > 0 && !this.inverted) || (this.moveSpeedY < 0 && this.inverted))) {
				this.isThrust = false;
			} else if (this.keyUP.isDown && this.isThrust) {
				this.moveSpeedY += this.thrustSpeed * this.invert;
			}
			this.moveSpeedY += this.gravity * this.invert;
			this.y += this.moveSpeedY;
		}
    }

	// reset rocket to "ground"
	reset() {
		this.isFiring = false;
		this.isMissed = false;
		this.moveSpeedX = 0;
		if (this.inverted) {
			this.y = borderPadding + borderUISize + this.player.height;
		} else {
			this.y = game.config.height - borderUISize - borderPadding - this.player.height;
		}
	}
}
