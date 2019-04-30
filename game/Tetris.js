const SQ = 20;
const ROW = 20;
const COL = 10;
const VAC = "white";

const cvs = document.getElementById("tetris");
const ctx = cvs.getContext('2d');


class Tetris {
  constructor() {
    this.board = [];
    this.usedPieces = [];
    this.availablePieces = [0, 1, 2, 3, 4, 5, 6];
    this.shape = null;
  }

  createBoard() {
    for (var r = 0; r < ROW; r++){
      this.board[r] = [];

      for (var c = 0; c < COL; c++) {
        this.board[r][c] = VAC;
      }
    }
    this.shape = this.randomPiece();
  }

  drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ, y*SQ, SQ, SQ);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
  }

  drawBoard() {
    for (var r = 0; r < ROW; r++){
      for (var c = 0; c < COL; c++) {
        this.drawSquare(c, r, VAC);
      }
    }
  }

  arrShuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  randomPiece(){
    if(this.availablePieces.length == 0) {
      this.availablePieces = [...this.usedPieces];
      this.arrShuffle(this.availablePieces);
      this.usedPieces = [];
    }

    var r = this.availablePieces[0];
    this.usedPieces.push(r);
    this.availablePieces.shift();
    this.shape = new Shape(shapes[r], "grey");
    return this.shape;
  }

  fill(color) {
    for (var r = 0; r < this.shape.length; r++){
      for (var c = 0; c < this.shape.length; c++) {
        if(this.shape.shape[r][c]) {
          this.drawSquare(this.shape.x+c, this.shape.y+r, color);
        }
      }
    }
  }

  draw() {
    this.fill(this.shape.color);
  }

  unDraw () {
    this.fill(VAC);
  }

  newPiece() {
    this.unDraw();
    this.randomPiece();
    this.draw();
  }

  moveLeft() {
    if(!this.shape.collision(-1, 0, this.shape)){
      this.unDraw();
      this.shape.x --;
      this.draw();
    }
  }

  moveRight() {
    if(!this.shape.collision(1, 0, this.shape)){
      this.unDraw();
      this.shape.x ++;
      this.draw();
    }
  }

  moveUp() {
    this.unDraw();
    this.shape.y --;
    this.draw();
  }

  moveDown() {
    this.unDraw();
    this.shape.y ++;
    this.draw();
  }

  rotateRight() {
    this.unDraw();
    this.shape.rotateRight();
    this.draw();
  }

  rotateLeft() {
    this.unDraw();
    this.shape.rotateLeft();
    this.draw();
  }

  log() {
    console.log(this.shape);
    console.log(this.usedPieces);
    console.log(this.availablePieces);
  }

  // collision(x, y, shape) {
  //   for(let r = 0; r < shape.length; r++){
  //     for(let c = 0; c < shape.length; c++){
  //       let newX = shape.x + c + x;
  //       let newY = shape.y + r + y;
  //
  //       if (newX < 0 || newX >= COL || newY >= ROW){
  //         console.log("Collision!");
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }


}
