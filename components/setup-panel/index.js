Component({
  data: {
    selectedPlayerIndex: 0,
    selectedCategoryIndex: 0,
  },

  properties: {
    playerCountOptions: {
      type: Array,
      value: [],
    },
    selectedPlayerCount: {
      type: Number,
      value: null,
    },
    categories: {
      type: Array,
      value: [],
    },
    selectedCategoryId: {
      type: String,
      value: '',
    },
    canStart: {
      type: Boolean,
      value: false,
    },
  },

  observers: {
    selectedPlayerCount(selectedPlayerCount) {
      const index = this.properties.playerCountOptions.findIndex((option) => option === selectedPlayerCount);

      this.setData({
        selectedPlayerIndex: index >= 0 ? index : 0,
      });
    },

    selectedCategoryId(selectedCategoryId) {
      const index = this.properties.categories.findIndex((category) => category.id === selectedCategoryId);

      this.setData({
        selectedCategoryIndex: index >= 0 ? index : 0,
      });
    },
  },

  methods: {
    onSelectCount(event) {
      const selectedPlayerIndex = Number(event.detail.value);
      const playerCount = Number(this.properties.playerCountOptions[selectedPlayerIndex]);

      this.setData({ selectedPlayerIndex });

      this.triggerEvent('selectcount', { playerCount });
    },

    onSelectCategory(event) {
      const selectedCategoryIndex = Number(event.detail.value);
      const category = this.properties.categories[selectedCategoryIndex];
      const categoryId = category ? category.id : '';

      this.setData({ selectedCategoryIndex });

      this.triggerEvent('selectcategory', { categoryId });
    },

    onStartGame() {
      this.triggerEvent('startgame');
    },
  },
});
