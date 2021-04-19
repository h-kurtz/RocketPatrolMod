class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload() {
        // load images and sprites
        this.load.image('hat', './assets/hat.png');
        this.load.image('player', './assets/man.png');
        this.load.image('bottle', './assets/bottle.png');
        this.load.image('bg1', './assets/bg1.png');
        this.load.image('bg2', './assets/bg2.png');
        this.load.image('streetlamps', './assets/streetlamps.png');
        this.load.image('road', './assets/road.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
        // red bg
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x7860B1).setOrigin(0, 0);

        // place background
    	this.bgLayer2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2').setOrigin(0, 0);
        this.bgLayer1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1').setOrigin(0, 0);
        this.bgLamps = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'streetlamps').setOrigin(0, 0);
        this.bgRoad = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'road').setOrigin(0, 0);

        this.bgLayer2b = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2').setOrigin(0, 0);
        this.bgLayer1b = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1').setOrigin(0, 0);
        this.bgLampsb = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'streetlamps').setOrigin(0, 0);
        this.bgRoadb = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'road').setOrigin(0, 0);

        this.bgLayer2b.flipY = true;
        this.bgLayer1b.flipY = true;
        this.bgLampsb.flipY = true;
        this.bgRoadb.flipY = true;

        // green border
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        //this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
 
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSizse: '32px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 50
        }
        
        // display scoreboards
        this.p1Scoreboard = this.add.text(game.config.height, game.config.height, 0, scoreConfig).setOrigin(1);
        this.p2Scoreboard = this.add.text(0, 0, 0, scoreConfig);
        

        // define Player1 keys
        keyUP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // define Player2 keys
        keyUP2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // instantiate Player1 class
        this.p1 = new Player(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'player', 0, keyLEFT1, keyRIGHT1, this.p1Scoreboard).setOrigin(0.5, 1);
        this.p1Rocket = new Rocket(this, game.config.width/3, game.config.height - borderUISize - borderPadding - this.p1.height, 'hat', 0, this.p1, keyUP1, false).setOrigin(0.5, 1);

        // instantiate Player2 class
        this.p2 = new Player(this, game.config.width/2, borderUISize + borderPadding, 'player', 0, keyLEFT2, keyRIGHT2, this.p2Scoreboard).setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, game.config.width/2, borderUISize + borderPadding + this.p1.height, 'hat', 0, this.p2, keyUP2, true).setOrigin(0.5, 0);

        // add spaceship (x3)
        /*
        this.spaceships = [
            new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0),
            new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0),
            new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0),
        ] */

        this.spaceships = [game.settings.spaceshipAmount];
        for (let i = 0; i < game.settings.spaceshipAmount; i++) {
            this.spaceships[i] = new Spaceship(this, game.config.width, game.config.height/2 + (borderPadding * (((2 * (i % 2)) - 1) * (i * 2))), 
            'bottle', 0, 30).setOrigin(0, 0);
        }

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

        this.song = this.sound.add('music', {volume: 0.5, loop: true});
        this.song.play();

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, ()=> {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ᐊ for Menu', scoreConfig).setOrigin(0.5);
            this.song.stop();
            this.gameOver = true;
        }, null, this);

        this.timerSeconds = game.settings.gameTimer / 1000;
        this.timeStart = this.time.now;

        // visual timer
        this.visTimer = this.add.text(game.config.width, 0, this.timerSeconds, scoreConfig).setOrigin(1,0);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx_select', {volume:0.5});
            this.scene.restart();
        }
        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyLEFT1) || Phaser.Input.Keyboard.JustDown(keyLEFT2))) {
            this.sound.play('sfx_select', {volume:0.5});
            this.scene.start('menuScene');
        }

        if (!this.gameOver) {
            this.bgRoad.tilePositionX  -= bgSpeed;
            this.bgLamps.tilePositionX  -= bgSpeed * 0.8;
            this.bgLayer1.tilePositionX -= bgSpeed * 0.6;
            this.bgLayer2.tilePositionX -= bgSpeed * 0.4;
    
            this.bgRoadb.tilePositionX  += bgSpeed;
            this.bgLampsb.tilePositionX  += bgSpeed * 0.8;
            this.bgLayer1b.tilePositionX += bgSpeed * 0.6;
            this.bgLayer2b.tilePositionX += bgSpeed * 0.4;

            this.p1.update();
            this.p1Rocket.update();
            this.p2.update();
            this.p2Rocket.update();
            //update spaceships (x3)
            this.spaceships.forEach(ship => {
                ship.update();
            });
            //update timer
            this.visTimer.text = this.timerSeconds - Math.round((this.time.now - this.timeStart) / 1000)
        }

        this.checkAllCollisions(this.p1Rocket);
        this.checkAllCollisions(this.p2Rocket);

        if(this.checkCollision(this.p1Rocket, this.p2Rocket)) {
            this.p1Rocket.reset();
            this.p2Rocket.reset();
            this.sound.play('sfx_explosion', {volume:0.5});
        }

        this.checkMiss(this.p1Rocket);
        this.checkMiss(this.p2Rocket);
    }

    checkAllCollisions(rocket) {
        this.spaceships.forEach(ship => {
            if (this.checkCollision(rocket, ship) && ship.alpha != 0) {
                rocket.reset();
                this.shipExplode(ship, rocket);
            }
        });
        // "catch" the rocket with the ship
        if (this.checkCollision(rocket, rocket.player)){
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
        rocket.player.scoreboard.text = rocket.player.score;
        this.sound.play('sfx_explosion', {volume:0.5});
    }


    rocketMissed(rocket) {
        rocket.isMissed = true;
        this.time.delayedCall(game.settings.missTimer, ()=> rocket.reset(), null, this);
        this.sound.play('sfx_miss', {volume:0.25})
    }
}