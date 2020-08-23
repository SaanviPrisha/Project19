var monkey, MonkeyRunning;
var back_image, jungle;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var score = 0;
var y_position, edges;


function preload() {
  MonkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png", "Monkey_06.png","Monkey_07.png", "Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  back_image = loadImage("jungle.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}
function setup() {
  createCanvas(400, 400);

  jungle = createSprite(200, 200, 400, 400)
  jungle.addImage("back", back_image)
  jungle.scale = 2;
  jungle.velocityX = -6;
  
  monkey = createSprite(100, 300, 30, 30);
  monkey.addAnimation("Running", MonkeyRunning);
  monkey.scale = 0.2;
  
  bananaGroup = new Group()
  obstacleGroup = new Group();
}
function draw() {
  edges = createEdgeSprites();
  if(jungle.x < 0) {
    jungle.x = 400
     } 
  CreateFood();
  Obstacles();
  
  if(keyDown("space") && monkey.y >= 300) {
    monkey.velocityY = -10;
  }
  if(monkey.y <= 100) {
      monkey.velocityY = monkey.velocityY + 0.8;
  }
  if(monkey.y >= 320) {
    monkey.velocityY = monkey.velocityY - 0.8;
  }

  
  if(monkey.isTouching(bananaGroup)) {
    score = score + 2;
    bananaGroup.destroyEach();
  }
  if(monkey.isTouching(obstacleGroup)) {
    monkey.scale = 0.2;
    jungle.velocityX = 0;
    bananaGroup.velocityX = 0;
    obstacleGroup.velocityX = 0;
    score = 0;
  }
  switch(score) {
    case 10: monkey.scale = 0.25;
    break;
    case 20: monkey.scale = 0.30;
    break;
    case 30: monkey.scale = 0.35;
    break;
    case 40: monkey.scale = 0.4;
  }
  
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white")
  text("Score:" + score, 300, 100);
}
function CreateFood() {
  if (frameCount % 80 == 0) { 
    banana = createSprite(400, 200, 20, 20);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    
    banana.velocityX = -6;
    y_Position = Math.round(random(120, 200));
    banana.y = y_Position;
    
    banana.lifetime = 100;
    
    bananaGroup.add(banana);
  }
}
function Obstacles() {
  if (frameCount % 300 == 0) {
  obstacle = createSprite(400, 300, 30, 30);
  obstacle.addImage("rock",obstacleImage);
  obstacle.scale = 0.3;
    
  obstacle.velocityX = -6;
  obstacle.lifetime = 100;
    
  obstacleGroup.add(obstacle)
  }
}