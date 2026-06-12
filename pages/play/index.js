const { canRevealAnswers, togglePlayerCard, revealAnswers, resetForNextRound } = require('../../utils/game');
const { STORAGE_KEYS, setUsedIndices } = require('../../utils/storage');

const app = getApp();

Page({
  data: {
    playerCount: null,
    categoryId: '',
    gamePhase: 'playing',
    players: [],
    answer: null,
    undercoverPlayerId: null,
    revealSummary: null,
    usedPairIndices: [],
    canReveal: false,
    viewedCount: 0,
  },

  onShareAppMessage() {
    return {
      title: '谁是卧底 - 你能找出卧底吗？',
      path: '/pages/home/index',
      imageUrl: '/assets/undercover-icon.png',
    };
  },

  onShareTimeline() {
    return {
      title: '谁是卧底 - 你能找出卧底吗？',
      imageUrl: '/assets/undercover-icon.png',
    };
  },

  onShow() {
    const round = app.globalData.currentRound;

    if (!round) {
      wx.navigateBack({
        delta: 1,
        fail: () => {
          wx.reLaunch({
            url: '/pages/index/index',
          });
        },
      });
      return;
    }

    this.applyRound(round);
  },

  onCardTap(event) {
    if (this.data.gamePhase !== 'playing') {
      return;
    }

    const playerId = event.detail.playerId;
    const players = togglePlayerCard(this.data.players, playerId);
    const round = {
      playerCount: this.data.playerCount,
      categoryId: this.data.categoryId,
      gamePhase: this.data.gamePhase,
      players,
      answer: this.data.answer,
      undercoverPlayerId: this.data.undercoverPlayerId,
      revealSummary: this.data.revealSummary,
      usedPairIndices: this.data.usedPairIndices,
    };

    app.globalData.currentRound = round;
    this.applyRound(round);
  },

  onReveal() {
    try {
      const round = revealAnswers({
        playerCount: this.data.playerCount,
        categoryId: this.data.categoryId,
        gamePhase: this.data.gamePhase,
        players: this.data.players,
        answer: this.data.answer,
        undercoverPlayerId: this.data.undercoverPlayerId,
        usedPairIndices: this.data.usedPairIndices,
      });

      app.globalData.currentRound = round;
      this.applyRound(round);
    } catch (error) {
      wx.showToast({
        title: error.message,
        icon: 'none',
      });
    }
  },

  onNextRound() {
    const round = resetForNextRound({
      playerCount: this.data.playerCount,
      categoryId: this.data.categoryId,
      usedPairIndices: this.data.usedPairIndices || [],
    });

    setUsedIndices(STORAGE_KEYS.undercoverUsed(round.categoryId), round.usedPairIndices);
    app.globalData.currentRound = round;
    this.applyRound(round);
  },

  onReset() {
    app.globalData.currentRound = null;
    wx.navigateBack({
      delta: 1,
      fail: () => {
        wx.reLaunch({
          url: '/pages/index/index',
        });
      },
    });
  },

  applyRound(round) {
    this.setData({
      playerCount: round.playerCount,
      categoryId: round.categoryId,
      gamePhase: round.gamePhase,
      players: round.players,
      answer: round.answer,
      undercoverPlayerId: round.undercoverPlayerId,
      revealSummary: round.revealSummary,
      usedPairIndices: round.usedPairIndices || [],
      canReveal: canRevealAnswers(round.players),
      viewedCount: round.players.filter((player) => player.hasViewed).length,
    });
  },
});
