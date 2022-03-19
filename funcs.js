/*---------------общие функции врага-----------------*/
function funcEnemyMove() {
  arrayEnemy.forEach((element) => {
    element.moveEnemy();
  });
}
function funcEnemyDraw() {
  arrayEnemy.forEach((element) => {
    element.drawEnemy();
  });
}
function funcEnemyHit() {
  arrayEnemy.forEach((element, index) => {
    element.hitEnemy();
    if (element.aliveStatusEnemy === false) {
      pointsCounter += element.typeEnemy.points;
      points.innerHTML = `Очки: ${pointsCounter}`;
      delete arrayEnemy[index];
      if (level >= 5 && pointsCounter >= x * y) {
        level++;
        y++;
        lvl.innerHTML = `Уровень: ${level}`;
        bonusInterval += 2000;
        charMaxHealth += 3;
        charCurrentHealth = charMaxHealth;
      } else {
        if (level === 0 && pointsCounter >= 5) {
          level = 1;
          console.log(charMaxHealth);
          lvl.innerHTML = `Уровень: ${level}`;
          enemies.push(typeBoar);
          charMaxHealth += 5;
          charCurrentHealth = charMaxHealth;
          ballDamage++;
          enemiesInterval -= 1000;
          bonusInterval += 2000;
        } else {
          if (level === 1 && pointsCounter >= 15) {
            level = 2;
            lvl.innerHTML = `Уровень: ${level}`;
            enemies.push(typeMushroom);
            charMaxHealth += 5;
            charCurrentHealth = charMaxHealth;
            enemiesInterval -= 2000;
            bonusInterval += 3000;
          } else {
            if (level === 2 && pointsCounter >= 50) {
              level = 3;
              lvl.innerHTML = `Уровень: ${level}`;
              enemies.push(typeBarrel);
              charMaxHealth += 5;
              charCurrentHealth = charMaxHealth;
              ballDamage++;
              enemiesInterval -= 1000;
              bonusInterval += 3000;
            } else {
              if (level === 3 && pointsCounter >= 100) {
                level = 4;
                lvl.innerHTML = `Уровень: ${level}`;
                enemies.push(typeArmor);
                charMaxHealth += 10;
                charCurrentHealth = charMaxHealth;
                enemiesInterval -= 1000;
                bonusInterval += 3000;
              } else {
                if (level === 4 && pointsCounter >= 200) {
                  level = 5;
                  lvl.innerHTML = `Уровень: ${level}`;
                  enemies.push(typeGrass);
                  charMaxHealth += 10;
                  charCurrentHealth = charMaxHealth;
                  ballDamage++;
                  enemiesInterval = 5000;
                  bonusInterval = 25000;
                }
              }
            }
          }
        }
      }
      hp.innerHTML = `Здоровье: ${charCurrentHealth}`;
    }
  });
}
function funcPlayerHit() {
  arrayEnemy.forEach((element) => {
    element.hitPlayer();
  });
}
/*---------------общие функции врага-----------------*/

/*---------------создание врага-----------------*/
function enemyCreate() {
  if (game) {
    generateRandomPosition();
    type = enemies[Math.floor(Math.random() * enemies.length)];
    arrayEnemy.push(
      new Enemy(
        type,
        randomPosX,
        randomPosY,
        type.maxHealth,
        true,
        false,
        FACING_DOWN
      )
    );
  }
}
/*---------------создание врага-----------------*/

/*---------------общие функции бонусов-----------------*/
function funcItemDraw() {
  arrayItems.forEach((element) => {
    element.drawItem();
  });
}
function funcCollect() {
  arrayItems.forEach((element, index) => {
    element.collect();
    if (near) {
      delete arrayItems[index];
      near = false;
    }
  });
}
function itemCreate() {
  if (game) {
    type = items[Math.floor(Math.random() * items.length)];
    generateRandomPosition();
    arrayItems.push(new Item(type, randomPosX, randomPosY));
    if (arrayItems.length > 5) {
      arrayItems.shift();
    }
  }
}

let healFunc = function () {
  if (charCurrentHealth <= charMaxHealth - 5) {
    charCurrentHealth += 5;
  } else {
    charCurrentHealth = charMaxHealth;
  }
  hp.innerHTML = `Здоровье: ${charCurrentHealth}`;
};

let speedFunc = function () {
  if (speedStatus === false) {
    movementSpeed = movementSpeed + 2;
    setTimeout(() => {
      movementSpeed = movementSpeed - 2;
      speedStatus = false;
    }, 10000);
  }
};
function damageFunc() {
  if (damageStatus === false) {
    ballDamage = ballDamage * 2;
    setTimeout(() => {
      ballDamage = ballDamage / 2;
      damageStatus = false;
    }, 10000);
  }
}
/*---------------общие функции бонусов-----------------*/

/*---------------генерация положения врага/бонуса-----------------*/
function generateRandomPosition() {
  randomPosX = Math.random() * canvas.width + 0;
  randomPosY = Math.random() * canvas.height + 0;
  while (Math.abs(positionX + positionY - (randomPosX + randomPosY)) < 150) {
    randomPosX = Math.random() * canvas.width + 0;
    randomPosY = Math.random() * canvas.height + 0;
  }
}
/*---------------генерация положения врага/бонуса-----------------*/

/*---------------выбор класса-----------------*/
function charSelector() {
  charForm.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target.tagName === "BUTTON") {
      switch (event.target) {
        case butChar1:
          img.src = "img/fighter.png";
          ballSpeed = 7;
          ballMovementMax = 5;
          ballColor = "grey";
          ballRadius = 4;
          charMaxHealth = 50;
          ballDamage = 5;
          charCooldown = 2000;
          movementSpeed = 3;
          break;
        case butChar2:
          img.src = "img/ranger.png";
          ballSpeed = 15;
          ballMovementMax = 20;
          ballColor = "orange";
          ballRadius = 3;
          charMaxHealth = 15;
          ballDamage = 3;
          charCooldown = 1000;
          movementSpeed = 5;
          break;
        case butChar3:
          img.src = "img/mage.png";
          ballSpeed = 5;
          ballMovementMax = 20;
          ballColor = "purple";
          ballRadius = 10;
          charMaxHealth = 20;
          ballDamage = 7;
          charCooldown = 4000;
          movementSpeed = 4;
          break;
        default:
          img.src = "img/fighter.png";
      }
      charCurrentHealth = charMaxHealth;
      hp.innerText = `Здоровье: ${charCurrentHealth}`;
      enemyCreate();
      setInterval(enemyCreate, enemiesInterval);
      itemCreate();
      setInterval(itemCreate, bonusInterval);
      charForm.style.display = "none";
      loadImage();
    }
  });
}
/*---------------выбор класса-----------------*/

/*---------------перемещение персонажа-----------------*/
function moveCharacter(deltaX, deltaY, direction) {
  if (positionX + deltaX > 0 && positionX + WIDTH + deltaX < canvas.width) {
    positionX += deltaX;
  }
  if (positionY + deltaY > 0 && positionY + HEIGHT + deltaY < canvas.height) {
    positionY += deltaY;
  }

  currentDirection = direction;
}
/*---------------перемещение персонажа-----------------*/

/*---------------отрисовка шара-----------------*/
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(
    CYCLE_LOOP[currentLoopIndex],
    currentDirection,
    positionX,
    positionY,
    img,
    WIDTH,
    HEIGHT
  );
  funcEnemyDraw();
  funcItemDraw();
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  if (ballMovementCounter < ballMovementMax) {
    funcEnemyHit();
    raf = window.requestAnimationFrame(draw);
    ballMovementCounter++;
  } else {
    ballMovementCounter = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(
      CYCLE_LOOP[currentLoopIndex],
      currentDirection,
      positionX,
      positionY,
      img,
      WIDTH,
      HEIGHT
    );
    funcEnemyDraw();
    funcItemDraw();
    keyzPressed = false;
  }
}
/*---------------отрисовка шара-----------------*/

/*---------------отрисовка кадров-----------------*/
function drawFrame(frameX, frameY, canvasX, canvasY, img, width, height) {
  ctx.drawImage(
    img,
    frameX * width,
    frameY * height,
    width,
    height,
    canvasX,
    canvasY,
    width,
    height
  );
}
/*---------------отрисовка кадров-----------------*/

/*---------------пауза-----------------*/
function pauseGame(event) {
  if (charCurrentHealth > 0) {
    event.preventDefault();
    if (game) {
      game = false;
    } else {
      game = true;
      window.requestAnimationFrame(gameLoop);
    }
  }
}
/*---------------пауза-----------------*/

/*---------------окончание игры-----------------*/
function gameOver() {
  gameOverForm.style.display = "block";
  game = false;
  pause.innerHTML = "Новая игра";
  results.innerText = `Игра окончена \n 
  Счет: ${pointsCounter}`;
}
/*---------------окончание игры-----------------*/

/*---------------загрузка изображения-----------------*/
function loadImage() {
  img.onload = function () {
    window.requestAnimationFrame(gameLoop);
  };
}
/*---------------загрузка изображения-----------------*/

/*---------------нажатие клавиш-----------------*/
function keyDownListener(event) {
  keyPresses[event.code] = true;
}
/*---------------нажатие клавиш-----------------*/
