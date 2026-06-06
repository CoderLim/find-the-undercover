// 题库：每题给出左右两个“基础字”和各自要加的笔画数（add ∈ {1,2,3}）。
// 玩家线下作答：给左字加 x 笔、右字加 y 笔，组成一个常用词。
// 字段说明：
//   left/right.base   基础字（题面展示）
//   left/right.add    要加的笔画数
//   left/right.answer 加笔后得到的字（答案）
//   word              组成的词（= left.answer + right.answer）
//   tip               加笔说明，便于核对与讲解
// 注：所有题目均经笔画核对，答案词控制在小学生常用词范围。

const puzzles = [
  {
    left: { base: '日', add: 1, answer: '白' },
    right: { base: '大', add: 1, answer: '天' },
    word: '白天',
    tip: '“日”上加一撇成“白”，“大”上加一横成“天”。'
  },
  {
    left: { base: '大', add: 1, answer: '天' },
    right: { base: '大', add: 1, answer: '天' },
    word: '天天',
    tip: '“大”上加一横成“天”，两边都一样。'
  },
  {
    left: { base: '大', add: 1, answer: '太' },
    right: { base: '大', add: 1, answer: '太' },
    word: '太太',
    tip: '“大”里加一点成“太”，两边都一样。'
  },
  {
    left: { base: '人', add: 1, answer: '大' },
    right: { base: '一', add: 3, answer: '王' },
    word: '大王',
    tip: '“人”上加一横成“大”，“一”加三笔（两横一竖）成“王”。'
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
    left: { base: '二', add: 1, answer: '三' },
    right: { base: '大', add: 1, answer: '天' },
    word: '三天',
    tip: '“二”加一横成“三”，“大”上加一横成“天”。'
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
  }
];

module.exports = { puzzles };
