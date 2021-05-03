class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('sfx_select', './assets/sfx_select.wav');
        this.load.audio('sfx_explosion', './assets/sfx_explosion.wav');
        this.load.audio('sfx_rocket', './assets/sfx_rocket.wav');
        this.load.audio('sfx_miss', './assets/miss.wav');
        this.load.audio('sfx_catch', './assets/sfx_catch.wav');
        this.load.audio('sfx_over', './assets/sfx_over.wav')
        this.load.audio('music', './assets/music.mp3');
        this.load.audio('drone', './assets/drone.mp3');

        this.load.image('bg1', './assets/bg1.png');
        this.load.image('bg2', './assets/bg2.png');
        this.load.image('streetlamps', './assets/streetlamps.png');
        this.load.image('road', './assets/road.png');
    }

    create() {
        // display score
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '72px',
            //backgroundColor: '#F3B141',
            color: '#F3B141',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let graphics = this.add.graphics();
        graphics.fillGradientStyle(0x1E182C, 0x1E182C, 0x000000, 0x000000, 1);
        graphics.fillRect(0, 0, 640, 800);

        //this.bgLayer2 = this.add.tileSprite(0, game.config.height + 160, game.config.width, game.config.height, 'bg2').setOrigin(0, 1);
        this.bgLayer1 = this.add.tileSprite(0, game.config.height + 160, game.config.width, game.config.height, 'bg1').setOrigin(0, 1);

        this.bgLamps = this.add.tileSprite(0, game.config.height + 160, game.config.width, game.config.height, 'streetlamps').setOrigin(0, 1);
        this.bgRoad = this.add.tileSprite(0, game.config.height + 160, game.config.width, game.config.height, 'road').setOrigin(0, 1);

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - (borderUISize * 4), 'HAT PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize, 'Player 1: use A & D to move & W to launch', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Player 2: use ᐊ ᐅ arrows to move & ᐃ to launch', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Hold to launch higher!', menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = '#A080EC';
        menuConfig.color = '#A080EC';
        menuConfig.fontSize = '24px';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 4 + borderPadding * 2, 'Press W or ᐃ to begin...', menuConfig).setOrigin(0.5);

        // define keys
        keyUP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.drone = this.sound.add('drone', {volume: 0.5, loop: true});
        this.drone.play();

       /* this.cameras.main.once('camerafadeincomplete', function (camera) {
            camera.fadeOut(6000);
        }); */

        this.cameras.main.fadeIn(1500); 

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.drone.stop();
            this.scene.start('playScene');
        });
    }

    update() {
        this.bgRoad.tilePositionX  -= bgSpeed * 0.5;
        this.bgLamps.tilePositionX  -= bgSpeed * 0.4;
        this.bgLayer1.tilePositionX -= bgSpeed * 0.3;
        //this.bgLayer2.tilePositionX -= bgSpeed * 0.2;

        if (Phaser.Input.Keyboard.JustDown(keyUP1) || Phaser.Input.Keyboard.JustDown(keyUP2)) {
            // easy mode
            game.settings = {
                spaceshipMaxSpeed: 5,
                spaceshipAmount: 5,
                gameTimer: 60000,
                missTimer: 3000
            }
            this.sound.play('sfx_select');
            this.cameras.main.fadeOut(1000);
        }

        /*
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT1) || Phaser.Input.Keyboard.JustDown(keyRIGHT2)) {
            // hard mode
            game.settings = {
                spaceshipMaxSpeed: 10,
                spaceshipAmount: 5,
                gameTimer: 45000,
                missTimer: 5000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        } */
    }
}
