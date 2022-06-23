// linkStartPos: 0 | 1 | 2 | 3
// 0: Primeira dungeon        (32, 5)
// 1: Segunda dungeon         (17, 39)
// 2: Terceira dungeon        (1, 24)
// 3: Posição padrão do link  (27, 24)
// 4: Casa                    (5, 6)

// steps: ordem dos caminhos
// garantir que seja um caminho valido

// willEntryInDungeon: vai entrar na dungeon
// PATH = {
//   linkStartPos: 3,
//   steps: [0, 1, 2, 4],
//   willEntryInDungeon: false,
// };

class Path {
  constructor(linkStartPos, steps, willEntryInDungeon) {
    this.linkStartPos = linkStartPos;
    this.steps = steps;
    this.willEntryInDungeon = willEntryInDungeon;
    this.current = this.buildFirstCurrent();
    this.stages = [];
    this.paused = true;
    this.end = false;
    this.finished = false;
  }

  buildFirstCurrent() {
    return {
      dungeonIndex:
        this.linkStartPos != 3 && this.willEntryInDungeon
          ? this.linkStartPos
          : null,
      step: this.linkStartPos,
      nextStep: this.steps[0],
      position: getPosByIndex(this.linkStartPos),
      destination: getPosByIndex(this.steps[0]),
      finished: function () {
        return (
          this.position.j == this.destination.i &&
          this.position.i == this.destination.j
        );
      },
    };
  }

  addStage(origin, destination) {
    let stage = new Stage(origin, destination);

    this.stages.push(stage);
  }

  currentStage() {
    return this.stages[this.stages.length - 1];
  }
}
