Page({
  onShareAppMessage() {
    return {
      title: '添笔成词 - 考验你的汉字功底！',
      path: '/pages/home/index',
      imageUrl: '/assets/strokeword-icon.png',
    };
  },

  onShareTimeline() {
    return {
      title: '添笔成词 - 考验你的汉字功底！',
      imageUrl: '/assets/strokeword-icon.png',
    };
  },

  onStart() {
    wx.navigateTo({ url: '/pages/strokeword/game' });
  }
});
