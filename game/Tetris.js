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
  if(!this.collision(-1, 0, this.active)){
    this.undraw();
    this.x--;
    this.draw();
  }
}

Piece.prototype.moveRight = function () {
  if(!this.collision(1, 0, this.active)){
    this.undraw();
    this.x++;
    this.draw();
  }
}

Piece.prototype.moveDown = function () {
  this.undraw();
  this.y++;
  this.draw();
}

Piece.prototype.moveUp = function () {
  this.undraw();
  this.y--;
  this.draw();
}

Piece.prototype.collision = function(x,y,piece){
    for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            if(!piece[r][c]){
                continue;
            }

            let newX = this.x + c + x;
            let newY = this.y + r + y;

            if(newX < 0 || newX >= COL || newY >= ROW){
                return true;
            }
        }
    }
    return false;
}

Piece.prototype.rotateRight = function () {
  var nextPattern = this.shape[(this.shapeN + 1) % this.shape.length];
  console.log("Rrot " + this.shapeN + " " + this.nextPattern);
  this.undraw();
  this.shapeN = (this.shapeN + 1) % this.shape.length;
  this.active = this.shape[this.shapeN];
  this.draw();

}

Piece.prototype.rotateLeft = function() {
  var prevPattern = (this.shapeN == 0) ? this.shape[this.shape.length] : this.shape[(this.shapeN - 1) % this.shape.length];
  console.log("Lrot " + this.shapeN + " " + this.prevPattern);

  this.undraw();
  this.shapeN = (this.shapeN == 0) ? this.shape.length : (this.shapeN - 1) % this.shape.length;
  this.active = this.shape[this.shapeN];
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
    }else if(event.keyCode == 38) {
      p.moveUp();
    }else if(event.keyCode == 39) {
      p.moveRight();
    }else if(event.keyCode == 40){
      p.moveDown();
    }else if(event.keyCode == 67) {
      p.debugNewPiece();
    }else if(event.keyCode == 81) {
      p.rotateLeft();
    }else if(event.keyCode == 69) {
      p.rotateRight();
    }
}
