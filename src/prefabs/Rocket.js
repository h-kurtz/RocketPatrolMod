// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);

		// add object to existing scene
		scene.add.existing(this); // <- references scene
        this.isFiring = false;  // track rocket firing status
		this.isMissed = false;

		this.moveSpeedX = 0;
		this.moveSpeedY = 0;
		this.isThrust = false;
		this.initialThrust = -8;
		this.thrustSpeed = -0.11;
		this.gravity = 0.15;

		this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
	}

	create(playerParent) {
		this.player = playerParent;
	}

    update() {
		if (!this.isFiring) {
			this.x = this.player.x;
		}

		// fire button, setup thrust phase
		if(Phaser.Input.Keyboard.JustDown(keyUP) && !this.isFiring) {
			this.isFiring = true;
			this.isThrust = true;
			this.moveSpeedY = this.initialThrust; // add initial thrust
			this.moveSpeedX = this.player.moveSpeedX;
			this.sfxRocket.play(); // play sfx
		}
		
		// if fired, move the rocket up
		// when climbing, if players hold the shoot button, they will continue to thrust
		if(this.isFiring) {
			this.x += this.moveSpeedX

			// wrap around
			if(this.x <= borderPadding && this.moveSpeedX < 0) {
				this.x = game.config.width - borderUISize ;
			} else if (this.x >= game.config.width - borderUISize && this.moveSpeedX > 0) {
				this.x = borderUISize-this.width;
			}

			// If they let go, or reach the apex of their arc, they can no longer thrust
			if (Phaser.Input.Keyboard.JustUp(keyUP) && this.isThrust ||this.moveSpeedY > 0) {
				this.isThrust = false;
			} else if (keyUP.isDown && this.isThrust) {
				this.moveSpeedY += this.thrustSpeed;
			}
			this.moveSpeedY += this.gravity;
			this.y += this.moveSpeedY;

		}
    }

	// reset rocket to "ground"
	reset() {
		this.isFiring = false;
		this.isMissed = false;
		this.moveSpeedX = 0;
		this.y = game.config.height - borderUISize - borderPadding - this.player.height;
	}
}
