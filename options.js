//select elements
const options = document.querySelector(".options");
const gameOverElement = document.querySelector(".gameover");

//select buttons
const computerBtn = options.querySelector(".computer");
const friendBtn = options.querySelector(".friend");
const xBtn = options.querySelector(".x");
const oBtn = options.querySelector(".o");
const play = options.querySelector(".play");

//some variables to store users options
let OPPONENT;
const player = new Object;

//add an eventlistener to each button
computerBtn.addEventListener("click", function () {
  OPPONENT = "computer";
  switchActive(friendBtn, computerBtn);
});

friendBtn.addEventListener("click", function () {
  OPPONENT = "friend";
  switchActive(computerBtn, friendBtn);
});

xBtn.addEventListener("click", function () {
  player.man = "X";
  player.computer = "O";
  player.friend = "O";
});

oBtn.addEventListener("click", function () {
  player.man = "O";
  player.computer = "X";
  player.friend = "X";
});

play.addEventListener("click", function () {});

//switch active class between two elements
function switchActive(off, on) {
  off.classList.remove("active");
  on.classList.add("active");
}
