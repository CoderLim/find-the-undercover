const WORD_BANK = [
  {
    id: 'mixed',
    name: '大杂烩',
    pairs: [
      {
        commonWord: '苹果',
        commonPinyin: 'ping guo',
        undercoverWord: '梨',
        undercoverPinyin: 'li',
      },
      {
        commonWord: '咖啡',
        commonPinyin: 'ka fei',
        undercoverWord: '奶茶',
        undercoverPinyin: 'nai cha',
      },
      {
        commonWord: '地铁',
        commonPinyin: 'di tie',
        undercoverWord: '公交',
        undercoverPinyin: 'gong jiao',
      },
      {
        commonWord: '牙刷',
        commonPinyin: 'ya shua',
        undercoverWord: '牙膏',
        undercoverPinyin: 'ya gao',
      },
      {
        commonWord: '月亮',
        commonPinyin: 'yue liang',
        undercoverWord: '太阳',
        undercoverPinyin: 'tai yang',
      },
    ],
  },
  {
    id: 'music',
    name: '音乐',
    pairs: [
      {
        commonWord: '吉他',
        commonPinyin: 'ji ta',
        undercoverWord: '贝斯',
        undercoverPinyin: 'bei si',
      },
      {
        commonWord: '钢琴',
        commonPinyin: 'gang qin',
        undercoverWord: '电子琴',
        undercoverPinyin: 'dian zi qin',
      },
      {
        commonWord: '鼓手',
        commonPinyin: 'gu shou',
        undercoverWord: '歌手',
        undercoverPinyin: 'ge shou',
      },
      {
        commonWord: '民谣',
        commonPinyin: 'min yao',
        undercoverWord: '摇滚',
        undercoverPinyin: 'yao gun',
      },
      {
        commonWord: '耳机',
        commonPinyin: 'er ji',
        undercoverWord: '音箱',
        undercoverPinyin: 'yin xiang',
      },
    ],
  },
  {
    id: 'fairy',
    name: '童话',
    pairs: [
      {
        commonWord: '白雪公主',
        commonPinyin: 'bai xue gong zhu',
        undercoverWord: '灰姑娘',
        undercoverPinyin: 'hui gu niang',
      },
      {
        commonWord: '小红帽',
        commonPinyin: 'xiao hong mao',
        undercoverWord: '大灰狼',
        undercoverPinyin: 'da hui lang',
      },
      {
        commonWord: '美人鱼',
        commonPinyin: 'mei ren yu',
        undercoverWord: '海巫婆',
        undercoverPinyin: 'hai wu po',
      },
      {
        commonWord: '匹诺曹',
        commonPinyin: 'pi nuo cao',
        undercoverWord: '木偶',
        undercoverPinyin: 'mu ou',
      },
      {
        commonWord: '魔法棒',
        commonPinyin: 'mo fa bang',
        undercoverWord: '南瓜车',
        undercoverPinyin: 'nan gua che',
      },
    ],
  },
];

function getCategorySummaries() {
  return WORD_BANK.map(({ id, name, pairs }) => ({
    id,
    name,
    pairCount: pairs.length,
  }));
}

function findCategoryById(categoryId) {
  return WORD_BANK.find((category) => category.id === categoryId);
}

module.exports = {
  WORD_BANK,
  findCategoryById,
  getCategorySummaries,
};
