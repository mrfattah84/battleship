const ship = require('./ship');

test('length', () => {
  let foo = new ship(4);
  expect(foo.length).toBe(4);
});

test('initial hitCount', () => {
  let foo = new ship(4);
  expect(foo.hitCount).toBe(0);
});

test('hit function', () => {
  let foo = new ship(4);
  foo.hit();
  expect(foo.hitCount).toBe(1);
});

test('isSunk function false', () => {
  let foo = new ship(4);
  foo.hit();
  expect(foo.isSunk()).toBe(false);
});

test('isSunk function true', () => {
  let foo = new ship(4);
  foo.hit();
  foo.hit();
  foo.hit();
  foo.hit();
  expect(foo.isSunk()).toBe(true);
});
