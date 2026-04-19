const WORD_BANK = [
  {
    id: 'mixed',
    name: '大杂烩',
    pairs: [
      {
        commonWord: '苹果',
        commonPinyin: 'píng guǒ',
        undercoverWord: '梨',
        undercoverPinyin: 'lí',
      },
      {
        commonWord: '咖啡',
        commonPinyin: 'kā fēi',
        undercoverWord: '奶茶',
        undercoverPinyin: 'nǎi chá',
      },
      {
        commonWord: '地铁',
        commonPinyin: 'dì tiě',
        undercoverWord: '公交',
        undercoverPinyin: 'gōng jiāo',
      },
      {
        commonWord: '牙刷',
        commonPinyin: 'yá shuā',
        undercoverWord: '牙膏',
        undercoverPinyin: 'yá gāo',
      },
      {
        commonWord: '月亮',
        commonPinyin: 'yuè liàng',
        undercoverWord: '太阳',
        undercoverPinyin: 'tài yáng',
      },
    ],
  },
  {
    id: 'music',
    name: '音乐',
    pairs: [
      {
        commonWord: '吉他',
        commonPinyin: 'jí tā',
        undercoverWord: '贝斯',
        undercoverPinyin: 'bèi sī',
      },
      {
        commonWord: '钢琴',
        commonPinyin: 'gāng qín',
        undercoverWord: '电子琴',
        undercoverPinyin: 'diàn zǐ qín',
      },
      {
        commonWord: '鼓手',
        commonPinyin: 'gǔ shǒu',
        undercoverWord: '歌手',
        undercoverPinyin: 'gē shǒu',
      },
      {
        commonWord: '民谣',
        commonPinyin: 'mín yáo',
        undercoverWord: '摇滚',
        undercoverPinyin: 'yáo gǔn',
      },
      {
        commonWord: '耳机',
        commonPinyin: 'ěr jī',
        undercoverWord: '音箱',
        undercoverPinyin: 'yīn xiāng',
      },
    ],
  },
  {
    id: 'fairy',
    name: '童话',
    pairs: [
      {
        commonWord: '白雪公主',
        commonPinyin: 'bái xuě gōng zhǔ',
        undercoverWord: '灰姑娘',
        undercoverPinyin: 'huī gū niang',
      },
      {
        commonWord: '小红帽',
        commonPinyin: 'xiǎo hóng mào',
        undercoverWord: '大灰狼',
        undercoverPinyin: 'dà huī láng',
      },
      {
        commonWord: '美人鱼',
        commonPinyin: 'měi rén yú',
        undercoverWord: '海巫婆',
        undercoverPinyin: 'hǎi wū pó',
      },
      {
        commonWord: '匹诺曹',
        commonPinyin: 'pǐ nuò cáo',
        undercoverWord: '木偶',
        undercoverPinyin: 'mù ǒu',
      },
      {
        commonWord: '魔法棒',
        commonPinyin: 'mó fǎ bàng',
        undercoverWord: '南瓜车',
        undercoverPinyin: 'nán guā chē',
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
