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
  },
  {
    left: { base: '口', add: 3, answer: '吐' },
    right: { base: '子', add: 3, answer: '字' },
    word: '吐字',
    tip: '“口”右加“土”成“吐”，“子”上加宝盖成“字”。'
  },
  {
    left: { base: '工', add: 2, answer: '巧' },
    right: { base: '口', add: 3, answer: '合' },
    word: '巧合',
    tip: '“工”右加“丂”成“巧”，“口”上加“人”和一横成“合”。'
  },
  {
    left: { base: '弓', add: 1, answer: '引' },
    right: { base: '月', add: 1, answer: '用' },
    word: '引用',
    tip: '“弓”右加一竖成“引”，“月”里加一竖成“用”。'
  },
  {
    left: { base: '弓', add: 1, answer: '引' },
    right: { base: '儿', add: 2, answer: '见' },
    word: '引见',
    tip: '“弓”右加一竖成“引”，“儿”外加上框成“见”。'
  },
  {
    left: { base: '夕', add: 3, answer: '岁' },
    right: { base: '木', add: 1, answer: '末' },
    word: '岁末',
    tip: '“夕”上加“山”成“岁”，“木”上加一横成“末”。'
  },
  {
    left: { base: '口', add: 3, answer: '各' },
    right: { base: '白', add: 1, answer: '自' },
    word: '各自',
    tip: '“口”上加“夂”成“各”，“白”里加一横成“自”。'
  },
  {
    left: { base: '尤', add: 1, answer: '龙' },
    right: { base: '大', add: 2, answer: '头' },
    word: '龙头',
    tip: '“尤”上加一撇成“龙”，“大”上加两点成“头”。'
  },
  {
    left: { base: '日', add: 1, answer: '甲' },
    right: { base: '中', add: 2, answer: '虫' },
    word: '甲虫',
    tip: '“日”中加一竖成“甲”，“中”下加一提一点成“虫”。'
  },
  {
    left: { base: '全', add: 2, answer: '金' },
    right: { base: '巾', add: 1, answer: '币' },
    word: '金币',
    tip: '“全”中加两点成“金”，“巾”上加一撇成“币”。'
  },
  {
    left: { base: '火', add: 3, answer: '灵' },
    right: { base: '舌', add: 3, answer: '活' },
    word: '灵活',
    tip: '“火”上加“彐”成“灵”，“舌”左加三点水成“活”。'
  },
  {
    left: { base: '夫', add: 2, answer: '夹' },
    right: { base: '古', add: 2, answer: '克' },
    word: '夹克',
    tip: '“夫”中加两点成“夹”，“古”下加“儿”成“克”。'
  },
  {
    left: { base: '十', add: 1, answer: '千' },
    right: { base: '古', add: 2, answer: '克' },
    word: '千克',
    tip: '“十”上加一撇成“千”，“古”下加“儿”成“克”。'
  },
  {
    left: { base: '寸', add: 3, answer: '导' },
    right: { base: '日', add: 1, answer: '电' },
    word: '导电',
    tip: '“寸”上加“巳”成“导”，“日”下加一竖弯成“电”。'
  },
  {
    left: { base: '又', add: 3, answer: '对' },
    right: { base: '寸', add: 2, answer: '付' },
    word: '对付',
    tip: '“又”右加“寸”成“对”，“寸”左加单人旁成“付”。'
  },
  {
    left: { base: '大', add: 1, answer: '夫' },
    right: { base: '了', add: 1, answer: '子' },
    word: '夫子',
    tip: '“大”上加一横成“夫”，“了”加一横成“子”。'
  },
  {
    left: { base: '人', add: 2, answer: '从' },
    right: { base: '止', add: 2, answer: '此' },
    word: '从此',
    tip: '“人”旁加一“人”成“从”，“止”右加“匕”成“此”。'
  },
  {
    left: { base: '大', add: 3, answer: '因' },
    right: { base: '止', add: 2, answer: '此' },
    word: '因此',
    tip: '“大”外加大口框成“因”，“止”右加“匕”成“此”。'
  },
  {
    left: { base: '口', add: 2, answer: '召' },
    right: { base: '口', add: 3, answer: '回' },
    word: '召回',
    tip: '“口”上加“刀”成“召”，“口”外加大口框成“回”。'
  },
  {
    left: { base: '口', add: 2, answer: '古' },
    right: { base: '寺', add: 2, answer: '诗' },
    word: '古诗',
    tip: '“口”上加一“十”成“古”，“寺”左加言字旁成“诗”。'
  },
  {
    left: { base: '寺', add: 2, answer: '诗' },
    right: { base: '口', add: 2, answer: '句' },
    word: '诗句',
    tip: '“寺”左加言字旁成“诗”，“口”外加“勹”成“句”。'
  },
  {
    left: { base: '匕', add: 2, answer: '化' },
    right: { base: '女', add: 3, answer: '妆' },
    word: '化妆',
    tip: '“匕”左加单人旁成“化”，“女”左加“丬”成“妆”。'
  },
  {
    left: { base: '寸', add: 3, answer: '寻' },
    right: { base: '戈', add: 3, answer: '找' },
    word: '寻找',
    tip: '“寸”上加“彐”成“寻”，“戈”左加提手旁成“找”。'
  },
  {
    left: { base: '走', add: 3, answer: '赶' },
    right: { base: '工', add: 2, answer: '巧' },
    word: '赶巧',
    tip: '“走”里加“干”成“赶”，“工”右加“丂”成“巧”。'
  },
  {
    left: { base: '人', add: 1, answer: '大' },
    right: { base: '白', add: 2, answer: '伯' },
    word: '大伯',
    tip: '“人”上加一横成“大”，“白”左加单人旁成“伯”。'
  },
  {
    left: { base: '大', add: 1, answer: '文' },
    right: { base: '匕', add: 2, answer: '化' },
    word: '文化',
    tip: '“大”上加一点成“文”，“匕”左加单人旁成“化”。'
  },
  {
    left: { base: '大', add: 1, answer: '文' },
    right: { base: '目', add: 3, answer: '具' },
    word: '文具',
    tip: '“大”上加一点成“文”，“目”下加一横和“八”成“具”。'
  },
  {
    left: { base: '二', add: 2, answer: '元' },
    right: { base: '玉', add: 3, answer: '宝' },
    word: '元宝',
    tip: '“二”下加“儿”成“元”，“玉”上加宝盖成“宝”。'
  },
  {
    left: { base: '八', add: 2, answer: '公' },
    right: { base: '元', add: 3, answer: '园' },
    word: '公园',
    tip: '“八”下加“厶”成“公”，“元”外加大口框成“园”。'
  },
  {
    left: { base: '才', add: 3, answer: '团' },
    right: { base: '员', add: 3, answer: '圆' },
    word: '团圆',
    tip: '“才”外加大口框成“团”，“员”外加大口框成“圆”。'
  },
  {
    left: { base: '元', add: 3, answer: '园' },
    right: { base: '一', add: 1, answer: '丁' },
    word: '园丁',
    tip: '“元”外加大口框成“园”，“一”加竖钩成“丁”。'
  },
  {
    left: { base: '二', add: 1, answer: '工' },
    right: { base: '一', add: 1, answer: '厂' },
    word: '工厂',
    tip: '“二”加一竖成“工”，“一”加一撇成“厂”。'
  },
  {
    left: { base: '玉', add: 3, answer: '国' },
    right: { base: '三', add: 1, answer: '王' },
    word: '国王',
    tip: '“玉”外加大口框成“国”，“三”加一竖成“王”。'
  },
  {
    left: { base: '玉', add: 3, answer: '国' },
    right: { base: '田', add: 3, answer: '画' },
    word: '国画',
    tip: '“玉”外加大口框成“国”，“田”外加一横和下框成“画”。'
  },
  {
    left: { base: '田', add: 3, answer: '画' },
    right: { base: '木', add: 1, answer: '本' },
    word: '画本',
    tip: '“田”外加一横和下框成“画”，“木”下加一横成“本”。'
  },
  {
    left: { base: '田', add: 3, answer: '画' },
    right: { base: '巾', add: 2, answer: '布' },
    word: '画布',
    tip: '“田”外加一横和下框成“画”，“巾”上加一横一撇成“布”。'
  },
  {
    left: { base: '玉', add: 3, answer: '宝' },
    right: { base: '口', add: 2, answer: '石' },
    word: '宝石',
    tip: '“玉”上加宝盖成“宝”，“口”上加一“厂”成“石”。'
  },
  {
    left: { base: '人', add: 2, answer: '火' },
    right: { base: '化', add: 3, answer: '花' },
    word: '火花',
    tip: '“人”上加两点成“火”，“化”上加草头成“花”。'
  },
  {
    left: { base: '化', add: 3, answer: '花' },
    right: { base: '木', add: 2, answer: '朵' },
    word: '花朵',
    tip: '“化”上加草头成“花”，“木”上加“几”成“朵”。'
  },
  {
    left: { base: '化', add: 3, answer: '花' },
    right: { base: '早', add: 3, answer: '草' },
    word: '花草',
    tip: '“化”上加草头成“花”，“早”上加草头成“草”。'
  },
  {
    left: { base: '早', add: 3, answer: '草' },
    right: { base: '十', add: 2, answer: '木' },
    word: '草木',
    tip: '“早”上加草头成“草”，“十”加一撇一捺成“木”。'
  },
  {
    left: { base: '木', add: 3, answer: '杏' },
    right: { base: '了', add: 1, answer: '子' },
    word: '杏子',
    tip: '“木”下加“口”成“杏”，“了”加一横成“子”。'
  },
  {
    left: { base: '木', add: 3, answer: '李' },
    right: { base: '了', add: 1, answer: '子' },
    word: '李子',
    tip: '“木”下加“子”成“李”，“了”加一横成“子”。'
  },
  {
    left: { base: '田', add: 3, answer: '果' },
    right: { base: '十', add: 3, answer: '汁' },
    word: '果汁',
    tip: '“田”下加三笔成“果”，“十”左加三点水成“汁”。'
  },
  {
    left: { base: '田', add: 3, answer: '果' },
    right: { base: '元', add: 3, answer: '园' },
    word: '果园',
    tip: '“田”下加三笔成“果”，“元”外加大口框成“园”。'
  },
  {
    left: { base: '二', add: 2, answer: '云' },
    right: { base: '木', add: 2, answer: '朵' },
    word: '云朵',
    tip: '“二”下加“厶”成“云”，“木”上加“几”成“朵”。'
  },
  {
    left: { base: '口', add: 2, answer: '台' },
    right: { base: '几', add: 2, answer: '风' },
    word: '台风',
    tip: '“口”上加“厶”成“台”，“几”里加一撇一点成“风”。'
  },
  {
    left: { base: '几', add: 2, answer: '风' },
    right: { base: '十', add: 2, answer: '车' },
    word: '风车',
    tip: '“几”里加一撇一点成“风”，“十”上加两笔成“车”。'
  },
  {
    left: { base: '大', add: 1, answer: '天' },
    right: { base: '大', add: 1, answer: '文' },
    word: '天文',
    tip: '“大”上加一横成“天”，“大”上加一点成“文”。'
  },
  {
    left: { base: '大', add: 1, answer: '天' },
    right: { base: '二', add: 2, answer: '井' },
    word: '天井',
    tip: '“大”上加一横成“天”，“二”加两竖成“井”。'
  },
  {
    left: { base: '子', add: 3, answer: '孙' },
    right: { base: '了', add: 1, answer: '子' },
    word: '孙子',
    tip: '“子”右加“小”成“孙”，“了”加一横成“子”。'
  }
];

module.exports = { puzzles };
