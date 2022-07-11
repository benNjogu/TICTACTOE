function init(player, OPPONENT) {
  //select canvas
  const canvas = document.getElementById("cvs");
  const ctx = canvas.getContext("2d");

  //board variables
  let board = [];
  const COLUMN = 3;
  const ROW = 3;
  const SPACE_SIZE = 150;

  //store player's move
  let gameData = new Array(9);

  //by default man is the first player to play
  let currentPlayer = player.man;

  //win combinations
  const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //draw the board
  function drawBoard() {
    //we give every space a UID
    //so we know where to place each move on the gamedata array
    let id = 0;
    for (let i = 0; i < ROW; i++) {
      board[i] = [];
      for (let j = 0; j < COLUMN; j++) {
        board[i][j] = id;
        id++;

        //draw the spaces
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

    //get the id of the space the player clicked on
    let id = [i][j];

    //prevent the player to play the same space twice
    if (gameData[id]) return;

    //store the player's move to gamedata
    gameData[id] = currentPlayer;
    console.log(gameData);

    //check if player wins
    if (isWinner(gameData, currentPlayer)) {
      showGameOver(currentPlayer);

      GAME_OVER = true;
      return;
    }

    //check if its a tie
    if (isTie(gameData, currentPlayer)) {
      showGameOver("tie");
      GAME_OVER = true;
      return;
    }

    //give turn to the other player
    currentPlayer = currentPlayer == player.man ? player.friend : player.man;
  });

  //check for a winner
  function isWinner(gameData, player) {
    for (let i = 0; i < COMBOS.length; i++) {
      let won = true;
      for (let j = 0; j < COMBOS[i].length; j++) {
        let id = COMBOS[i][j];
        won = gameData[id] == player && won;
      }

      if (won) {
        return true;
      }
    }

    return false;
  }

  //check for a tie game
  function isTie(gameData) {
    let isBoardFill = true;
    for (let i = 0; i < gameData.length; i++) {
      isBoardFill = gameData[i] && isBoardFill;
    }
    if (isBoardFill) {
      return true;
    }

    return false;
  }
}
