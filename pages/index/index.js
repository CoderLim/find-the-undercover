const { getCategorySummaries } = require('../../data/word-bank');
const { MIN_PLAYERS, MAX_PLAYERS, createGameRound } = require('../../utils/game');

function getPlayerCountOptions() {
  return Array.from({ length: MAX_PLAYERS - MIN_PLAYERS + 1 }, (_, index) => MIN_PLAYERS + index);
}

const app = getApp();

Page({
  data: {
    playerCountOptions: getPlayerCountOptions(),
    categories: getCategorySummaries(),
    playerCount: null,
    categoryId: '',
    canStart: false,
  },

  onShow() {
    const { playerCount, categoryId } = app.globalData.gameSetup;

    this.setData({
      playerCount,
      categoryId,
      canStart: Boolean(playerCount && categoryId),
    });
  },

  onSelectCount(event) {
    const playerCount = event.detail.playerCount;

    app.globalData.gameSetup = {
      ...app.globalData.gameSetup,
      playerCount,
    };

    this.setData({
      playerCount,
      canStart: Boolean(playerCount && this.data.categoryId),
    });
  },

  onSelectCategory(event) {
    const categoryId = event.detail.categoryId;

    app.globalData.gameSetup = {
      ...app.globalData.gameSetup,
      categoryId,
    };

    this.setData({
      categoryId,
      canStart: Boolean(this.data.playerCount && categoryId),
    });
  },

  onStartGame() {
    try {
      const round = createGameRound({
        playerCount: this.data.playerCount,
        categoryId: this.data.categoryId,
      });

      app.globalData.currentRound = round;
      wx.navigateTo({
        url: '/pages/play/index',
      });
    } catch (error) {
      wx.showToast({
        title: error.message,
        icon: 'none',
      });
    }
  },

});
