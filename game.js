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

  //load X and O images
  const xImage = new Image();
  xImage.src = "img/X.png";

  const oImage = new Image();
  oImage.src = "img/O.png";

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

  //for game over check
  let GAME_OVER = false;

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
    //if its a game over, exit
    if (GAME_OVER) return;

    //x and y position of mouse click relative to our canvas
    let X = event.clientX - canvas.getBoundingClientRect().x;
    let Y = event.clientY - canvas.getBoundingClientRect().y;

    //we calculate i and j of the clicked space
    let i = Math.floor(Y / SPACE_SIZE);
    let j = Math.floor(X / SPACE_SIZE);

    //get the id of the space the player clicked on
    let id = board[i][j];

    //prevent the player to play the same space twice
    if (gameData[id]) return;

    //store the player's move to gamedata
    gameData[id] = currentPlayer;
    console.log(gameData);

    //draw the move on the board
    drawOnBoard(currentPlayer, i, j);

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

    if (OPPONENT == "computer") {
      //get the id of the space using the minimax algorithm
      let id = minimax(gameData, player.computer.id).id;

      //store the player's move to gamedata
      gameData[id] = player.computer;
      // console.log(gameData);

      //get i and j of the space
      let space = getIJ(id);

      //draw the move on the board
      drawOnBoard(player.computer, space.i, space.j);

      //check if player wins
      if (isWinner(gameData, player.computer)) {
        showGameOver(player.computer);

        GAME_OVER = true;
        return;
      }
    } else {
      //give turn to the other player
      currentPlayer = currentPlayer == player.man ? player.friend : player.man;
    }
  });

  //minimax
  function minimax(gameData, PLAYER) {
    //base
    if (isWinner(gameData, player.computer)) return { evaluation: +10 };
    if (isWinner(gameData, player.man)) return { evaluation: -10 };
    if (isTie(gameData)) return { evaluation: 0 };

    //look for empty spaces
    let EMPTY_SPACES = getEmptySpaces(gameData);

    //save all moves and their evaluation
    let moves = [];

    //loop over the empty spaces to evaluate them
    for (let i = 0; i < EMPTY_SPACES.length; i++) {
      //get the id of the empty space
      let id = EMPTY_SPACES[i];

      //back up the space
      let backup = gameData[i];

      //make the move for the player
      gameData[id] = PLAYER;

      //save the move's id and evaluation
      let move = {};
      move.id = id;
      //the move evaluation
      if (PLAYER == player.computer) {
        move.evaluation = minimax(gameData, player.man).evaluation;
      } else {
        move.evaluation = minimax(gameData, player.computer).evaluation;
      }

      //restore space
      gameData[id] = backup;

      //save move to move array
      moves.push(move);
    }
  }

  //get empty spaces function
  function getEmptySpaces(gameData) {
    let EMPTY = [];
    for (let id = 0; id < gameData.length; id++) {
      if (!gameData[id]) EMPTY.push(id);
    }

    return EMPTY;
  }

  //get i and j of a space
  function getIJ(id) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == id) return { i: i, j: j };
      }
    }
  }

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

  //show game over
  function showGameOver(player) {
    let message = player == "tie" ? "Oops No Winner" : "The Winner is";
    let imgSrc = `img/${player}.png`;

    gameOverElement.innerHTML = `
        <h1>${message}</h1>
        <img class = "winner-img" src="${imgSrc}"</img>
        <div class="play" onclick="location.reload()">play Again!</div>
    `;

    gameOverElement.classList.remove("hide");
  }

  //draw on board
  function drawOnBoard(player, i, j) {
    let img = player == "X" ? xImage : oImage;

    //the x,y position of the image are the x,y positions of the clicked space
    ctx.drawImage(img, j * SPACE_SIZE, i * SPACE_SIZE);
  }
}
