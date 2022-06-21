class Stage {
  constructor(origin, destination) {
    this.origin = origin;
    this.destination = destination;
    this.iterator = 0;
    this.dungeonIndex = null;
    this.onTraceback = false;
    this.openSet = [];
    this.closedSet = [];
    this.winnerPath = [];
    this.bestSet = [];
    this.distance = 0;
  }

  addOpenSet(path) {
    this.openSet.push(path);
  }

  removeFromOpenSet(node) {
    for (let i = 0; i < this.openSet.length; i++) {
      if (
        this.openSet[i].i == node.i &&
        this.openSet[i].j == node.j
      ) {
        this.openSet.splice(i, 1);
      }
    }
  }

  addClosedSet(path) {
    this.closedSet.push(path);
  }

  addWinnerPath(path) {
    this.winnerPath.push(path);
  }

  addBestSet(path) {
    this.distance += path.costOfSpot;
    this.bestSet.push(path);
  }

  updatePosition(i, j) {
    this.origin.i = i;
    this.origin.j = j;
  }
}
