const board = document.getElementById("game-board");
const scoreDisplay = document.querySelector("#score-board span");
const restartButton = document.getElementById("restart-polpicrush");

const width = 8;
const squares = [];
let score = 0;

const octoImages = ["🐙", "🐚", "🪼", "🦑", "🐡", "🦀"];

// Crea la board
function createBoard() {
  board.innerHTML = ""; // reset board
  squares.length = 0;
  score = 0;
  scoreDisplay.textContent = score;

  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("draggable", true);
    square.setAttribute("id", i);
    square.classList.add("polpicrush-tile");

    const randomEmoji = getRandomEmoji();
    square.textContent = randomEmoji;
    board.appendChild(square);
    squares.push(square);
  }

  dragAndDropSetup();
}

function getRandomEmoji() {
  return octoImages[Math.floor(Math.random() * octoImages.length)];
}

// Drag and Drop
function dragAndDropSetup() {
  let emojiDragged, idDragged, emojiReplaced, idReplaced;

  squares.forEach(square => {
    square.addEventListener("dragstart", function () {
      emojiDragged = this.textContent;
      idDragged = parseInt(this.id);
    });

    square.addEventListener("dragover", e => e.preventDefault());

    square.addEventListener("drop", function () {
      emojiReplaced = this.textContent;
      idReplaced = parseInt(this.id);
      squares[idDragged].textContent = emojiReplaced;
      this.textContent = emojiDragged;
    });

    square.addEventListener("dragend", function () {
      const validMoves = [
        idDragged - 1,
        idDragged + 1,
        idDragged - width,
        idDragged + width,
      ];

      if (!validMoves.includes(idReplaced)) {
        // se mossa illegale, ripristina
        squares[idDragged].textContent = emojiDragged;
        squares[idReplaced].textContent = emojiReplaced;
        return;
      }

      checkBoard();
    });
  });
}

// Verifica match
function checkBoard() {
  checkRowMatch();
  checkColumnMatch();
  setTimeout(() => {
    moveDown();
  }, 200);
}

function checkRowMatch() {
  for (let i = 0; i < width * width; i++) {
    const rowEnd = i % width;
    if (rowEnd > width - 3) continue; // evita overflow

    const match = [i, i + 1, i + 2];
    const emoji = squares[i].textContent;

    if (match.every(index => squares[index].textContent === emoji && emoji !== "💥")) {
      match.forEach(index => squares[index].textContent = "💥");
      score += 3;
      scoreDisplay.textContent = score;
    }
  }
}

function checkColumnMatch() {
  for (let i = 0; i < width * (width - 2); i++) {
    const match = [i, i + width, i + width * 2];
    const emoji = squares[i].textContent;

    if (match.every(index => squares[index].textContent === emoji && emoji !== "💥")) {
      match.forEach(index => squares[index].textContent = "💥");
      score += 3;
      scoreDisplay.textContent = score;
    }
  }
}

// Fa "cadere" i polpi e riempie la board
function moveDown() {
  for (let i = width * width - 1; i >= 0; i--) {
    if (squares[i].textContent === "💥") {
      if (i - width >= 0) {
        squares[i].textContent = squares[i - width].textContent;
        squares[i - width].textContent = "💥";
      } else {
        squares[i].textContent = getRandomEmoji();
      }
    }
  }

  setTimeout(() => {
    checkBoard(); // ricontrolla in caso di match a cascata
  }, 100);
}

// Reset gioco
restartButton.addEventListener("click", createBoard);

// Avvio
createBoard();

