const GAMES = [
  {
    id: 'undercover',
    name: '谁是卧底',
    subtitle: '聚会推理',
    icon: '/assets/app-icon.png',
    url: '/pages/index/index',
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
