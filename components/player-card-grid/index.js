Component({
  properties: {
    players: {
      type: Array,
      value: [],
    },
    gamePhase: {
      type: String,
      value: 'setup',
    },
    viewedCount: {
      type: Number,
      value: 0,
    },
  },

  methods: {
    onCardTap(event) {
      const playerId = Number(event.currentTarget.dataset.playerId);

      this.triggerEvent('cardtap', { playerId });
    },
  },
});
