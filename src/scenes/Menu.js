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
    }

    create() {
        // display score
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '64px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - (borderUISize * 2), 'HAT PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        this.add.text(game.config.width/2, game.config.height/2, 'Player 1: use A & D to move & W to launch', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize, 'Player 2: use ᐊ ᐅ arrows to move & ᐃ to launch', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2 + borderPadding, 'Hold to launch higher!', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#A080EC';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 3 + borderPadding * 2, 'Press W or ᐃ to begin...', menuConfig).setOrigin(0.5);

        // define keys
        keyUP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP1) || Phaser.Input.Keyboard.JustDown(keyUP2)) {
            // easy mode
            game.settings = {
                spaceshipMaxSpeed: 5,
                spaceshipAmount: 5,
                gameTimer: 60000,
                missTimer: 3000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        } /*
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
