// linkStartPos: 0 | 1 | 2 | 3
// 0: Primeira dungeon        (32, 5)
// 1: Segunda dungeon         (17, 39)
// 2: Terceira dungeon        (1, 24)
// 3: Posição padrão do link  (27, 24)
// 4: Casa                    (5, 6)

// steps: ordem dos caminhos
// garantir que seja um caminho valido

// willEntryInDungeon: vai entrar na dungeon
PATH = {
  linkStartPos: 3,
  steps: [0, 1, 2, 4],
  willEntryInDungeon: true,
};

let SQUARE_SIZE_X = 19.4;
let SQUARE_SIZE_Y = 20.8;
let MAP_SQUARE_SIZE = 20;

let matrixOfCost = [];
var matrix = [];

var STD_OFFSET_X = 518.5;
var STD_OFFSET_Y = 15;

var DUNGEON_OFFSET_X = 1380;
var DUNGEON_OFFSET_Y = 220;

let dungeonMatrix1 = [];
let dungeonMatrix2 = [];
let dungeonMatrix3 = [];

let stageCount = 0;

let isOnTraceback = true;
let paused = true;

VERBOSE = false;

LINK_POS = {
  i: 27,
  j: 24,
};

HOME_POS = {
  i: 5,
  j: 6,
};

DUNGEON_1 = {
  i: 32,
  j: 5,
};

DUNGEON_2 = {
  i: 17,
  j: 39,
};

DUNGEON_3 = {
  i: 1,
  j: 24,
};

DUNGEON_1_INSIDE = {
  ENTER: {
    i: 26,
    j: 14,
  },
  EXIT: {
    i: 3,
    j: 13,
  },
};

DUNGEON_2_INSIDE = {
  ENTER: {
    i: 25,
    j: 13,
  },
  EXIT: {
    i: 2,
    j: 13,
  },
};

DUNGEON_3_INSIDE = {
  ENTER: {
    i: 25,
    j: 14,
  },
  EXIT: {
    i: 19,
    j: 15,
  },
};

let currentStage = {
  dungeonIndex: null,
  step: PATH.linkStartPos,
  nextStep: PATH.steps[0],
  position: {
    i: 0,
    j: 0,
  },
  destination: {
    i: 0,
    j: 0,
  },
  finished: function () {
    return (
      this.position.j == this.destination.i &&
      this.position.i == this.destination.j
    );
  },
};

CLOCK_INTERVAL_IN_MS = 10;
