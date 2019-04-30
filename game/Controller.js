let t = new Tetris();

t.createBoard();
t.drawBoard();
t.draw();






document.addEventListener("keydown", CONTROL);
function CONTROL(event){
  if(event.keyCode == 37) {
    t.moveLeft();
  }else if(event.keyCode == 38) {
    t.moveUp();
  }else if(event.keyCode == 39) {
    t.moveRight();
  }else if(event.keyCode == 40){
    t.moveDown();
  }else if(event.keyCode == 67) {
    t.newPiece();
  }else if(event.keyCode == 76){
    t.log();
  }else if(event.keyCode == 81) {
    t.rotateLeft();
  }else if(event.keyCode == 69) {
    t.rotateRight();
  }
}
