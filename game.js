function init(player, OPPONENT) {
  //select canvas
  const canvas = document.getElementById("cvs");
  const ctx = canvas.getContext("2d");

  //board variables
  let board = [];
  const COLUMN = 3;
  const ROW = 3;
  const SPACE_SIZE = 150;

  //draw the board
  function drawBoard() {
    for (let i = 0; i < ROW; i++) {
      board[i] = [];
      for (let j = 0; j < COLUMN; j++) {
        ctx.strokeStyle = "#000";
        ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE);
      }
    }
  }

  drawBoard();

  //on player's click
  canvas.addEventListener("click", function (event) {
    //x and y position of mouse click relative to our canvas
    let X = event.clientX - canvas.getBoundingClientRect().x;
    let Y = event.clientY - canvas.getBoundingClientRect().y;

    //we calculate i and j of the clicked space
    let i = Math.floor(Y / SPACE_SIZE);
    let j = Math.floor(X / SPACE_SIZE);
  });
}
