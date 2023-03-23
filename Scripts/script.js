let playerState = 'run'
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH  = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = './images/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;


//Sets animation speed:
let gameFrame = 0;
const staggerAnimation = 4; // higher number = slow speed

//Shifting different animations
const spriteAnimation = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'fly',
        frames: 7,
    },
    {
        name: 'dive',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    },

];

animationStates.forEach((state, index)=>{
    let frames = {
        loc: []
    }
    for(let j=0; j<state.frames; j++){
        let positionX = j*spriteWidth;
        let positionY = index*spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimation[state.name] = frames;
});
console.log(spriteAnimation);



function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Cycling the images on x-axis & setting animation speed:
    let position = Math.floor(gameFrame / staggerAnimation);
    position = position % spriteAnimation[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimation[playerState].loc[position].y;

    //Drawing the sprite image:
    ctx.drawImage(playerImage, 
        frameX, frameY, spriteWidth, spriteHeight, 
        0, 0, spriteWidth, spriteHeight);
    
    gameFrame++;
    
    requestAnimationFrame(animate);
};

animate();

