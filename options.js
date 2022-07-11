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

  switchActive(oBtn, xBtn);
});

oBtn.addEventListener("click", function () {
  player.man = "O";
  player.computer = "X";
  player.friend = "X";

  switchActive(xBtn, oBtn);
});

play.addEventListener("click", function () {
  //check if user chose an opponent or not
  if (!OPPONENT) {
    computerBtn.style.backgroundColor = "#f00";
    friendBtn.style.backgroundColor = "#f00";

    return;
  }

  //check if user chose a symbol
  if (!player.man) {
    xBtn.style.backgroundColor = "#f00";
    oBtn.style.backgroundColor = "#f00";

    return;
  }

  init(player, OPPONENT);
  options.classList.add("hide");
});

//switch active class between two elements
function switchActive(off, on) {
  off.classList.remove("active");
  on.classList.add("active");
}
