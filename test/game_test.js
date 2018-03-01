const assert = require('assert');
const pryjs = require('pryjs');
const Game = require('../lib/game');

describe('Game', () => {

  describe('Grid', () => {
    let game = new Game(10, 10);

    it('should be an array', () => {
      assert(game.grid instanceof Array);
    });

    it('should be an array of array objects', () => {
      for(let row of game.grid) {
        assert(row instanceof Array)
      }
    });

    it('should be a 10x10 grid', () => {
      assert(game.grid.length == 10);
      for(let row of game.grid) {
        assert(row.length == 10);
      }
    });

    it('should be populated with cells', () => {
      for(let row of game.grid) {
        for(let cell of row) {
          assert(cell === 0 || cell === 1);
        }
      }
    });
  });

  describe('NeighborCompiler', () => {
    let game = new Game(0, 0);

    game.setGrid([
      [0,0,1,0],
      [0,1,0,1],
      [1,1,0,0],
      [0,1,0,0]
    ]);

    it('should calculate neighbors', () => {
      let neighbors = game.neighbors(1, 2)
      assert.equal(neighbors, 3)

      neighbors = game.neighbors(3, 3)
      assert.equal(neighbors, 0)
    });

    it('should determine life or death', () => {
      assert(game.life_or_death(0, 2));

      assert.equal(false, game.life_or_death(3, 1));
    });

    it('should determine reproduction', () => {
      assert(game.generates(0, 1))

      assert.equal(false, game.generates(3,3))

      assert.equal(false, game.generates(0,2));
    });
  });

  describe('Runner', () => {
    let game = new Game(0, 0);

    game.setGrid([
      [0,0,1],
      [0,1,0],
      [1,1,0],
    ]);

    it('should change states', () => {
      expected = [
        [0, 0, 0],
        [1, 1, 0],
        [1, 1, 0]
      ];

      game.step();

      assert.equal(game.grid, expected);

      game.step();

      assert.equal(game.grid, expected);
    });
  });
});

