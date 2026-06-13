const test = require('node:test');
const assert = require('node:assert/strict');

const { puzzles } = require('../data/puzzles');

test('strokeword puzzle bank contains 104 valid unique puzzles', () => {
  assert.equal(puzzles.length, 104);

  const words = new Set();

  puzzles.forEach((puzzle, index) => {
    assert.ok(puzzle.left, `puzzle ${index + 1} is missing left`);
    assert.ok(puzzle.right, `puzzle ${index + 1} is missing right`);
    assert.ok(puzzle.tip, `puzzle ${index + 1} is missing tip`);

    for (const side of ['left', 'right']) {
      const character = puzzle[side];
      assert.equal(typeof character.base, 'string');
      assert.equal(typeof character.answer, 'string');
      assert.equal([...character.base].length, 1);
      assert.equal([...character.answer].length, 1);
      assert.ok(
        [1, 2, 3].includes(character.add),
        `${puzzle.word}.${side}.add must be 1, 2, or 3`
      );
    }

    assert.equal(
      puzzle.word,
      puzzle.left.answer + puzzle.right.answer,
      `puzzle ${index + 1} word does not match its answers`
    );
    assert.notEqual(
      puzzle.left.answer,
      puzzle.right.answer,
      `${puzzle.word} must not repeat the same answer character`
    );
    assert.ok(!words.has(puzzle.word), `duplicate word: ${puzzle.word}`);
    words.add(puzzle.word);
  });
});
