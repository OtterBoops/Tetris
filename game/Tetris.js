const ROW = 20;
const COL = 10;
const SQ = 20;
const VAC = "white"

const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

let board = []

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

let p = new Piece(PIECE[0][0], PIECE[0][1]);

function Piece(shape, color) {
  this.shape = shape;
  this.color = color;
  this.shapeN = 0;
  this.active = this.shape[this.shapeN];

  this.x = 0;
  this.y = 0;
}

Piece.prototype.draw = function () {
  for (var r = 0; r < this.active.length; r++){
    for (var c = 0; c < this.active.length; c++) {
      if(this.active[r][c]) {
        drawSquare(this.x+c, this.y+r, this.color);
      }
    }
  }
}

p.draw();
