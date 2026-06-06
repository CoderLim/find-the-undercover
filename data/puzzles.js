// ============================================================
// 添笔成词 · 题库（puzzles）
// ============================================================
// 玩法：每题给出左右两个“基础字”，给左字加 x 笔、右字加 y 笔，
//       让两字各自变成一个新字，并组成一个词。
//
// ------------------------------------------------------------
// 选词 / 出题要求（新增或修改题目时务必遵守）
// ------------------------------------------------------------
//   1) 加的笔画数只能是 1、2、3（add ∈ {1,2,3}）。
//   2) 基础字加 add 笔后必须能合理变成 answer，且写得出加笔说明（tip）。
//   3) word 必须等于 left.answer + right.answer。
//   4) 词语要“具体形象”：优先实物、人物、自然、场景等看得见摸得着的词；
//      不要纯数字（如“三百”“二千”）、不要抽象词（如“自主”“办公”）。
//   5) 加笔后的两个字不能相同：不出“天天”“个个”这类叠字词。
//   6) 用字控制在小学生认识的范围，避免成语、生僻字、多音歧义词。
//   7) word 不与已有题目重复。
//
// ------------------------------------------------------------
// 字段说明
// ------------------------------------------------------------
//   left/right.base   基础字（题面展示）
//   left/right.add    要加的笔画数（1~3）
//   left/right.answer 加笔后得到的字（答案）
//   word              组成的词（= left.answer + right.answer）
//   tip               加笔说明，便于核对与讲解
// ============================================================

const puzzles = [
  {
    left: { base: '日', add: 1, answer: '白' },
    right: { base: '大', add: 1, answer: '天' },
    word: '白天',
    tip: '“日”上加一撇成“白”，“大”上加一横成“天”。'
  },
  {
    left: { base: '人', add: 1, answer: '大' },
    right: { base: '三', add: 1, answer: '王' },
    word: '大王',
    tip: '“人”上加一横成“大”，“三”加一竖成“王”。'
  },
  {
    left: { base: '人', add: 1, answer: '大' },
    right: { base: '人', add: 2, answer: '火' },
    word: '大火',
    tip: '“人”上加一横成“大”，“人”上加两点成“火”。'
  },
  {
    left: { base: '人', add: 1, answer: '大' },
    right: { base: '大', add: 2, answer: '头' },
    word: '大头',
    tip: '“人”上加一横成“大”，“大”上加两点成“头”。'
  },
  {
    left: { base: '三', add: 1, answer: '王' },
    right: { base: '了', add: 1, answer: '子' },
    word: '王子',
    tip: '“三”加一竖成“王”，“了”加一横成“子”。'
  },
  {
    left: { base: '王', add: 1, answer: '玉' },
    right: { base: '木', add: 2, answer: '米' },
    word: '玉米',
    tip: '“王”加一点成“玉”，“木”上加两点成“米”。'
  },
  {
    left: { base: '人', add: 1, answer: '大' },
    right: { base: '木', add: 2, answer: '米' },
    word: '大米',
    tip: '“人”上加一横成“大”，“木”上加两点成“米”。'
  },
  {
    left: { base: '口', add: 1, answer: '中' },
    right: { base: '干', add: 1, answer: '午' },
    word: '中午',
    tip: '“口”加一竖成“中”，“干”上加一撇成“午”。'
  },
  {
    left: { base: '木', add: 1, answer: '本' },
    right: { base: '了', add: 1, answer: '子' },
    word: '本子',
    tip: '“木”下加一横成“本”，“了”加一横成“子”。'
  },
  {
    left: { base: '日', add: 1, answer: '白' },
    right: { base: '木', add: 2, answer: '米' },
    word: '白米',
    tip: '“日”上加一撇成“白”，“木”上加两点成“米”。'
  },
  {
    left: { base: '口', add: 1, answer: '日' },
    right: { base: '了', add: 1, answer: '子' },
    word: '日子',
    tip: '“口”中加一横成“日”，“了”加一横成“子”。'
  },
  {
    left: { base: '大', add: 1, answer: '太' },
    right: { base: '了', add: 1, answer: '子' },
    word: '太子',
    tip: '“大”里加一点成“太”，“了”加一横成“子”。'
  },
  {
    left: { base: '人', add: 1, answer: '大' },
    right: { base: '大', add: 1, answer: '夫' },
    word: '大夫',
    tip: '“人”上加一横成“大”，“大”上加一横成“夫”。'
  },
  {
    left: { base: '口', add: 2, answer: '叶' },
    right: { base: '了', add: 1, answer: '子' },
    word: '叶子',
    tip: '“口”右加一“十”成“叶”，“了”加一横成“子”。'
  },
  {
    left: { base: '口', add: 2, answer: '石' },
    right: { base: '了', add: 1, answer: '子' },
    word: '石子',
    tip: '“口”上加一“厂”成“石”，“了”加一横成“子”。'
  },
  {
    left: { base: '田', add: 2, answer: '男' },
    right: { base: '了', add: 1, answer: '子' },
    word: '男子',
    tip: '“田”下加“力”成“男”，“了”加一横成“子”。'
  },
  {
    left: { base: '日', add: 1, answer: '电' },
    right: { base: '了', add: 1, answer: '子' },
    word: '电子',
    tip: '“日”下加一竖弯成“电”，“了”加一横成“子”。'
  },
  {
    left: { base: '大', add: 2, answer: '头' },
    right: { base: '了', add: 1, answer: '子' },
    word: '头子',
    tip: '“大”上加两点成“头”，“了”加一横成“子”。'
  },
  {
    left: { base: '口', add: 2, answer: '台' },
    right: { base: '了', add: 1, answer: '子' },
    word: '台子',
    tip: '“口”上加“厶”成“台”，“了”加一横成“子”。'
  },
  {
    left: { base: '人', add: 1, answer: '个' },
    right: { base: '了', add: 1, answer: '子' },
    word: '个子',
    tip: '“人”下加一竖成“个”，“了”加一横成“子”。'
  },
  {
    left: { base: '八', add: 2, answer: '公' },
    right: { base: '了', add: 1, answer: '子' },
    word: '公子',
    tip: '“八”下加“厶”成“公”，“了”加一横成“子”。'
  },
  {
    left: { base: '又', add: 3, answer: '对' },
    right: { base: '了', add: 1, answer: '子' },
    word: '对子',
    tip: '“又”右加“寸”成“对”，“了”加一横成“子”。'
  },
  {
    left: { base: '子', add: 1, answer: '孔' },
    right: { base: '了', add: 1, answer: '子' },
    word: '孔子',
    tip: '“子”加一竖弯成“孔”，“了”加一横成“子”。'
  },
  {
    left: { base: '田', add: 3, answer: '苗' },
    right: { base: '了', add: 1, answer: '子' },
    word: '苗子',
    tip: '“田”上加草头成“苗”，“了”加一横成“子”。'
  },
  {
    left: { base: '又', add: 2, answer: '双' },
    right: { base: '了', add: 1, answer: '子' },
    word: '双子',
    tip: '“又”右加一“又”成“双”，“了”加一横成“子”。'
  },
  {
    left: { base: '大', add: 1, answer: '犬' },
    right: { base: '了', add: 1, answer: '子' },
    word: '犬子',
    tip: '“大”里加一点成“犬”，“了”加一横成“子”。'
  },
  {
    left: { base: '口', add: 2, answer: '石' },
    right: { base: '大', add: 2, answer: '头' },
    word: '石头',
    tip: '“口”上加一“厂”成“石”，“大”上加两点成“头”。'
  },
  {
    left: { base: '十', add: 2, answer: '木' },
    right: { base: '大', add: 2, answer: '头' },
    word: '木头',
    tip: '“十”加一撇一捺成“木”，“大”上加两点成“头”。'
  },
  {
    left: { base: '口', add: 1, answer: '日' },
    right: { base: '大', add: 2, answer: '头' },
    word: '日头',
    tip: '“口”中加一横成“日”，“大”上加两点成“头”。'
  },
  {
    left: { base: '日', add: 1, answer: '白' },
    right: { base: '大', add: 2, answer: '头' },
    word: '白头',
    tip: '“日”上加一撇成“白”，“大”上加两点成“头”。'
  },
  {
    left: { base: '二', add: 1, answer: '工' },
    right: { base: '大', add: 2, answer: '头' },
    word: '工头',
    tip: '“二”加一竖成“工”，“大”上加两点成“头”。'
  },
  {
    left: { base: '人', add: 1, answer: '个' },
    right: { base: '大', add: 2, answer: '头' },
    word: '个头',
    tip: '“人”下加一竖成“个”，“大”上加两点成“头”。'
  },
  {
    left: { base: '口', add: 2, answer: '田' },
    right: { base: '大', add: 2, answer: '头' },
    word: '田头',
    tip: '“口”中加一“十”成“田”，“大”上加两点成“头”。'
  },
  {
    left: { base: '大', add: 2, answer: '头' },
    right: { base: '日', add: 1, answer: '目' },
    word: '头目',
    tip: '“大”上加两点成“头”，“日”中加一横成“目”。'
  },
  {
    left: { base: '口', add: 3, answer: '吉' },
    right: { base: '口', add: 1, answer: '日' },
    word: '吉日',
    tip: '“口”上加“士”成“吉”，“口”中加一横成“日”。'
  },
  {
    left: { base: '木', add: 1, answer: '末' },
    right: { base: '口', add: 1, answer: '日' },
    word: '末日',
    tip: '“木”上加一横成“末”，“口”中加一横成“日”。'
  },
  {
    left: { base: '口', add: 3, answer: '名' },
    right: { base: '子', add: 3, answer: '字' },
    word: '名字',
    tip: '“口”上加“夕”成“名”，“子”上加宝盖成“字”。'
  },
  {
    left: { base: '一', add: 1, answer: '十' },
    right: { base: '子', add: 3, answer: '字' },
    word: '十字',
    tip: '“一”加一竖成“十”，“子”上加宝盖成“字”。'
  },
  {
    left: { base: '王', add: 1, answer: '玉' },
    right: { base: '口', add: 2, answer: '石' },
    word: '玉石',
    tip: '“王”加一点成“玉”，“口”上加一“厂”成“石”。'
  },
  {
    left: { base: '日', add: 1, answer: '白' },
    right: { base: '王', add: 1, answer: '玉' },
    word: '白玉',
    tip: '“日”上加一撇成“白”，“王”加一点成“玉”。'
  },
  {
    left: { base: '口', add: 2, answer: '古' },
    right: { base: '王', add: 1, answer: '玉' },
    word: '古玉',
    tip: '“口”上加一“十”成“古”，“王”加一点成“玉”。'
  },
  {
    left: { base: '日', add: 1, answer: '白' },
    right: { base: '二', add: 2, answer: '云' },
    word: '白云',
    tip: '“日”上加一撇成“白”，“二”下加“厶”成“云”。'
  },
  {
    left: { base: '大', add: 1, answer: '天' },
    right: { base: '了', add: 1, answer: '子' },
    word: '天子',
    tip: '“大”上加一横成“天”，“了”加一横成“子”。'
  },
  {
    left: { base: '大', add: 1, answer: '天' },
    right: { base: '三', add: 1, answer: '王' },
    word: '天王',
    tip: '“大”上加一横成“天”，“三”加一竖成“王”。'
  },
  {
    left: { base: '八', add: 2, answer: '公' },
    right: { base: '王', add: 1, answer: '主' },
    word: '公主',
    tip: '“八”下加“厶”成“公”，“王”上加一点成“主”。'
  },
  {
    left: { base: '人', add: 1, answer: '大' },
    right: { base: '厂', add: 2, answer: '厅' },
    word: '大厅',
    tip: '“人”上加一横成“大”，“厂”里加“丁”成“厅”。'
  },
  {
    left: { base: '口', add: 1, answer: '日' },
    right: { base: '厂', add: 2, answer: '历' },
    word: '日历',
    tip: '“口”中加一横成“日”，“厂”里加“力”成“历”。'
  },
  {
    left: { base: '门', add: 2, answer: '闪' },
    right: { base: '日', add: 1, answer: '电' },
    word: '闪电',
    tip: '“门”里加“人”成“闪”，“日”下加一竖弯成“电”。'
  },
  {
    left: { base: '十', add: 2, answer: '木' },
    right: { base: '二', add: 1, answer: '工' },
    word: '木工',
    tip: '“十”加一撇一捺成“木”，“二”加一竖成“工”。'
  },
  {
    left: { base: '日', add: 1, answer: '电' },
    right: { base: '二', add: 1, answer: '工' },
    word: '电工',
    tip: '“日”下加一竖弯成“电”，“二”加一竖成“工”。'
  },
  {
    left: { base: '日', add: 1, answer: '电' },
    right: { base: '口', add: 2, answer: '台' },
    word: '电台',
    tip: '“日”下加一竖弯成“电”，“口”上加“厶”成“台”。'
  },
  {
    left: { base: '二', add: 2, answer: '元' },
    right: { base: '日', add: 1, answer: '旦' },
    word: '元旦',
    tip: '“二”下加“儿”成“元”，“日”下加一横成“旦”。'
  },
  {
    left: { base: '人', add: 2, answer: '火' },
    right: { base: '田', add: 3, answer: '苗' },
    word: '火苗',
    tip: '“人”上加两点成“火”，“田”上加草头成“苗”。'
  },
  {
    left: { base: '口', add: 2, answer: '古' },
    right: { base: '十', add: 2, answer: '木' },
    word: '古木',
    tip: '“口”上加一“十”成“古”，“十”加一撇一捺成“木”。'
  }
];

module.exports = { puzzles };
