// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 640,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 20;
let borderPadding = 8;
let bgSpeed = 2;

// reserve player 1 and 2 keyboard bindings
let keyR, keyUP1, keyLEFT1, keyRIGHT1, keyUP2, keyLEFT2, keyRIGHT2;