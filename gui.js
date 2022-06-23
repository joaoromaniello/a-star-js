function identifyColor(colorRgb) {
  if (colorRgb[0] == 0 && colorRgb[1] == 176 && colorRgb[2] == 80) {
    return "floresta";
  } else if (colorRgb[0] == 146 && colorRgb[1] == 208 && colorRgb[2] == 80) {
    return "grama";
  } else if (colorRgb[0] == 84 && colorRgb[1] == 141 && colorRgb[2] == 212) {
    return "agua";
  } else if (colorRgb[0] == 196 && colorRgb[1] == 188 && colorRgb[2] == 150) {
    return "areia";
  } else if (colorRgb[0] == 148 && colorRgb[1] == 138 && colorRgb[2] == 84) {
    return "montanha";
  } else return "especial";
}

function draw() {
  background(70);
  drawMap(matrix);
  drawCaves();
  drawHome();
  writeText();
  drawPos();

  noLoop();
}

function updateCanvas(stage) {
  background(70);
  drawMap(matrix);
  drawCaves();
  drawHome();
  writeText(stage.winnerPath);
  drawPos();
  drawPath(stage);

  noLoop();
}

function drawMap(matrixOfTypes) {
  strokeWeight(1);

  matrixOfTypes[1][2] = "grama";
  matrixOfTypes[5][6] = "grama";
  matrixOfTypes[32][5] = "areia";
  matrixOfTypes[1][24] = "areia";
  matrixOfTypes[17][39] = "areia";
  matrixOfTypes[27][24] = "grama";

  for (let i = 0; i < 42; i++) {
    for (let j = 0; j < 42; j++) {
      if (matrixOfTypes[i][j] == "floresta") {
        fill(0, 176, 80);
        rect(
          j * MAP_SQUARE_SIZE + 518.5,
          i * MAP_SQUARE_SIZE + 15,
          MAP_SQUARE_SIZE
        );
      } else if (matrixOfTypes[i][j] == "grama") {
        fill(146, 208, 80);
        rect(
          j * MAP_SQUARE_SIZE + 518.5,
          i * MAP_SQUARE_SIZE + 15,
          MAP_SQUARE_SIZE
        );
      } else if (matrixOfTypes[i][j] == "agua") {
        fill(84, 141, 212);
        rect(
          j * MAP_SQUARE_SIZE + 518.5,
          i * MAP_SQUARE_SIZE + 15,
          MAP_SQUARE_SIZE
        );
      } else if (matrixOfTypes[i][j] == "areia") {
        fill(196, 188, 150);
        rect(
          j * MAP_SQUARE_SIZE + 518.5,
          i * MAP_SQUARE_SIZE + 15,
          MAP_SQUARE_SIZE
        );
      } else if (matrixOfTypes[i][j] == "montanha") {
        fill(148, 138, 84);
        rect(
          j * MAP_SQUARE_SIZE + 518.5,
          i * MAP_SQUARE_SIZE + 15,
          MAP_SQUARE_SIZE
        );
      } else {
        fill(0);
        rect(
          j * MAP_SQUARE_SIZE + 518.5,
          i * MAP_SQUARE_SIZE + 15,
          MAP_SQUARE_SIZE
        );
      }
    }
  }
}

function drawCaves() {
  image(cave, 24 * 20 + 518.5, 1 * 20 + 15);
  image(cave, 5 * 20 + 518.5, 32 * 20 + 15);
  image(cave, 39 * 20 + 518.5, 17 * 20 + 15);
}

function drawHome() {
  image(home, 6 * 20 + 518.5, 5 * 20 + 15);
}

function writeText(winnerPath) {
  fill(255);
  stroke(0);
  rect(70, 270, 400, 200);

  textSize(32);
  fill(0);
  text("Trabalho 1 – Busca Heurística:", 45, 90);
  textSize(18);
  text("Feito por:", 1700, 815);
  textSize(12);
  text("Alisson Guimarães", 1700, 830);
  text("João Antônio Nardini", 1700, 845);
  text("Vinicio Bernardes", 1700, 860);
  textSize(20);
  text("Custo do caminho até o momento (g + h)", 80, 300);
  if (winnerPath == null) {
    text("f = 0", 83, 335);
    text("g = 0", 80, 360);
    text("h = 0", 80, 385);
  } else {
    text("f = " + getTotalF(winnerPath), 83, 335);
    text("g = " + getTotalG(winnerPath), 80, 360);
    text("h = " + getTotalH(winnerPath), 80, 385);
  }
}

function drawDungeon(matrixOfTypes, type) {
  let i = 0;
  let j = 0;
  let square = 15;

  if (type == 0) {
    matrixOfTypes[26][14] = "chão";
    matrixOfTypes[13][3] = "chão";
    fill(225);
    rect(
      26 * square + DUNGEON_OFFSET_X,
      14 * square + DUNGEON_OFFSET_Y,
      square
    );
    rect(13 * square + DUNGEON_OFFSET_X, 3 * square + DUNGEON_OFFSET_Y, square);
  }

  if (type == 1) {
    matrixOfTypes[13][25] = "chão";
    matrixOfTypes[2][13] = "chão";
    fill(225);
    rect(
      13 * square + DUNGEON_OFFSET_X,
      25 * square + DUNGEON_OFFSET_Y,
      square
    );
    rect(2 * square + DUNGEON_OFFSET_X, 13 * square + DUNGEON_OFFSET_Y, square);
  }

  if (type == 2) {
    matrixOfTypes[14][25] = "chão";
    matrixOfTypes[15][19] = "chão";

    rect(
      14 * square + DUNGEON_OFFSET_X,
      25 * square + DUNGEON_OFFSET_Y,
      square
    );
    rect(
      15 * square + DUNGEON_OFFSET_X,
      19 * square + DUNGEON_OFFSET_Y,
      square
    );
  }

  for (; i < 28; i++) {
    for (j = 0; j < 28; j++) {
      if (matrixOfTypes[i][j] == "parede") {
        fill(90);
        rect(
          j * square + DUNGEON_OFFSET_X,
          i * square + DUNGEON_OFFSET_Y,
          MAP_SQUARE_SIZE
        );
      } else if (matrixOfTypes[i][j] == "chão") {
        fill(225);
        rect(
          j * square + DUNGEON_OFFSET_X,
          i * square + DUNGEON_OFFSET_Y,
          square
        );
      }
    }
  }
}

function drawPos() {
  let j;
  let i;
  for (i = 0; i < 42; i++) {
    for (j = 0; j < 42; j++) {
      strokeWeight(0.08);
      textSize(13);
      text(j, 494.5, 30 + j * 20);
    }
    textSize(13);
    text(i, 520.5 + i * 20, 12);
  }
}

function drawPath(stage) {
  if (stage.dungeonIndex != null) {
    drawMapPath(stages[stages.length - 2]);
    drawDungeonPath(stage);
  } else {
    drawMapPath(stage);
  }
}

function drawMapPath(stage) {
  fill(255, 0, 0);

  for (let i = 0; i < stage.winnerPath.length; i++) {
    rect(
      stage.winnerPath[i].j * 20 + STD_OFFSET_X,
      stage.winnerPath[i].i * 20 + STD_OFFSET_Y,
      18
    );

    rect(
      stage.origin.i * 20 + STD_OFFSET_X,
      stage.origin.j * 20 + STD_OFFSET_Y,
      18
    );

    image(
      link,
      stage.origin.i * 20 + STD_OFFSET_X,
      stage.origin.j * 20 + STD_OFFSET_Y
    );
    fill(255, 0, 0);
  }

  if (stage.onTraceback) {
    fill(0, 0, 255);
    for (let i = 0; i < stage.bestSet.length; i++) {
      fill(0, 0, 255);
      rect(
        stage.bestSet[i].j * 20 + STD_OFFSET_X,
        stage.bestSet[i].i * 20 + STD_OFFSET_Y,
        18
      );
    }
  }
}

function drawDungeonPath(stage) {
  let dungeonMatrix = getDungeonMatrixByIndex(stage.dungeonIndex);

  drawDungeon(dungeonMatrix, 0);
  drawPendant(stage.dungeonIndex);

  fill(255, 0, 0);
  rect(
    stage.origin.i * 15 + DUNGEON_OFFSET_X,
    stage.origin.j * 15 + DUNGEON_OFFSET_Y,
    15
  );

  for (let i = 0; i < stage.winnerPath.length; i++) {
    rect(
      stage.winnerPath[i].j * 15 + DUNGEON_OFFSET_X,
      stage.winnerPath[i].i * 15 + DUNGEON_OFFSET_Y,
      15
    );
    // rect(
    //   stage.origin.i * 15 + DUNGEON_OFFSET_X,
    //   stage.origin.j * 15 + DUNGEON_OFFSET_Y,
    //   15
    // );
  }
}

function getDungeonMatrixByIndex(index) {
  if (index == 0) {
    return dungeonMatrix1;
  } else if (index == 1) {
    return dungeonMatrix2;
  } else if (index == 2) {
    return dungeonMatrix3;
  }
}

function drawPendant(index) {
  if (index == 0) {
    image(blueGem, 13 * 15 + DUNGEON_OFFSET_X, 3 * 15 + DUNGEON_OFFSET_Y);
  } else if (index == 1) {
    image(blueGem, 13 * 15 + DUNGEON_OFFSET_X, 2 * 15 + DUNGEON_OFFSET_Y);
  } else if (index == 2) {
    image(blueGem, 15 * 15 + DUNGEON_OFFSET_X, 19 * 15 + DUNGEON_OFFSET_Y);
  }
}
