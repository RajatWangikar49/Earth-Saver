var engine, world;
var aliens, aliensImage;
var backgroundImage;
var soldier, aliensGroup;
var ammos = [];
var alienss = [];
var ghosts = [];
var hearts = [];
var touches = [];
var lasers = [];
var bulletImage;
var soldierImage;
var ghost, ghostImage;
var gameState = 0;
var border, score = 0;
var lives = 3;
var heart, heartImage, heartGroup;
var gunFire, backgroundMusic, gameOverMusic;
var laser, laserImage, laserGroup;
var gameOver1, gameOverImage;
var youWin, youWinImage;

function preload(){

  backgroundImage = loadImage("./images/Background.jpg");
  aliensImage = loadImage("./images/Alien.png");
  bulletImage = loadImage("./images/Bullet.png");
  soldierImage = loadImage("./images/Soldier.png");
  ghostImage = loadImage("./images/Ghost.png");
  heartImage = loadImage("./images/Heart.png");
  gunFire = loadSound("./assets/Gun Fire.mp3");
  backgroundMusic = loadSound("./assets/Background Music.mp3");
  laserImage = loadImage("./images/Laser.png");
  gameOverImage = loadImage("./images/Game Over.png");
  youWinImage = loadImage("./images/You Win.png");

}

function setup(){

  createCanvas(windowWidth, windowHeight);

  soldier = createSprite(width/2, 600, 20, 20);
  soldier.addImage(soldierImage);
  soldier.scale = 0.1;

  border = createSprite(width/2, 650, 1500, 20);
  border.visible = false;

  gameOver1 = createSprite(680, 550, 50, 50);
  gameOver1.addImage(gameOverImage);
  gameOver1.scale = 0.5;

  youWin = createSprite(670, 550, 50, 50);
  youWin.addImage(youWinImage);
  youWin.scale = 0.5

  backgroundMusic.play();
  
  aliensGroup = new Group();
  heartGroup = new Group();
  laserGroup = new Group();

  imageMode(CENTER);

}

function draw(){
  
  background(20);
  image(backgroundImage, width/2, height/2, width, height);
  
  fill("white");
  textSize(25);
  text("Score : " + score, 50, 50);

  fill("white");
  textSize(25);
  text("Lives : " + lives, 1190, 50);

  fill("white");
  textSize(25);
  text("| Tap to Shot |", 400, 50);

  fill("white");
  textSize(25);
  text("| Score 100 To Win |", 700, 50);

  if (gameState === 0){
    soldier.x = mouseX;
  
  spawnAliens();
  spawnGhost();
  spawnHeart();
  spawnLaser();

  gameOver1.visible = false;
  youWin.visible = false;

  if (touches.length>0){
    var ammo = createSprite(soldier.x, soldier.y-10, 10, 10);
    ammo.velocityY = -40;
    ammo.addImage(bulletImage);
    ammo.scale = 0.02;
    gunFire.play();
    ammos.push(ammo);
    touches = [];
  }

  for (var i = 0 ; i<ammos.length ; i++){
    for (var m = 0 ; m<lasers.length ; m++){
      if (ammos[i].isTouching(lasers[m])){
        score = score + 4;
        lasers[m].destroy();
        ammos[i].destroy();
        lasers.splice(m, 1);
        ammos.splice(i, 1);
      }
    }
  }

  for (var i = 0 ; i<ammos.length ; i++){
    for(var j = 0 ; j<alienss.length ; j++){
      if (ammos[i].isTouching(alienss[j])){
        score = score + 1;
        alienss[j].destroy();
        ammos[i].destroy();
        alienss.splice(j, 1);
        ammos.splice(i, 1);

        }
    }
  }

  for (var i = 0 ; i<ammos.length ; i++){
    for(var j = 0 ; j<ghosts.length ; j++){
      if (ammos[i].isTouching(ghosts[j])){
        score = score + 3;
        ghosts[j].destroy();
        ammos[i].destroy();
        ammos.splice(i, 1);
        ghosts.splice(j, 1);
        
      }
    }
  }

  for (var i = 0 ; i<ammos.length ; i++){
    for (var k = 0 ; k<hearts.length ; k++){
      if (ammos[i].isTouching(hearts[k])){
        lives = lives + 1;
        ammos[i].destroy();
        hearts[k].destroy();
        ammos.splice(i, 1);
        hearts.splice(k, 1);
      }
    }
  }

  for (var k = 0 ; k<alienss.length ; k++){
      if (alienss[k].isTouching(border)){
        lives = lives - 1;
        alienss[k].destroy();
        alienss.splice(k, 1);
        if (lives === 0){
          gameState = 1;
          console.log("game over");
      }
      }
    }
  }

  for (var k = 0 ; k<ghosts.length ; k++){
      if (ghosts[k].isTouching(border)){
        lives = lives - 1;
        ghosts[k].destroy();
        ghosts.splice(k, 1);
        if (lives === 0){
          gameState = 1;
          console.log("game over");
      }
      }
    }

    for (var i = 0 ; i<hearts.length ; i++){
      if (hearts[i].isTouching(border)){
        hearts[i].destroy();
        hearts.splice(i, 1);
        if (lives === 0){
          gameState = 1;
          console.log("game over");
        }
      }
    }

    for (var i = 0 ; i<lasers.length ; i++){
      if (lasers[i].isTouching(border)){
      lives = lives - 1;
      lasers[i].destroy();
      lasers.splice(i, 1);
      if (lives === 0){
        gameState = 1;
        console.log("game over");
      }
    }
  }

    if (score === 100){
      gameState = 2;
      gameWin();
    }

    if (score === 101){
      gameState = 2;
      gameWin();
    }

    if (score === 102){
      gameState = 2;
      gameWin();
    }

    if (score === 103){
      gameState = 2;
      gameWin();
    }

    if (score === 104){
      gameState = 2;
      gameWin();
    }

  if (gameState === 1){
    aliensGroup.destroyEach();
    heartGroup.destroyEach();
    backgroundMusic.stop();
    gameOver1.visible = true;
    gameOver();
  }

  if (gameState === 2){
    aliensGroup.destroyEach();
    heartGroup.destroyEach();
    backgroundMusic.stop();
    youWin.visible = true;
    gameWin();
  }

  drawSprites();
  
}

function spawnLaser(){

  if (frameCount % 150 === 0){
    var laser = createSprite(random(20, width/2), 0, 50, 50);
    laser.addImage(laserImage);
    laser.velocityY = 10;
    laser.scale = 0.3;
    lasers.push(laser);
    laserGroup.add(laser);
  }
}

function spawnHeart(){

  if (frameCount % 150 === 0){
    var heart = createSprite(random(20, width/2), 0, 50, 50);
    heart.addImage(heartImage);
    heart.velocityY = 4;
    heart.scale = 0.1;
    hearts.push(heart);
    heartGroup.add(heart);
  }
}

function spawnAliens(){

  if (frameCount % 50 === 0){
    var aliens = createSprite(random(20, width-20), 0, 50, 50);
    aliens.addImage(aliensImage);
    aliens.velocityY = 5;
    aliens.scale = 0.6;
    alienss.push(aliens);
    aliensGroup.add(aliens);
  }

}

function spawnGhost(){

  if (frameCount % 100 === 0){
    var ghost = createSprite(random(20, width-20), 0, 50, 50);
    ghost.addImage(ghostImage);
    ghost.velocityY = 10;
    ghost.scale = 0.4;
    ghosts.push(ghost);
    aliensGroup.add(ghost);
  }

}

function mouseClicked(){

  var ammo = createSprite(soldier.x, soldier.y-10, 10, 10);
  ammo.velocityY = -40;
  ammo.addImage(bulletImage);
  ammo.scale = 0.02;
  gunFire.play();
  ammos.push(ammo);

}

function gameOver(){

  swal({
    text :"Well Pllayed", title : "Game Over ! ",
    confirmButtonText : " Restart " 
  },
function (isConfirmed){
  if (isConfirmed){
    location.reload();
  }
}
  )
    
  }

function gameWin(){

  swal({
    text :"Hurrey ! , You won the game", title : "You Won",
    confirmButtonText : " Play Again "
  },
  function (isConfirmed){
    if (isConfirmed){
      location.reload();
    }
  }
  )
}