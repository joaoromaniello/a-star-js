class Spot {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.costOfSpot = matrixOfCost[i][j];
    this.neighbQT = 0;
    this.neighb = [];
    this.parent = [];
  }

  addCost(costMatrix) {
    this.costOfSpot = costMatrix[this.i][this.j];
  }

  addNeighb = function (matrix) {
    if (this.i < 41) {
      this.neighb.push(matrix[this.i + 1][this.j]);
      this.neighbQT = this.neighbQT + 1;
    }

    if (this.i > 0) {
      this.neighb.push(matrix[this.i - 1][this.j]);
      this.neighbQT = this.neighbQT + 1;
    }

    if (this.j < 41) {
      this.neighb.push(matrix[this.i][this.j + 1]);
      this.neighbQT = this.neighbQT + 1;
    }

    if (this.j > 0) {
      this.neighb.push(matrix[this.i][this.j - 1]);
      this.neighbQT = this.neighbQT + 1;
    }
  };
}

class Spot2 {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbQT = 0;
    this.neighb = [];
    this.parent = [];
  }

  addNeighb = function (matrix) {
    if (this.i < 27) {
      if (matrix[this.i + 1][this.j].g < 100) {
        this.neighb.push(matrix[this.i + 1][this.j]);
        this.neighbQT = this.neighbQT + 1;
      }
    }

    if (this.i > 0) {
      if (matrix[this.i - 1][this.j].g < 100) {
        this.neighb.push(matrix[this.i - 1][this.j]);
        this.neighbQT = this.neighbQT + 1;
      }
    }

    if (this.j < 27) {
      if (matrix[this.i][this.j + 1].g < 100) {
        this.neighb.push(matrix[this.i][this.j + 1]);
        this.neighbQT = this.neighbQT + 1;
      }
    }

    if (this.j > 0) {
      if (matrix[this.i][this.j - 1].g < 100) {
        this.neighb.push(matrix[this.i][this.j - 1]);
        this.neighbQT = this.neighbQT + 1;
      }
    }
  };
}
