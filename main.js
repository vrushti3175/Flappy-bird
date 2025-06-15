let config = {
    type: Phaser.AUTO,
    scale: {
       
        width: innerWidth-20,
        height: innerHeight -20,
    },
    backgroundColor: '#049cd8',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 100,
            },
        }
    },
    scene: { preload, create, update, }
};


var PipeUpClass = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: function PipeUpClass (scene){
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'pipeUp');          
    }
});

var PipeDownClass = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize: function PipeDownClass (scene){
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'pipeDown');          
    }
});


let game = new Phaser.Game(config);

function preload() {
    this.load.image("pipeUp", "assets/pipeUp.png");
    this.load.image("pipeDown", "assets/pipeDown.png");
    this.load.spritesheet('bird', "assets/birdsprite.png",{
        frameWidth: 81, frameHight: 81
    });
}

function create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.pipeUp = this.physics.add.group({
        classType: PipeUpClass,
        runChildUpdate: true,
        allowGravity: false
    })
    this.pipeDown = this.physics.add.group({
        classType: PipeDownClass,
        runChildUpdate: true,
        allowGravity: false
    })   
    this.bird = this.physics.add.sprite(100,game.config.height/2,'bird',0);
    this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('bird',{
            start: 0, end: 3
        }),
        frameRate: 15, 
        repeat : -1
    })

    this.physics.add.collider(this.bird, this.pipeDown,birdDie);
    this.physics.add.collider(this.bird, this.pipeUp,birdDie);
}
var posX = 1000;
function update(time) {
    if(time%9 == 0){
        if(time%6 == 0){
            this.pipeU = this.pipeUp.get().setActive(true).setVisible(true).setPosition(posX+100,10).setScale(2,2);
            this.pipeD = this.pipeDown.get().setActive(true).setVisible(true).setPosition(posX+100,game.config.height).setScale(2,2); 
        }else{
            this.pipeU = this.pipeUp.get().setActive(true).setVisible(true).setPosition(posX+100,40).setScale(2,2);
            this.pipeD = this.pipeDown.get().setActive(true).setVisible(true).setPosition(posX+100,game.config.height+40).setScale(2,2);
        }
        
        this.pipeUp.setVelocityX(-200)
        this.pipeDown.setVelocityX(-200)
        posX += 100
    }
    if (this.cursors.up.isDown) {
        this.bird.setVelocityY(-100)
    }else{
        this.bird.setVelocityY(200)
    }
    this.bird.anims.play('fly', true);
}

    function birdDie(b,p) {
        
        this.add.text(280, 250, 'game over', {
          font: '32px Arial',
          fill: '#ff0000'
        });
    
        this.scene.pause();
    }
