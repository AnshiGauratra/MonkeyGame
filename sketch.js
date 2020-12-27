var over,overImage;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup
var restart,restartImage

var ground,groundImage;
var invisibleGround;
var fruit,obstacle;
var score=0;
var END = 0;
var PLAY =1;
var gameState = PLAY;
function preload(){
  
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png",
              "sprite_2.png","sprite_3.png",
              "sprite_4.png","sprite_5.png",                                     "sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.jpg");
  overImage = loadImage("over.jpg");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(400,400);
  bananaGroup = createGroup();
  obstacleGroup =  createGroup();

  ground = createSprite(130,360);
  ground.addImage(groundImage);

  ground.scale = 1.5;

  over = createSprite(200,150);
  over.addImage(overImage);
  over.visible = false;
  over.scale = 0.6;
  
  restart = createSprite(200,275);
  restart.addImage(restartImage);
  restart.visible = false;
  restart.scale=0.5;
  
  monkey = createSprite(70,310);
  monkey.addAnimation("run",monkey_running);
  monkey.scale= 0.13;
  console.log(monkey.y)

  invisibleGround = createSprite(200,360,400,20);
  invisibleGround. visible = false;  
}


function draw() {
  background("white");
  
    
  
  if(gameState===PLAY){
    fruits();
    obstacles();
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score+1;
    }
    ground.velocityX = -2;

    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
    
    if(ground.x<0){
      ground.x = 200;         
    }
    
    monkey.velocityY = monkey.velocityY+3;
    
    if(keyDown("space")&&monkey.y>160) {
      monkey.velocityY = -12;
    }
 }
  if(gameState === END){
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0); 
    ground.velocityX = 0;
    monkey.velocityY = 0;  
    monkey.visible = false;
    fruit.visible = false;
    obstacle.visible = false;
    over.visible = true;
    restart .visible = true;
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  bananaGroup.depth= monkey.depth;
  monkey.depth = monkey.depth+1;
  monkey.collide(invisibleGround);
  
  fill("black");
  textSize(20);
  text("Score: "+score,160,50);

  drawSprites();
}

function obstacles(){
  if(World.frameCount%300===0){
    obstacle= createSprite(400,312,20,20);
    obstacle.addImage(obstacleImage);
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.2;
    obstacle.velocityX=-3;
    obstacleGroup.setLifetimeEach = 20;
    obstacle.setCollider("circle",0,0,200);
 }
}

function fruits(){  
  if(World.frameCount%60===0){
    fruit= createSprite(400,200,20,20);
    fruit.y = Math.round(random(100,220));
    fruit.addImage("fruit",bananaImage);
    fruit.scale = 0.1;
    fruit.velocityX=- 5;
    bananaGroup.add(fruit);
    bananaGroup.setLifetimeEach = 200;
  }
}
function reset(){
  score = 0;
  gameState = PLAY;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  restart.visible = false;
  over.visible = false;
  monkey.visible=true;
}