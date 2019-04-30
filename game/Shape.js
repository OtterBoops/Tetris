let shapes = [
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ]
];

class Shape {
  constructor(shapeMatrix, color){
    this.shape = shapeMatrix;
    this.color = color;
    this.length = shapeMatrix.length;

    this.x = 3;
    this.y = 0;
  }

  rotateRight() {
    let matrix = this.shape;
    matrix.reverse();
    for (let y = 0; y < matrix.length; y++) {
      for (let x = y + 1; x < matrix[y].length; x++) {
        [matrix[y][x], matrix[x][y]] = [matrix[x][y], matrix[y][x]];
      }
    }
    this.shape = matrix;
    return this.shape
  }

  rotateLeft() {
    let matrix = this.shape;
    for (let y = 0; y < matrix.length; y++) {
      for (let x = y + 1; x < matrix[y].length; x++) {
        [matrix[y][x], matrix[x][y]] = [matrix[x][y], matrix[y][x]];
      }
    }
    matrix.reverse();
    this.shape = matrix;
    return this.shape
  }

  collision(x, y, shape) {
    for(let r = 0; r < shape.length; r++){
      for(let c = 0; c < shape.length; c++){
        let newX = shape.x + c + x;
        let newY = shape.y + r + y;

        if (newX < 0 || newX >= COL || newY >= ROW){
          console.log("Collision!");
          return true;
        }
      }
    }
    return false;
  }
}
