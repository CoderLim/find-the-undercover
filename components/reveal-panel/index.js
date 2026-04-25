Component({
  properties: {
    canReveal: {
      type: Boolean,
      value: false,
    },
    gamePhase: {
      type: String,
      value: 'setup',
    },
  },

  methods: {
    onReveal() {
      this.triggerEvent('reveal');
    },

    onNextRound() {
      this.triggerEvent('nextround');
    },

    onReset() {
      this.triggerEvent('reset');
    },
  },
});
