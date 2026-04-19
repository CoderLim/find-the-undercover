const { canRevealAnswers, togglePlayerCard, revealAnswers, resetForNextRound } = require('../../utils/game');

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
    canReveal: false,
    viewedCount: 0,
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
    });

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
      canReveal: canRevealAnswers(round.players),
      viewedCount: round.players.filter((player) => player.hasViewed).length,
    });
  },
});
