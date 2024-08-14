const gameBoard = require('./Gameboard');
const ship = require('./ship');

test('constructor', () => {
  let foo = new gameBoard();
  expect(foo.board).toHaveLength(10);
  expect(foo.shotRecord).toHaveLength(10);
});

test('placeShip', () => {
  let foo = new gameBoard();

  expect(foo.ships).toHaveLength(0);
  foo.placeShip(0, 0, 3, 0);
  foo.placeShip(0, 1, 3, 1);
  expect(foo.ships).toHaveLength(2);
});

test('crossing ships', () => {
  let foo = new gameBoard();

  expect(foo.ships).toHaveLength(0);
  foo.placeShip(0, 0, 3, 0);
  foo.placeShip(0, 0, 3, 1);
  expect(foo.ships).toHaveLength(1);
});

test('out of board ships', () => {
  let foo = new gameBoard();

  expect(foo.ships).toHaveLength(0);
  foo.placeShip(8, 0, 3, 0);
  expect(foo.ships).toHaveLength(0);
});

test('receiveAttack miss', () => {
  let foo = new gameBoard();
  foo.placeShip(0, 0, 3, 0);
  foo.receiveAttack(0, 1);

  expect(foo.board[1][0]).toBe(0);
  expect(foo.ships[0].ship.hitCount).toBe(0);
});

test('receiveAttack hit', () => {
  let foo = new gameBoard();
  foo.placeShip(0, 0, 3, 0);
  foo.receiveAttack(0, 0);

  expect(foo.board[0][0]).toBe(1);
  expect(foo.ships[0].ship.hitCount).toBe(1);
});

test('receiveAttack hit twice', () => {
  let foo = new gameBoard();
  foo.placeShip(0, 0, 3, 0);
  foo.receiveAttack(0, 0);
  expect(() => foo.receiveAttack(0, 0)).toThrow();
  expect(foo.board[0][0]).toBe(1);
  expect(foo.ships[0].ship.hitCount).toBe(1);
});

test('checkLoss', () => {
  let foo = new gameBoard();
  expect(foo.checkLoss()).toBe(false);

  foo.placeShip(0, 0, 3, 0);
  expect(foo.checkLoss()).toBe(false);

  foo.receiveAttack(0, 0);
  expect(foo.checkLoss()).toBe(false);

  foo.receiveAttack(1, 0);
  expect(foo.checkLoss()).toBe(false);

  foo.receiveAttack(2, 0);
  expect(foo.checkLoss()).toBe(true);
});
