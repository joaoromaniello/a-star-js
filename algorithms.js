let homeMultiplier = 30;
let dungeonMultiplier = 30;

let firstTime = true;

function searchAlgorithmStepByStep(path) {
  if (path.stages.length == 0) {
    path.stages.push(
      new Stage(path.current.position, path.current.destination)
    );
    firstTime = false;
  }

  let stage = path.currentStage();
  if (path.current.finished()) {
    firstStage = false;

    if (isOnTraceback) {
      stage.onTraceback = true;
      path.paused = true;
      path.end = true;

      traceBack(stage);
      updateCanvas(stage);
      isOnTraceback = false;
    } else {
      isOnTraceback = true;
      path.paused = false;
      path.end = false;
      goToNextStage(path);
    }
  }

  if (!path.end) {
    runningForCurrentStage(path);
  }
}

function traceBack(stage) {
  let parentNode = stage.winnerPath[stage.winnerPath.length - 1];
  stage.addBestSet(parentNode);
  while (parentNode.parent) {
    parentNode = parentNode.parent;
    stage.addBestSet(parentNode);
  }
}

function runningForCurrentStage(path) {
  let stage = path.currentStage();
  if (path.current.finished()) {
    path.finished = true;
    return;
  }

  let currentNode;
  let objectiveNode;

  if (stage.dungeonIndex != null) {
    currentNode = getEnterNodeByDungeonIndex(stage.dungeonIndex);
    objectiveNode = getExitNodeByDungeonIndex(stage.dungeonIndex);
  } else {
    currentNode = getNodeByIndex(path.current.step);
    objectiveNode = getNodeByIndex(path.current.nextStep);
  }

  let start = currentNode;
  for (i = 0; i < stage.openSet.length; i++) {
    fill(0, 128, 128);
    rect(start.i * 15 + DUNGEON_OFFSET_X, start.j * 15 + DUNGEON_OFFSET_Y, 15);
  }

  start.h = calcHeuristicaByNode(
    start,
    objectiveNode,
    stage.dungeonIndex != null
  );
  start.g = stage.dungeonIndex != null ? 10 : start.costOfSpot;
  start.f = start.h + start.g;

  if (stage.dungeonIndex == null) {
    start.parent = null;
  }

  if (stage.iterator == 0) {
    stage.addOpenSet(start);
  }

  let indexOfBest = 0;
  for (i = 0; i < stage.openSet.length; i++) {
    if (stage.openSet[i].f < stage.openSet[indexOfBest].f) {
      indexOfBest = i;
    }
  }

  currentNode = stage.openSet[indexOfBest];

  stage.addClosedSet(currentNode);
  stage.removeFromOpenSet(currentNode);

  if (!isInSet(stage.winnerPath, currentNode)) {
    stage.addWinnerPath(currentNode);
  }

  stage.updatePosition(currentNode.j, currentNode.i);

  path.current.position.i = currentNode.j;
  path.current.position.j = currentNode.i;

  let neighbs = currentNode.neighb;
  for (var i = 0; i < neighbs.length; i++) {
    var neighb = neighbs[i];
    if (neighb.g >= 10000) {
      continue;
    }

    if (!inArray(stage.openSet, neighb) && !inArray(stage.closedSet, neighb)) {
      neighb.h = calcHeuristicaByNode(
        neighb,
        objectiveNode,
        stage.dungeonIndex != null
      );
      neighb.g =
        currentNode.g + (stage.dungeonIndex != null ? 10 : neighb.costOfSpot);
      neighb.f = neighb.g + neighb.h;
      neighb.parent = currentNode;
      stage.addOpenSet(neighb);
    } else if (inArray(stage.openSet, neighb) && neighb.g < currentNode.g) {
      neighb.h = calcHeuristicaByNode(
        neighb,
        objectiveNode,
        stage.dungeonIndex != null
      );
      neighb.g =
        currentNode.g + (stage.dungeonIndex != null ? 10 : neighb.costOfSpot);
      neighb.f = neighb.g + neighb.h;
      neighb.parent = currentNode;
    }
  }

  stage.iterator++;
  updateCanvas(stage);
}

function getNodeByIndex(step) {
  if (step == 0) {
    return matrix_with_spots[32][5];
  } else if (step == 1) {
    return matrix_with_spots[17][39];
  } else if (step == 2) {
    return matrix_with_spots[1][24];
  } else if (step == 3) {
    return matrix_with_spots[27][24];
  } else if (step == 4) {
    return matrix_with_spots[5][6];
  }
}

function getEnterNodeByDungeonIndex(index) {
  if (index == 0) {
    return dungeonWSpots1[DUNGEON_1_INSIDE.ENTER.i][DUNGEON_1_INSIDE.ENTER.j];
  } else if (index == 1) {
    return dungeonWSpots2[DUNGEON_2_INSIDE.ENTER.i][DUNGEON_2_INSIDE.ENTER.j];
  } else if (index == 2) {
    return dungeonWSpots3[DUNGEON_3_INSIDE.ENTER.i][DUNGEON_3_INSIDE.ENTER.j];
  }
}

function getExitNodeByDungeonIndex(index) {
  if (index == 0) {
    return dungeonWSpots1[DUNGEON_1_INSIDE.EXIT.i][DUNGEON_1_INSIDE.EXIT.j];
  } else if (index == 1) {
    return dungeonWSpots2[DUNGEON_2_INSIDE.EXIT.i][DUNGEON_2_INSIDE.EXIT.j];
  } else if (index == 2) {
    return dungeonWSpots3[DUNGEON_3_INSIDE.EXIT.i][DUNGEON_3_INSIDE.EXIT.j];
  }
}

function inArray(arr, elm) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].i == elm.i && arr[i].j == elm.j) {
      return true;
    }
  }
  return false;
}

function calcHeuristicaByNode(node1, node2, onDungeon) {
  return (
    (!!onDungeon ? dungeonMultiplier : homeMultiplier) *
    heuristica(node1, node2)
  );
}

function isSameSpot(node1, node2) {
  return node1.i == node2.i && node1.j == node2.j;
}

function isInSet(obj1, obj2) {
  for (var k = 0; k < obj1.length; k++) {
    if (obj1[k].i == obj2.i && obj1[k].j == obj2.j) {
      return true;
    }
  }

  return false;
}

function goToNextStage(path) {
  if (path.steps.length == 1) {
    path.finished = true;
    return;
  }

  stageCount++;
  logger("Indo para o próximo estágio!");
  logger("#" + stageCount, path.currentStage());

  setNextStage(path);
  let nextStage = new Stage(path.current.position, path.current.destination);
  nextStage.dungeonIndex = path.current.dungeonIndex;
  path.stages.push(nextStage);
}

function setNextStage(path) {
  let stage = path.currentStage();
  let current = path.steps[0];
  let destination = path.steps[1];

  if (stage.willEntryInDungeon && stage.dungeonIndex == null) {
    path.current.dungeonIndex = current;
    path.current.step = null;
    path.current.nextStep = null;

    let dungeonPos = getDungeonPosByIndex(current);
    path.current.position = dungeonPos.ENTER;
    path.current.destination = dungeonPos.EXIT;
  } else {
    path.current.dungeonIndex = stage.willEntryInDungeon ? current : null;
    path.current.step = current;
    path.current.nextStep = destination;
    path.current.position = getPosByIndex(current);
    path.current.destination = getPosByIndex(destination);

    path.steps = path.steps.slice(1);
  }
}

function getTotalG(winnerPath) {
  let custo = 0;
  for (let i = 0; i < winnerPath.length; i++) {
    custo = custo + winnerPath[i].costOfSpot;
  }

  return custo;
}

function getTotalH(winnerPath) {
  let custo = 0;
  for (let i = 0; i < winnerPath.length; i++) custo = winnerPath[i].h;

  return custo;
}

function getTotalF(winnerPath) {
  return getTotalG(winnerPath) + getTotalH(winnerPath);
}
