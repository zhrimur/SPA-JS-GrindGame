
class Item {
  constructor(typeItem, positionXItem, positionYItem) {
    (this.typeItem = typeItem),
      (this.positionXItem = positionXItem),
      (this.positionYItem = positionYItem);
  }
  drawItem() {
    drawFrame(
      0,
      0,
      this.positionXItem,
      this.positionYItem,
      this.typeItem.image,
      32,
      32
    );
  }
  collect() {
    if (
      Math.abs(positionX + WIDTH / 2 - (this.positionXItem + 16 / 2)) < 32 &&
      Math.abs(positionY + HEIGHT / 2 - (this.positionYItem + 16 / 2)) < 32
    ) {
      this.typeItem.func();
      near = true;
    }
  }
}

class Enemy {
  constructor(
    typeEnemy,
    positionXEnemy,
    positionYEnemy,
    currentHealthEnemy,
    aliveStatusEnemy,
    hitStatusEnemy,
    currentDirectionEnemy
  ) {
    this.typeEnemy = typeEnemy;
    this.positionXEnemy = positionXEnemy;
    this.positionYEnemy = positionYEnemy;
    this.currentHealthEnemy = currentHealthEnemy;
    this.aliveStatusEnemy = aliveStatusEnemy;
    this.hitStatusEnemy = hitStatusEnemy;
    this.currentDirectionEnemy = currentDirectionEnemy;
  }

  moveEnemy() {
    if (
      Math.abs(positionX - this.positionXEnemy) >
      Math.abs(positionY - this.positionYEnemy)
    ) {
      if (positionX < this.positionXEnemy) {
        this.currentDirectionEnemy = FACING_LEFT;
      }
      if (positionX > this.positionXEnemy) {
        this.currentDirectionEnemy = FACING_RIGHT;
      }
    } else {
      if (positionY < this.positionYEnemy) {
        this.currentDirectionEnemy = FACING_UP;
      }
      if (positionY > this.positionYEnemy) {
        this.currentDirectionEnemy = FACING_DOWN;
      }
    }
    if (positionX < this.positionXEnemy) {
      this.positionXEnemy += -this.typeEnemy.speedEnemy;
    }
    if (positionX > this.positionXEnemy) {
      this.positionXEnemy += this.typeEnemy.speedEnemy;
    }
    if (positionY < this.positionYEnemy) {
      this.positionYEnemy += -this.typeEnemy.speedEnemy;
    }
    if (positionY > this.positionYEnemy) {
      this.positionYEnemy += this.typeEnemy.speedEnemy;
    }
  }
  drawEnemy() {
    drawFrame(
      CYCLE_LOOP[currentLoopIndex],
      this.currentDirectionEnemy,
      this.positionXEnemy,
      this.positionYEnemy,
      this.typeEnemy.image,
      this.typeEnemy.width,
      this.typeEnemy.height
    );
  }
  hitEnemy() {
    if (
      Math.abs(
        ball.x - ball.vx - (this.positionXEnemy + this.typeEnemy.width / 2)
      ) < this.typeEnemy.width &&
      Math.abs(
        ball.y - ball.vy - (this.positionYEnemy + this.typeEnemy.height / 2)
      ) < this.typeEnemy.height &&
      this.hitStatusEnemy === false
    ) {
      this.currentHealthEnemy -= ballDamage;
      this.hitStatusEnemy = true;
      switch (this.currentDirectionEnemy) {
        case FACING_LEFT:
          this.positionXEnemy += 20;
          break;
        case FACING_RIGHT:
          this.positionXEnemy -= 20;
          break;
        case FACING_UP:
          this.positionYEnemy += 20;
          break;
        case FACING_DOWN:
          this.positionYEnemy -= 20;
          break;
      }
      if (this.currentHealthEnemy <= 0) {
        this.aliveStatusEnemy = false;
      }
      setTimeout(() => {
        this.hitStatusEnemy = false;
      }, charCooldown);
      console.log(this.currentHealthEnemy);
    }
  }
  hitPlayer() {
    if (
      Math.abs(
        positionX + WIDTH / 2 - (this.positionXEnemy + this.typeEnemy.width / 2)
      ) +
        20 <
        64 &&
      Math.abs(
        positionY +
          HEIGHT / 2 -
          (this.positionYEnemy + this.typeEnemy.height / 2)
      ) +
        20 <
        64 &&
      hitStatusPlayer === false
    ) {
      charCurrentHealth -= this.typeEnemy.damageEnemy;
      if (charCurrentHealth <= 0) {
        gameOver();
      }
      hitStatusPlayer = true;
      hp.innerHTML = `Здоровье: ${charCurrentHealth}`;
      setTimeout(() => {
        hitStatusPlayer = false;
      }, 1000);
    }
  }
}

/*--------------нажатие клавиш-------------*/
window.addEventListener("keydown", function (event) {
  keyPresses[event.code] = true;
});
function keyDownListener(event) {
  keyPresses[event.code] = true;
}
window.addEventListener("keyup", function (event) {
  keyPresses[event.code] = false;
});

charSelector();

pause.addEventListener("click", (event) => pauseGame(event));
/*--------------нажатие клавиш-------------*/

/*--------------основная функция отрисовки-------------*/
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let hasMoved = false;

  window.addEventListener("keydown", function (event) {
    if (event.code == "KeyZ" && keyzPressed === false) {
      ball = {
        x: 0,
        y: 0,
        vx: 0,
        vy: ballSpeed,
        radius: 5,
        color: "orange",
        draw: function () {
          ctx.beginPath();
          ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fillStyle = ballColor;
          ctx.fill();
        },
      };
      ball.x = positionX + WIDTH / 2;
      ball.y = positionY + HEIGHT / 2;
      switch (facing) {
        case "up":
          ball.vx = 0;
          ball.vy = -ballSpeed;
          break;
        case "down":
          ball.vx = 0;
          ball.vy = ballSpeed;
          break;
        case "left":
          ball.vx = -ballSpeed;
          ball.vy = 0;
          break;
        case "right":
          ball.vx = ballSpeed;
          ball.vy = 0;
          break;

        default:
          ball.vx = 0;
          ball.vy = ballSpeed;
          break;
      }
      raf = window.requestAnimationFrame(draw);
      ball.draw();
      keyzPressed = true;
    }
  });

  if (keyPresses["KeyW"]) {
    moveCharacter(0, -movementSpeed, FACING_UP);
    hasMoved = true;
    facing = "up";
  } else if (keyPresses["KeyS"]) {
    moveCharacter(0, movementSpeed, FACING_DOWN);
    hasMoved = true;
    facing = "down";
  }

  if (keyPresses["KeyA"]) {
    moveCharacter(-movementSpeed, 0, FACING_LEFT);
    hasMoved = true;
    facing = "left";
  } else if (keyPresses["KeyD"]) {
    moveCharacter(movementSpeed, 0, FACING_RIGHT);
    hasMoved = true;
    facing = "right";
  }

  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  }
  if (!hasMoved) {
    currentLoopIndex = 0;
  }
  drawFrame(
    CYCLE_LOOP[currentLoopIndex],
    currentDirection,
    positionX,
    positionY,
    img,
    WIDTH,
    HEIGHT
  );
  funcEnemyMove();
  funcEnemyDraw();
  funcPlayerHit();
  funcItemDraw();
  funcCollect();
  if (game) {
    window.requestAnimationFrame(gameLoop);
  }
}
/*--------------основная функция отрисовки-------------*/
