let SQUARE_SIZE_X = 19.4;
let SQUARE_SIZE_Y = 20.8;
let MAP_SQUARE_SIZE = 20;

let HOME_MULTIPLIER = 30;
let DUNGEON_MULTIPLIER = 30;

let matrixOfCost = [];
var matrix = [];

var STD_OFFSET_X = 518.5;
var STD_OFFSET_Y = 15;

var DUNGEON_OFFSET_X = 1380;
var DUNGEON_OFFSET_Y = 220;

let dungeonMatrix1 = [];
let dungeonMatrix2 = [];
let dungeonMatrix3 = [];

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

CLOCK_INTERVAL_IN_MS = 10;
