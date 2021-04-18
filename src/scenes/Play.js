class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload() {
        // load images and sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
    	// place starfield
    	this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);

        // green border
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
 
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSizse: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.p1Scoreboard = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 0, scoreConfig);
        
        this.p2Scoreboard = this.add.text(game.config.width - (borderUISize + borderPadding), borderUISize + borderPadding*2, 0, scoreConfig).setOrigin(1, 0);


        // define Player1 keys
        keyUP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // define Player2 keys
        keyUP2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // instantiate Player1 class
        this.p1 = new Player(this, game.config.width/3, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.p1.create(keyLEFT1, keyRIGHT1, this.p1Scoreboard);
        this.p1Rocket = new Rocket(this, game.config.width/3, game.config.height - borderUISize - borderPadding - this.p1.height, 'rocket').setOrigin(0.5, 0);
        this.p1Rocket.create(this.p1, keyUP1);

        // instantiate Player2 class
        this.p2 = new Player(this, 2 * game.config.width/3, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.p2.create(keyLEFT2, keyRIGHT2, this.p2Scoreboard);
        this.p2Rocket = new Rocket(this, 2 * game.config.width/3, game.config.height - borderUISize - borderPadding - this.p1.height, 'rocket').setOrigin(0.5, 0);
        this.p2Rocket.create(this.p2, keyUP2);

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, ()=> {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ᐊ for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.timerSeconds = game.settings.gameTimer / 1000;
        this.timeStart = this.time.now;

        // visual timer
        this.visTimer = this.add.text(game.config.width/2, borderUISize + borderPadding*2, this.timerSeconds, scoreConfig).setOrigin(0.5,0);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx_select');
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT1)) {
            this.sound.play('sfx_select');
            this.scene.start('menuScene');
        }

        this.starfield.tilePositionX -= starSpeed;

        if (!this.gameOver) {
            this.p1.update();
            this.p1Rocket.update();
            this.p2.update();
            this.p2Rocket.update();
            //update spaceships (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            //update timer
            this.visTimer.text = this.timerSeconds - Math.round((this.time.now - this.timeStart) / 1000)
        }

        this.checkAllCollisions(this.p1Rocket);
        this.checkAllCollisions(this.p2Rocket);

        this.checkMiss(this.p1Rocket);
        this.checkMiss(this.p2Rocket);
    }

    checkAllCollisions(rocket) {
        // check collisions
        if (this.checkCollision(rocket, this.ship03)) {
            rocket.reset();
            this.shipExplode(this.ship03, rocket);
        }
        else if (this.checkCollision(rocket, this.ship02)) {
            rocket.reset();
            this.shipExplode(this.ship02, rocket);
        }
        else if (this.checkCollision(rocket, this.ship01)) {
            rocket.reset();
            this.shipExplode(this.ship01, rocket);
        }
        // "catch" the rocket with the ship
        else if (this.checkCollision(rocket, rocket.player)){
            rocket.reset();
        }
    }

    checkCollision(a, b) {
        // simple AABB checking
        if (a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.height + a.y > b.y) {
                return true;
            } else {
                return false;
            }
    }

    checkMiss(rocket) {
        // call miss timer, if it touches the ground or the sky
		if ((rocket.y <= borderUISize || rocket.y >= game.config.height - borderUISize - borderPadding) && !rocket.isMissed) {
			this.rocketMissed(rocket);
		}
    }

    shipExplode(ship, rocket) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             //play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
            ship.reset();       // reset ship position
            ship.alpha = 1;     // make ship visible again
            boom.destroy();     // remove explosion sprite
        });
        // score add and repaint
        rocket.player.score += ship.points;
        console.log(rocket.player.score);
        rocket.player.scoreboard.text = rocket.player.score;
        this.sound.play('sfx_explosion');
    }


    rocketMissed(rocket) {
        rocket.isMissed = true;
        this.time.delayedCall(game.settings.missTimer, ()=> rocket.reset(), null, this);
    }
}