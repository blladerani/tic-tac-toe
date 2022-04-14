const Game = (() => {
  turn = ["x", "o"][Math.floor(Math.random() * 2)];

  const getTurn = () => {
    return turn;
  };

  const changeTurn = () => {
    if (turn == "x") {
      turn = "o";
      return;
    }
    turn = "x";
  };

  const checkWin = () => {
    //Horizontal lines
    const board = Board.getBoard();
    for (let i = 0; i < 3; i++) {
      if (board[i].every((v) => v == board[i][0])) {
        if (board[i][0]) return board[i][0];
      }
    }
    //Vertical lines
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] == board[1][i] &&
        board[0][i] == board[2][i] &&
        board[1][i] == board[2][i]
      ) {
        if (board[0][i]) return board[0][i];
      }
    }
    //Diagonal Lines
    if (
      board[0][2] == board[1][1] &&
      board[0][2] == board[2][0] &&
      board[1][1] == board[2][0]
    ) {
      return board[0][2];
    }
    if (
      board[0][0] == board[1][1] &&
      board[0][0] == board[2][2] &&
      board[1][1] == board[2][2]
    ) {
      return board[0][0];
    }
    return "";
  };

  const isFilled = () => {
    let a = true;
    Board.getBoard().forEach((e) => {
      e.forEach((cell) => {
        if (!cell) a = false;
      });
    });
    return a;
  };

  const playRound = () => {
    if (checkWin()) over(checkWin());
    changeTurn();
    if (isFilled()) over();
  };

  const over = (winner) => {
    if (winner) {
      displayController.finishScreen(winner);
    } else {
      displayController.finishScreen();
    }
    Board.initBoard();
  };

  return {
    getTurn,
    playRound,
  };
})();

const Board = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => {
    return board;
  };
  const initBoard = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  const addMark = (mark, x, y) => {
    board[y][x] = mark;
  };

  const handleClick = (e) => {
    const x = e.target.getAttribute("data-x");
    const y = e.target.getAttribute("data-y");
    if (board[y][x] == "") {
      addMark(Game.getTurn(), x, y);
      displayController.renderBoard();
      Game.playRound();
    }
  };

  let cells = document.querySelectorAll(".cell");
  cells.forEach((elem) => {
    elem.addEventListener("click", handleClick);
  });

  return {
    getBoard,
    addMark,
    initBoard,
  };
})();

const displayController = (() => {
  const resetVisuals = () => {
    document.querySelector(".gameover-screen").style.display = "none";
    const cells = document.querySelectorAll(".cell");
    cells.forEach((e) => {
      e.textContent = "";
    });
  };

  document
    .querySelector(".restart-button")
    .addEventListener("click", resetVisuals);

  const renderBoard = () => {
    Board.getBoard().forEach((e, y) => {
      e.forEach((cell, x) => {
        if (cell != "") {
          drawCell(cell, x, y);
        }
      });
    });
  };

  const drawCell = (mark, x, y) => {
    const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    cell.textContent = mark;
  };

  const finishScreen = (winner) => {
    const gameoverScreen = document.querySelector(".gameover-screen");
    const gameoverText = document.querySelector(".gameover-text");

    gameoverScreen.style.display = "grid";
    gameoverText.textContent = winner ? `${winner} won!` : "Draw!";
  };

  return {
    renderBoard,
    finishScreen,
    resetVisuals,
  };
})();
