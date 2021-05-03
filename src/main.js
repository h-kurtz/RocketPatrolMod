/*
Harrison Kurtz
1685929
Hat Patrol
April 19, 2021
10hrs

SCORE BREAKDOWN:
Simultaneous two-player gameplay:               30pts
Display remaining time:                         10pts
Randomize enemy movement direction:             5 pts
Redid all the in-game assets for a new theme:   60pts
Implement parallax scrolling:                   10pts
Wrote and implemented simple background music:  5pts
Create and implement a new weapon:              20pts
    * I implemented acceleration for the 
      player, gravity for the hat/rocket
      and seperated the hat/rocket and
      player into two different prefabs.
    * Player can "catch" the hat/rocket to
      get it back instantly, or miss and have
      to wait a short amount of time.
Total:                                          140pts
*/

// game configuration
let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 800,
    scene: [ Menu, Play ],
    autoCenter: true,
}
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 20;
let borderPadding = 8;
let bgSpeed = 2;

// reserve player 1 and 2 keyboard bindings
let keyR, keyUP1, keyLEFT1, keyRIGHT1, keyUP2, keyLEFT2, keyRIGHT2, keySPACE;