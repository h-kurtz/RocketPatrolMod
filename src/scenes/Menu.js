class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('sfx_select', './assets/sfx_select.wav');
        this.load.audio('sfx_explosion', './assets/sfx_explosion.wav');
        this.load.audio('sfx_rocket', './assets/sfx_rocket.wav');
    }

    create() {
        // display score
        let menuConfig = {
            fontFamily: 'Courier',
            fontSizse: '28px',
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ᐊ ᐅ arrows to move & ᐃ to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ᐊ for Novice or ᐅ for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT1) || Phaser.Input.Keyboard.JustDown(keyLEFT2)) {
            // easy mode
            game.settings = {
                spaceshipMaxSpeed: 5,
                spaceshipAmount: 7,
                gameTimer: 60000,
                missTimer: 3000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
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
        }
    }
}
