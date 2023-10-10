//purposely bad code so students can fix it - can make it worse

import "./style.css";

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");
const scoreText = document.getElementById("scoreText");

let score = 0;
let isJumping: boolean = false;
let gameOver: boolean = true;

SetText("click to start!");
document.addEventListener("mousedown", () => jump());
document.addEventListener("keydown", () => jump());

setInterval(() => {
  update_score();
}, 10);

function update_score() {
  if (gameOver == true) {
    return;
  }
  score = score + 1;
  SetText("Score: " + score);
  CheckGameOver();
}

function jump() {
  if (gameOver == false && isJumping == false) {
    isJumping = true;
    dino?.classList.add("jump");
    setTimeout(RemoveJump, 500);
  } else if (gameOver == true) {
    StartGame();
  }
}

function RemoveJump() {
  dino?.classList.remove("jump");
  isJumping = false;
}

function RemoveObstacles() {
  cactus?.classList.remove("cactusMove");
  bird?.classList.remove("birdMove");
}

function get_position_property(obj: HTMLElement | null, property_name: string) {
  if (obj != null) {
    return parseInt(
      window.getComputedStyle(obj).getPropertyValue(property_name)
    );
  }
}

function CheckGameOver() {
  if (gameOver == true) {
    return;
  }
  //get is dinosaur jumping
  let dinoTop = get_position_property(dino, "top") as number;

  //get cactus position
  let cactusleft = get_position_property(cactus, "left") as number;

  //get bird position
  let birdleft = get_position_property(bird, "left") as number;

  //detect cactus collision
  if (dinoTop >= 150 && Math.abs(cactusleft) < 7) {
    //end game
    end_game();
  }

  //detect bird collision
  if (dinoTop <= 55 && Math.abs(birdleft) < 11) {
    //end game
    end_game();
  }
}

function end_game() {
  //end game
  SetText("Final Score: " + score + "! Click To Play Again!");
  gameOver = true;

  //reset player
  RemoveJump();

  //reset cactus
  RemoveObstacles();
}

function StartGame() {
  gameOver = false;
  score = 0;
  cactus?.classList.add("cactusMove");
  bird?.classList.add("birdMove");
}

function SetText(s: string) {
  if (scoreText) {
    scoreText.textContent = s;
  }
}