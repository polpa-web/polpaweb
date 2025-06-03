const board = document.getElementById("game-board");
const scoreDisplay = document.querySelector("#score span");

const width = 8;
const squares = [];
let score = 0;

const octoImages = [
  "🟣", "🟠", "🔵", "🟡", "🟢", "🔴"
];

function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("draggable", true);
    square.setAttribute("id", i);
    square.classList.add("square");
    let randomOcto = octoImages[Math.floor(Math.random() * octoImages.length)];
    square.textContent = randomOcto;
    board.appendChild(square);
    squares.push(square);
  }
}

function dragAndDropSetup() {
  let colorBeingDragged;
  let squareIdBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingReplaced;

  squares.forEach(square => {
    square.addEventListener("dragstart", dragStart);
    square.addEventListener("dragover", e => e.preventDefault());
    square.addEventListener("drop", dragDrop);
    square.addEventListener("dragend", dragEnd);
  });

  function dragStart() {
    colorBeingDragged = this.textContent;
    squareIdBeingDragged = parseInt(this.id);
  }

  function dragDrop() {
    colorBeingReplaced = this.textContent;
    squareIdBeingReplaced = parseInt(this.id);
    squares[squareIdBeingDragged].textContent = colorBeingReplaced;
    squares[squareIdBeingReplaced].textContent = colorBeingDragged;
  }

  function dragEnd() {
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width
    ];

    if (!validMoves.includes(squareIdBeingReplaced)) {
      squares[squareIdBeingDragged].textContent = colorBeingDragged;
      squares[squareIdBeingReplaced].textContent = colorBeingReplaced;
    } else {
      checkForMatches();
    }
  }
}

function checkForMatches() {
  for (let i = 0; i < width * width; i++) {
    let rowOfThree = [i, i + 1, i + 2];
    let chosenEmoji = squares[i].textContent;

    if (
      rowOfThree.every(
        index => squares[index] && squares[index].textContent === chosenEmoji
      )
    ) {
      rowOfThree.forEach(index => squares[index].textContent = "💥");
      score += 3;
      scoreDisplay.textContent = score;
    }
  }

  for (let i = 0; i < width * (width - 2); i++) {
    let columnOfThree = [i, i + width, i + width * 2];
    let chosenEmoji = squares[i].textContent;

    if (
      columnOfThree.every(
        index => squares[index] && squares[index].textContent === chosenEmoji
      )
    ) {
      columnOfThree.forEach(index => squares[index].textContent = "💥");
      score += 3;
      scoreDisplay.textContent = score;
    }
  }
}

createBoard();
dragAndDropSetup();
