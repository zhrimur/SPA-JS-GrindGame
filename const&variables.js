/*---------------константы-----------------*/
const WIDTH = 48;
const HEIGHT = 64;
const BOAR = 64;
const CYCLE_LOOP = [1, 0, 1, 2];
const FACING_DOWN = 2;
const FACING_UP = 0;
const FACING_LEFT = 3;
const FACING_RIGHT = 1;
const FRAME_LIMIT = 12;
/*---------------константы-----------------*/

/*---------------html-----------------*/
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let charForm = document.getElementById("charForm");
let gameOverForm = document.getElementById("gameOver");
let butChar1 = document.getElementById("butChar1");
let butChar2 = document.getElementById("butChar2");
let butChar3 = document.getElementById("butChar3");

let results = document.getElementById("results");
let points = document.querySelector(".points");
let hp = document.querySelector(".hp");
let lvl = document.querySelector(".lvl");

let pause = document.querySelector(".pause");
/*---------------html-----------------*/

/*---------------элементы игры-----------------*/
let keyPresses = {};
let currentDirection = FACING_DOWN;
let currentDirectionBoar = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;

let charCooldown = 5000;
let charMaxHealth = 50;

let level = 0;
let pointsCounter = 0;
let charCurrentHealth;

let bonusInterval = 10000;
let enemiesInterval = 15000;
let arrayEnemy = [];
let arrayItems = [];

let hitStatusPlayer = false;
let hasMoved = false;
let speedStatus = false;
let damageStatus = false;
let game = true;

let randomPosX, randomPosY;
let type;
let near;

let x = 200;
let y = 2;
/*---------------элементы игры-----------------*/

/*---------------изображения-----------------*/
let img = new Image();
let imgHealth = new Image();
let imgSpeed = new Image();
let imgDamage = new Image();
let imgFlower = new Image();
let imgBoar = new Image();
let imgMushroom = new Image();
let imgBarrel = new Image();
let imgArmor = new Image();
let imgGrass = new Image();

imgHealth.src = "img/health.png";
imgSpeed.src = "img/speed.png";
imgDamage.src = "img/damage.png";
imgFlower.src = "img/flower.png";
imgBoar.src = "img/boar.png";
imgMushroom.src = "img/mushroom.png";
imgBarrel.src = "img/barrel.png";
imgArmor.src = "img/armor.png";
imgGrass.src = "img/grass.png";
/*---------------изображения-----------------*/

/*---------------параметры шара-----------------*/
let raf;
let ballMovementCounter = 0;
let ball;
let keyzPressed = false;
let ballMovementMax = 4;
let ballDamage = 5;
let ballSpeed = 7;
let ballColor = "grey";
let ballRadius = 4;
let ballVX = 0;
let ballVY = ballSpeed;
let facing = "down";
/*---------------параметры шара-----------------*/

/*---------------параметры врагов-----------------*/
let typeFlower = {
  maxHealth: 15,
  damageEnemy: 2,
  speedEnemy: 2,
  height: 64,
  width: 48,
  image: imgFlower,
  points: 1,
};
let typeBoar = {
  maxHealth: 20,
  damageEnemy: 3,
  speedEnemy: 1.5,
  height: 64,
  width: 64,
  image: imgBoar,
  points: 2,
};
let typeMushroom = {
  maxHealth: 20,
  damageEnemy: 4,
  speedEnemy: 1.75,
  height: 64,
  width: 48,
  image: imgMushroom,
  points: 4,
};
let typeBarrel = {
  maxHealth: 30,
  damageEnemy: 5,
  speedEnemy: 1.5,
  height: 64,
  width: 64,
  image: imgBarrel,
  points: 5,
};
let typeArmor = {
  maxHealth: 50,
  damageEnemy: 5,
  speedEnemy: 1.25,
  height: 64,
  width: 64,
  image: imgArmor,
  points: 7,
};
let typeGrass = {
  maxHealth: 40,
  damageEnemy: 7,
  speedEnemy: 3,
  height: 64,
  width: 48,
  image: imgGrass,
  points: 10,
};
/*---------------параметры врагов-----------------*/

/*---------------параметры бонусов-----------------*/
let typeHealth = {
  image: imgHealth,
  func: healFunc,
};
let typeSpeed = {
  image: imgSpeed,
  func: speedFunc,
};
let typeDamage = {
  image: imgDamage,
  func: damageFunc,
};
/*---------------параметры бонусов-----------------*/

let items = [typeHealth, typeSpeed, typeDamage];
let enemies = [typeFlower];
