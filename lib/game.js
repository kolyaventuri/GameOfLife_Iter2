const pry = require('pryjs');

class Game {
  constructor(width, height)  {
    this.grid = new Array(height);

    for(let i = 0; i < height; i++) {
      this.grid[i] = new Array(width);
      for(let j = 0; j < width; j++) {
        this.grid[i][j] = Math.round(Math.random())
      }
    }
  }

  neighbors(_x, _y) {
    let livingNeighbors = 0;

    for(let y = _y - 1; y <= _y + 1; y++) {
      if(typeof this.grid[y] == 'undefined') continue;

      for(let x = _x - 1; x <= _x + 1; x++) {
        if(y == _y && x == _x) continue;
        if(this.grid[y][x]) livingNeighbors++;
      }
    }

    return livingNeighbors;
  }

  life_or_death(x, y) {
    let neighbors = this.neighbors(x,y);
    return (neighbors == 2 || neighbors == 3);
  }

  generates(x, y) {
    if(this.grid[y][x] === 1) return false;

    let neighbors = this.neighbors(x, y);

    return neighbors == 3
  }

  setGrid(grid) {
    this.grid = grid;
  }
}

module.exports = Game;