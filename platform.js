export let platforms;

export function createPlatform(){
    platforms = this.physics.add.staticGroup();
    platforms.create(window.innerWidth/2, (window.innerHeight*0.96), 'ground').setScale(3.5, 2).refreshBody();
    
    platforms.create((window.innerWidth*0.9), (window.innerHeight*0.7), 'ground');
    platforms.create(window.innerWidth/2, (window.innerHeight*0.55), 'ground');
    platforms.create(120, (window.innerHeight*0.4), 'ground');
    platforms.create((window.innerWidth*0.9), (window.innerHeight*0.3), 'ground');
    platforms.create((window.innerWidth*0.55), (window.innerHeight*0.21), 'ground').setScale(.5, 1).refreshBody();
    platforms.create(0, (window.innerHeight*0.18), 'ground');
}