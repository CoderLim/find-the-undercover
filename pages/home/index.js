const GAMES = [
  {
    id: 'undercover',
    name: '谁是卧底',
    subtitle: '聚会推理',
    icon: '/assets/app-icon.png',
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

  onSelectGame(event) {
    const url = event.currentTarget.dataset.url;

    if (!url) {
      return;
    }

    wx.navigateTo({ url });
  },
});
