const { puzzles } = require('../../data/puzzles.js');
const { pickFromPool } = require('../../utils/used-picker');
const { STORAGE_KEYS, getUsedIndices, setUsedIndices } = require('../../utils/storage');

Page({
  data: {
    puzzle: null,
    revealed: false,
    currentIndex: -1
  },

  onShareAppMessage() {
    return {
      title: '添笔成词 - 你猜得出这个字吗？',
      path: '/pages/home/index',
      imageUrl: '/assets/strokeword-icon.png',
    };
  },

  onShareTimeline() {
    return {
      title: '添笔成词 - 你猜得出这个字吗？',
      imageUrl: '/assets/strokeword-icon.png',
    };
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
