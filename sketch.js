var PLAY = 1;
var END =0;
var START=2;
var gameState  = 2;
var ground,  groundImg;
var ship,  score,  stars,  star,  starG,  starImg;
var ship1,  ship1Img;
var ship2,  ship2Img;
var ship3,  ship3Img;
var ship4,  ship4Img;
var alien1,  alien1Img,  A1;
var alien2,  alien2Img,  A2;
var alien3,  alien3Img,  A3;
var alien4,  alien4Img,  A4;
var alien5,  alien5Img,  A5;
var gameover,  gameoverImg;
var restart,  restartImg;
var but,  butImg;
var tug,  tugImg;
var in1, in2,  fail;

stars = 0;
score = 0;

localStorage["HighestScore"] = 0;

function preload(){
  groundImg = loadImage("spaceback.png");
  
  ship1Img = loadImage("ship1.png");
  ship2Img = loadImage("ship2.png");
  ship3Img = loadImage("ship3.png");
  ship4Img = loadImage("ship4.png");
  
  alien1Img = loadImage("aliens1.png");
  alien2Img = loadImage("aliens2.png");
  alien3Img = loadImage("aliens3.png");
  alien4Img = loadImage("aliens4.png");
  alien5Img = loadImage("aliens5.png");

  starImg = loadImage("star.png");
  gameoverImg = loadImage("gameover2.png");
  restartImg = loadImage("restart2.png");
  butImg = loadImage("ninja.jpg");
  tugImg = loadImage("panda.png");
  
  fail = loadSound("Fail.mp3");
}

function setup() {
 createCanvas(400,600);
  
  ground = createSprite(400,500,100,100);
  ground.addImage("back",groundImg);
  ground.scale = 1.5;
  ground.y = ground.height/2;
  ground.velocityY = 4;
  
  ship = createSprite(300,550,50,50);
  ship.addImage("run",ship1Img);
  ship.scale = 0.05;
  
  gameover = createSprite(200,300,10,200);
  gameover.addImage("re",gameoverImg);
  gameover.scale = 0.15;
  
  restart = createSprite(200,550,40,40);
  restart.addImage("regame",restartImg);
  restart.scale = 0.1;
  
  but = createSprite(200,250,100,100);
  tug = createSprite(30,580,20,20);
  
  in1 = createSprite(8,300,5,600);
  
  in2 = createSprite(390,300,5,600);
  
  A1 = new Group();
  A2 = new Group();
  A3 = new Group();
  A4 = new Group();
  A5 = new Group();
  starG = new Group();
}

function draw() {
 background(225);
  
   if(gameState === START){
    background("black");  
    
    but.addImage("game",butImg);
    but.scale = 0.4;
    tug.addImage("logo",tugImg);
    tug.scale = 0.008;
    ship.visible = false;
    in1.visible = false;
    in2.visible = false;
    ground.visible = false;
    restart.visible = true;
    gameover.visible = false;
     if(mousePressedOver(restart)){
       gameState = 1;
     }
    textSize(48);
    fill("blue");
    textFont("Didot");
    text("SPACE TRAGEDY",10,450);
     
     
    textSize(10);
    fill("white");
    textFont("Cambria");
    text("HINT:Press 'right & left' to move...", 120,595);
    }
  else if(gameState === 1){
  
  ship.collide(in1);
  ship.collide(in2);
  but.visible = false;
  ship.visible = true; 
  ground.visible = true;
  
  if (ground.y > 600){
      ground.y = ground.height/2;
    }
  if(keyDown("right")){
     ship.x = ship.x +10;
     }
  if(keyDown("left")){
     ship.x = ship.x -10;
     }
  if(starG.isTouching(ship)){
     starG.destroyEach();
     stars = stars +1;
     }
  score = score + Math.round(getFrameRate()/60);
    
    
  in1.visible = false;
  in2.visible = false;
  gameover.visible = false;
  restart.visible = false;
  
  spawnAlien1();
  spawnAlien2();
  spawnAlien3();
  spawnAlien4();
  spawnAlien5();
  spawnStars();
    
    if(A1.isTouching(ship) ||
       A2.isTouching(ship) ||
       A3.isTouching(ship) ||
       A4.isTouching(ship) ||
       A5.isTouching(ship)) {
       
       gameState = 0;
       fail.play();
       }
    
  if(score === 100){
      
       ship.addImage("run",ship2Img);
      
       }
    if(score === 500){
      
       ship.addImage("run",ship3Img);
      
       }
    if(score === 2000){
      
       ship.addImage("run",ship4Img);
      
       }
  
  }
  
  else if(gameState === 0){
    
    gameover.visible = true;
    restart.visible = true;
    but.visible = false;
    
    A1.destroyEach();    
    A2.destroyEach();
    A3.destroyEach();
    A4.destroyEach();
    A5.destroyEach();
    starG.destroyEach();
    A1.setVelocityEach(0);
    A2.setVelocityEach(0);
    A3.setVelocityEach(0);
    A4.setVelocityEach(0);
    A5.setVelocityEach(0);
    starG.setVelocityEach(0);
    
    if(mousePressedOver(restart)){
    reset();
    }
          
  }
  drawSprites();
  
  textSize(20);
  fill("red");
  text("Score: "+ score,30,20);
  
  textSize(20);
  fill("red");
  text("Stars: "+ stars,300,20);
  
  textSize(18);
  fill("purple");
  text("High Score: "+ localStorage["HighestScore"],150,20);
}
function spawnAlien1(){
  if(frameCount % 200 === 0){
    alien1 = createSprite(200,50,50,50);
    alien1.addImage("enemy",alien1Img);
    alien1.scale = 0.12;
    alien1.x = Math.round(random(75,350));
    alien1.velocityY = (5+(score/100));
    alien1.lifetime = 120;
    A4.add(alien1);
     
     }
}
function spawnAlien2(){
  if(frameCount % 250 === 0){
    alien2 = createSprite(200,50,50,50);
    alien2.addImage("enemy",alien2Img);
    alien2.scale = 0.1;
    alien2.x = Math.round(random(75,350));
    alien2.velocityY = (5+(score/100));
    alien2.lifetime = 120;
    A2.add(alien2);
     
     }
}
function spawnAlien3(){
  if(frameCount % 300 === 0){
    alien3 = createSprite(200,50,50,50);
    alien3.addImage("enemy",alien3Img);
    alien3.scale = 0.1;
    alien3.x = Math.round(random(75,350));
    alien3.velocityY = (5+(score/100));
    alien3.lifetime = 120;
    A3.add(alien3);
     
     }
}
function spawnAlien4(){
  if(frameCount % 350 === 0){
    alien4 = createSprite(200,50,50,50);
    alien4.addImage("enemy",alien4Img);
    alien4.scale = 0.25;
    alien4.x = Math.round(random(75,350));
    alien4.velocityY = (5+(score/100));
    alien4.lifetime = 120;
    A4.add(alien4);
     
     }
}
function spawnStars(){
  if(frameCount % 97 === 0){
    star = createSprite(200,50,50,50);
    star.addImage("points",starImg);
    star.scale = 0.03;
    star.x = Math.round(random(75,350));
    star.velocityY = (5+(score/100));
    star.lifetime = 120;
    
    starG.add(star);
     
     }
}
function reset(){

  gameState = 1;
  ship.addImage("run",ship1Img);
  
  gameover.visible = false;
  restart.visible = false;
  
  
  if (ground.y < 0){
      ground.y = ground.height/2;
  }
  
  ground.velocityY = 4;
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  
  score = 0;
  stars = 0;
  
  
  
}
function spawnAlien5(){
  if(frameCount % 400 === 0){
    alien5 = createSprite(200,50,50,50);
    alien5.addImage("enemy",alien5Img);
    alien5.scale = 0.1;
    alien5.x = Math.round(random(75,350));
    alien5.velocityY = (5+(score/100));
    alien5.lifetime = 120;
    A5.add(alien5);
     
     }
}