export let player;
export let cursors;

export function createPlayer() {
    player = this.physics.add.sprite((window.innerWidth/2), (window.innerHeight*0.7), 'dude').setScale(1.5);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

}

export function updatePlayer(){
    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown){
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }else if (cursors.right.isDown){
        player.setVelocityX(160);

        player.anims.play('right', true);
    }else{
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}