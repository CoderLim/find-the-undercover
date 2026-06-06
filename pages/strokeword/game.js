const { puzzles } = require('../../data/puzzles.js');

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
    let next = Math.floor(Math.random() * puzzles.length);
    // 题库多于一题时，避免连续抽到同一题
    if (puzzles.length > 1) {
      while (next === this.data.currentIndex) {
        next = Math.floor(Math.random() * puzzles.length);
      }
    }
    this.setData({
      puzzle: puzzles[next],
      currentIndex: next,
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
