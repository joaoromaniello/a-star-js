function getPosByIndex(index) {
  if (index == 0) {
    return DUNGEON_1;
  } else if (index == 1) {
    return DUNGEON_2;
  } else if (index == 2) {
    return DUNGEON_3;
  } else if (index == 3) {
    return LINK_POS;
  } else if (index == 4) {
    return HOME_POS;
  }
}

function getDungeonPosByIndex(index) {
  if (index == 0) {
    return DUNGEON_1_INSIDE;
  } else if (index == 1) {
    return DUNGEON_2_INSIDE;
  } else if (index == 2) {
    return DUNGEON_3_INSIDE;
  }
}

function mountFirstStage() {
  currentStage.position = getPosByIndex(PATH.linkStartPos);
  currentStage.destination = getPosByIndex(PATH.steps[0]);

  if (PATH.linkStartPos != 3 && PATH.willEntryInDungeon) {
    currentStage.dungeonIndex = PATH.linkStartPos;
  }
}

function debug(...msg) {
  if (VERBOSE) {
    console.log(">", ...msg);
  }
}

function logger(...msg) {
  console.log(">", ...msg);
}

function getDungeon(dungeon, dungeonType) {
  let dungeonColorArrayAxis1 = [];
  let dungeonColorArrayAxis2 = [];
  let dungeonColorArrayAxis3 = [];

  let x = 20;
  let y = 20;
  strokeWeight(1);
  image(dungeon, 0, 0, 560, 560);

  for (let i = 0; i < 28; i++) {
    if (dungeonType == 1) dungeonColorArrayAxis1 = [];
    if (dungeonType == 2) dungeonColorArrayAxis2 = [];
    if (dungeonType == 3) dungeonColorArrayAxis3 = [];
    for (let j = 0; j < 28; j++) {
      c = get(x / 2, y / 2);
      if (dungeonType == 1) {
        dungeonColorArrayAxis1.push(identifyDungeonColor(c));
      }
      if (dungeonType == 2) {
        dungeonColorArrayAxis2.push(identifyDungeonColor(c));
      }
      if (dungeonType == 3)
        dungeonColorArrayAxis3.push(identifyDungeonColor(c));
      point(x / 2, y / 2);
      x += 2 * 20;
    }
    if (dungeonType == 1) dungeonMatrix1.push(dungeonColorArrayAxis1);
    if (dungeonType == 2) dungeonMatrix2.push(dungeonColorArrayAxis2);
    if (dungeonType == 3) dungeonMatrix3.push(dungeonColorArrayAxis3);
    x = 20;
    y += 2 * 20;
  }
}

function identifyDungeonColor(color_rgb_value) {
  if (
    color_rgb_value[0] > 181 &&
    color_rgb_value[0] < 186 &&
    color_rgb_value[1] > 181 &&
    color_rgb_value[1] < 186 &&
    color_rgb_value[2] > 181 &&
    color_rgb_value[2] < 186
  ) {
    return "parede";
  }
  if (
    color_rgb_value[0] > 223 &&
    color_rgb_value[0] < 227 &&
    color_rgb_value[1] > 223 &&
    color_rgb_value[1] < 227 &&
    color_rgb_value[2] > 223 &&
    color_rgb_value[2] < 227
  ) {
    return "chão";
  } else return "especial";
}

function calculate_map_matrix(img) {
  image(img, 0, 0);
  let c;
  let j = 0;
  let i = 0;
  let x = SQUARE_SIZE_X;
  let y = SQUARE_SIZE_Y;
  for (; i < 42; i++) {
    let colorArrayAxis = [];
    for (j = 0; j < 42; j++) {
      c = get(x / 2, y / 2);
      colorArrayAxis.push(identify_color(c));
      x += 2 * SQUARE_SIZE_X;
    }

    matrix.push(colorArrayAxis);
    x = SQUARE_SIZE_X;
    y += 2 * SQUARE_SIZE_Y;
  }
}

function identify_color(color_rgb_value) {
  if (
    color_rgb_value[0] == 0 &&
    color_rgb_value[1] == 176 &&
    color_rgb_value[2] == 80
  ) {
    return "floresta";
  } else if (
    color_rgb_value[0] == 146 &&
    color_rgb_value[1] == 208 &&
    color_rgb_value[2] == 80
  ) {
    return "grama";
  } else if (
    color_rgb_value[0] == 84 &&
    color_rgb_value[1] == 141 &&
    color_rgb_value[2] == 212
  ) {
    return "agua";
  } else if (
    color_rgb_value[0] == 196 &&
    color_rgb_value[1] == 188 &&
    color_rgb_value[2] == 150
  ) {
    return "areia";
  } else if (
    color_rgb_value[0] == 148 &&
    color_rgb_value[1] == 138 &&
    color_rgb_value[2] == 84
  ) {
    return "montanha";
  } else return "especial";
}

function costMatrix(matrixOfTypes) {
  let i = 0;
  let j = 0;

  for (i = 0; i < 42; i++) {
    let biomeArrayAxis = [];
    for (j = 0; j < 42; j++) {
      if (matrixOfTypes[i][j] == "floresta") {
        biomeArrayAxis.push(100);
      } else if (matrixOfTypes[i][j] == "grama") {
        biomeArrayAxis.push(10);
      } else if (matrixOfTypes[i][j] == "agua") {
        biomeArrayAxis.push(180);
      } else if (matrixOfTypes[i][j] == "areia") {
        biomeArrayAxis.push(20);
      } else if (matrixOfTypes[i][j] == "montanha") {
        biomeArrayAxis.push(150);
      } else if ((i == 5 && j == 6) || (i == 27 && j == 24)) {
        biomeArrayAxis.push(10);
      } else {
        biomeArrayAxis.push(20);
      }
    }
    matrixOfCost.push(biomeArrayAxis);
  }
}

function preload() {
  img = loadImage("images/mapa_game.png");
  link = loadImage("images/link.png");
  cave = loadImage("images/caverna.png");
  home = loadImage("images/casa.png");
  dungeon1 = loadImage("images/dungeon1.png");
  dungeon2 = loadImage("images/dungeon2.png");
  dungeon3 = loadImage("images/dungeon3.png");
  blueGem = loadImage("images/blueGem.png");
}

var matrix_with_spots = new Array(42);
var dungeonWSpots1 = new Array(28);
var dungeonWSpots2 = new Array(28);
var dungeonWSpots3 = new Array(28);

function heuristica(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

function generate_matrixWSpots() {
  for (var i = 0; i < 42; i++) {
    matrix_with_spots[i] = new Array(42);
  }

  for (var i = 0; i < 42; i++) {
    for (var j = 0; j < 42; j++) {
      matrix_with_spots[i][j] = new Spot(i, j);
    }
  }

  for (var i = 0; i < 42; i++) {
    for (var j = 0; j < 42; j++) {
      matrix_with_spots[i][j].addNeighb(matrix_with_spots);
      matrix_with_spots[i][j].addCost(matrixOfCost);
    }
  }
}

function generate_dungeonMatrixWSpots(dungeon, type) {
  for (var i = 0; i < 28; i++) {
    dungeon[i] = new Array(28);
  }

  for (var i = 0; i < 28; i++) {
    for (var j = 0; j < 28; j++) {
      dungeon[i][j] = new Spot2(i, j);
    }
  }

  for (var i = 0; i < 28; i++) {
    for (var j = 0; j < 28; j++) {
      if (type == 0 && dungeonMatrix1[i][j] == "parede") {
        dungeon[i][j].g = 10000;
      }
      if (type == 1 && dungeonMatrix1[i][j] == "parede") {
        dungeon[i][j].g = 10000;
      }

      if (type == 2 && dungeonMatrix1[i][j] == "parede") {
        dungeon[i][j].g = 10000;
      }
      dungeon[i][j].addNeighb(dungeon);
    }
  }

  let idx = type + 1;
  debug("Mapeou a dungeon " + idx, dungeon);
}

function dist(xA, yA, xB, yB) {
  var xDiff = xA - xB;
  var yDiff = yA - yB;

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setup() {
  debug("Iniciando algoritmo!");
  debug("Iniciando interface...");
  createCanvas(1857, 870);
  initMatrixs();
  debug("Matrizes mapeadas");

  debug("Matriz do mapa:", matrix);
  debug("Matriz com custos:", matrixOfCost);

  link.resize(20, 20);
  cave.resize(20, 20);
  home.resize(20, 20);
  blueGem.resize(15, 15);

  let col = color(180, 23, 40, 50);

  col = color(25, 23, 200, 50);
  stepByStepButton = createButton("Próximo passo");
  stepByStepButton.size(400, 100);
  stepByStepButton.style("background-color", col);
  stepByStepButton.style("font-size", "16px");
  stepByStepButton.position(45, 740);
  stepByStepButton.mousePressed(unpause);

  debug("Interface gerada!");

  generate_matrixWSpots();
  debug("Matriz mapeada", matrix_with_spots);

  generate_dungeonMatrixWSpots(dungeonWSpots1, 0);
  generate_dungeonMatrixWSpots(dungeonWSpots2, 1);
  generate_dungeonMatrixWSpots(dungeonWSpots3, 2);

  mountFirstStage();
  logger("Estágio inicial", currentStage);

  setInterval(() => {
    if (!paused) {
      searchAlgorithmStepByStep();
    }
  }, CLOCK_INTERVAL_IN_MS);
}

function unpause() {
  if (paused) {
    paused = false;
  }
}

function initMatrixs() {
  calculate_map_matrix(img);
  costMatrix(matrix);
  getDungeon(dungeon1, 1);
  getDungeon(dungeon2, 2);
  getDungeon(dungeon3, 3);
}
