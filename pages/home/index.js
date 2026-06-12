const GAMES = [
  {
    id: 'undercover',
    name: '谁是卧底',
    subtitle: '聚会推理',
    icon: '/assets/undercover-icon.png',
    url: '/pages/index/index',
  },
  {
    id: 'strokeword',
    name: '添笔成词',
    subtitle: '加笔猜词',
    icon: '/assets/strokeword-icon.png',
    url: '/pages/strokeword/index',
  },
];

Page({
  data: {
    games: GAMES,
  },

  onShareAppMessage() {
    return {
      title: '聚会游戏大集合 - 一起来玩',
      path: '/pages/home/index',
      imageUrl: '/assets/app-icon.png',
    };
  },

  onShareTimeline() {
    return {
      title: '聚会游戏大集合 - 一起来玩',
      imageUrl: '/assets/app-icon.png',
    };
  },

  onSelectGame(event) {
    const url = event.currentTarget.dataset.url;

    if (!url) {
      return;
    }

    wx.navigateTo({ url });
  },
});
