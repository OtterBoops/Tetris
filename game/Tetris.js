const ROW = 20;
const COL = 10;
const SQ = 20;
const VAC = "white";

const cvs = document.getElementById("tetris");
const ctx = cvs.getContext('2d');

let board = [];

function createBoard() {
  for (var r = 0; r < ROW; r++){
    board[r] = [];

    for (var c = 0; c < COL; c++) {
      board[r][c] = VAC;
    }
  }
}

function drawBoard() {
  for (var r = 0; r < ROW; r++){
    for (var c = 0; c < COL; c++) {
      drawSquare(c, r, VAC);
    }
  }
}

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x*SQ, y*SQ, SQ, SQ);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

drawBoard();

const PIECE = [
  [Z, "grey"],
  [S, "grey"],
  [J, "grey"],
  [L, "grey"],
  [I, "grey"],
  [T, "grey"],
  [O, "grey"]
];
var usedPieces = [];
var availablePieces = [0, 1, 2, 3, 4, 5, 6];
arrShuffle(availablePieces);

function arrShuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function randomPiece(){
  if (availablePieces.length == 0) {
    availablePieces = [...usedPieces];
    arrShuffle(availablePieces);
    usedPieces = [];
  }

  console.log(availablePieces);
  var r = availablePieces[0];
  usedPieces.push(r);
  availablePieces.shift();

  return new Piece(PIECE[r][0],PIECE[r][1]);
}

let p = randomPiece();

function Piece(shape, color) {
  this.shape = shape;
  this.color = color;
  this.shapeN = 0;
  this.active = this.shape[this.shapeN];

  this.x = 3;
  this.y = 0;
}

Piece.prototype.fill = function (color) {
  for (var r = 0; r < this.active.length; r++){
    for (var c = 0; c < this.active.length; c++) {
      if(this.active[r][c]) {
        drawSquare(this.x+c, this.y+r, color);
      }
    }
  }
}

Piece.prototype.draw = function () {
  this.fill(this.color);
}

Piece.prototype.undraw = function () {
  this.fill(VAC);
}

Piece.prototype.moveLeft = function () {
  this.undraw();
  this.x--;
  this.draw();
}

Piece.prototype.moveRight = function () {
  this.undraw();
  this.x++;
  this.draw();
}

Piece.prototype.debugNewPiece = function () {
  p.undraw();
  p = randomPiece();
  p.draw();
}

p.draw();

document.addEventListener("keydown", CONTROL);
function CONTROL(event){
    if(event.keyCode == 37) {
        p.moveLeft();
    }else if(event.keyCode == 39) {
        p.moveRight();
    }else if(event.keyCode == 67) {
        p.debugNewPiece();
    }
}
