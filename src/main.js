// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 640,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 2;
let starSpeed = 2;

//reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT;