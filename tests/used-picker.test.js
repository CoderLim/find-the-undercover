const test = require('node:test');
const assert = require('node:assert/strict');

const { pickFromPool } = require('../utils/used-picker');

test('pickFromPool picks only from unused indices', () => {
  const result = pickFromPool(4, [0, 2], () => 0);

  assert.equal(result.index, 1);
  assert.deepEqual(result.usedIndices, [0, 2, 1]);
});

test('pickFromPool resets when all indices are used', () => {
  const result = pickFromPool(3, [0, 1, 2], () => 0);

  assert.equal(result.index, 0);
  assert.deepEqual(result.usedIndices, [0]);
});

test('pickFromPool handles empty pool', () => {
  const result = pickFromPool(0, [0, 1], () => 0);

  assert.equal(result.index, -1);
  assert.deepEqual(result.usedIndices, [0, 1]);
});

test('pickFromPool handles single-item pool', () => {
  const first = pickFromPool(1, [], () => 0);
  const second = pickFromPool(1, first.usedIndices, () => 0);

  assert.equal(first.index, 0);
  assert.deepEqual(first.usedIndices, [0]);
  assert.equal(second.index, 0);
  assert.deepEqual(second.usedIndices, [0]);
});
