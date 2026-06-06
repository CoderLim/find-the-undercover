const { puzzles } = require('../../data/puzzles.js');
const { pickFromPool } = require('../../utils/used-picker');
const { STORAGE_KEYS, getUsedIndices, setUsedIndices } = require('../../utils/storage');

Page({
  data: {
    puzzle: null,
    revealed: false,
    currentIndex: -1
  },

  onLoad() {
    this.pickRandom();
  },

  pickRandom() {
    if (!puzzles.length) return;

    const used = getUsedIndices(STORAGE_KEYS.STROKEWORD_USED);
    const { index, usedIndices } = pickFromPool(puzzles.length, used);

    setUsedIndices(STORAGE_KEYS.STROKEWORD_USED, usedIndices);
    this.setData({
      puzzle: puzzles[index],
      currentIndex: index,
      revealed: false
    });
  },

  onReveal() {
    this.setData({ revealed: true });
  },

  onNext() {
    this.pickRandom();
  }
});
