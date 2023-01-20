import { platforms, createPlatform } from './platform.js';
import { player, createPlayer, cursors, updatePlayer } from './player.js';
import { stars, createStar } from './stars.js';

let config = {
    type: Phaser.AUTO,
    width: innerWidth,
    height: innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y : 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config),
    score = 0,
    scoreText,
    bombs;

function preload (){
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create (){
    this.add.image(window.innerWidth/2, window.innerHeight/2, 'sky').setScale(1.8, 1.2);

    createPlatform.call(this);

    createPlayer.call(this);
    this.physics.add.collider(player, platforms);

    createStar.call(this);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    

    function collectStar (player, star){
        star.disableBody(true, true);
    
        score += 10;
        scoreText.setText('Score: ' + score);
    
        if (stars.countActive(true) === 0)
        {
            stars.children.iterate(function (child) {
    
                child.enableBody(true, child.x, 0, true, true);
    
            });
    
            let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    
            let bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    
        }
    }
    
    function hitBomb(player, bomb){
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;
    }

}

function update (){
    updatePlayer.call(this);
}




