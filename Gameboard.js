const ship = require('./ship');

class gameBoard {
  constructor() {
    this.board = this.#makeBoard();
    this.shotRecord = this.#makeBoard();
    this.ships = [];
  }

  #makeBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let i = 0; i < 10; i++) {
        row.push(-1);
      }
      board.push(row);
    }
    return board;
  }

  #checkCoordInShip(x, y) {
    for (let index = 0; index < this.ships.length; index++) {
      const ship = this.ships[index];
      if (ship.orientation == 0) {
        if (ship.y == y && ship.x <= x && x < ship.x + ship.ship.length) {
          return ship;
        }
      } else {
        if (ship.x == x && ship.y <= y && y < ship.y + ship.ship.length) {
          return ship;
        }
      }
    }
    return false;
  }

  placeShip(x, y, length, orientation) {
    if (orientation == 0) {
      for (let i = 0; i < length; i++) {
        if (
          x + i < 0 ||
          10 <= x + i ||
          y < 0 ||
          10 <= y ||
          this.#checkCoordInShip(x + i, y) !== false
        ) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (
          y + i < 0 ||
          10 <= y + i ||
          x < 0 ||
          10 <= x ||
          this.#checkCoordInShip(x, y + i) !== false
        ) {
          return false;
        }
      }
    }
    this.ships.push({ ship: new ship(length), x, y, orientation });
  }

  receiveAttack(x, y) {
    // -1 unshotted | 0 miss | 1 hit
    if (this.board[y][x] === -1) {
      // check if cell havent been hit
      const ship = this.#checkCoordInShip(x, y);
      if (ship === false) {
        //miss
        this.board[y][x] = 0;
        return false;
      } else {
        //hit
        this.board[y][x] = 1;
        ship.ship.hit();
        return true;
      }
    } else {
      throw new Error('cant hit same cell twice');
    }
  }

  checkLoss() {
    if (this.ships.length == 0) {
      return false;
    }
    for (let index = 0; index < this.ships.length; index++) {
      const ship = this.ships[index];
      if (ship.ship.isSunk() === false) {
        return false;
      }
    }
    return true;
  }
}

module.exports = gameBoard;
