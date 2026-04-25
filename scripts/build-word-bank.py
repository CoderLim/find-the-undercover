#!/usr/bin/env python3
"""Generate data/word-bank.js with 6 sub-categories (50 pairs each) and a
"大杂烩" category that is the union of all sub-category pairs.

Pinyin is generated with pypinyin (Style.TONE) and then patched with manual
overrides for common neutral-tone words and polyphones that the library
defaults read incorrectly for everyday speech.

Run:
    python3 scripts/build-word-bank.py
"""

from pathlib import Path

from pypinyin import lazy_pinyin, Style


PINYIN_OVERRIDES = {
    # neutral tones (轻声) that pypinyin defaults to the dictionary tone for
    '葡萄': 'pú tao',
    '葡萄干': 'pú tao gān',
    '葡萄柚': 'pú tao yòu',
    '蘑菇': 'mó gu',
    '葫芦': 'hú lu',
    '葫芦娃': 'hú lu wá',
    '葫芦兄弟': 'hú lu xiōng dì',
    '西葫芦': 'xī hú lu',
    '豆腐': 'dòu fu',
    '豆腐脑': 'dòu fu nǎo',
    '玻璃': 'bō li',
    '玻璃鞋': 'bō li xié',
    '玻璃球': 'bō li qiú',
    '扫帚': 'sào zhou',
    '飞天扫帚': 'fēi tiān sào zhou',
    '馄饨': 'hún tun',
    '小夫': 'xiǎo fū',
    '小头爸爸': 'xiǎo tóu bà ba',
    '姑娘': 'gū niang',
    '灰姑娘': 'huī gū niang',
    '耳朵': 'ěr duo',
    '大耳朵图图': 'dà ěr duo tú tú',
    '风筝': 'fēng zheng',
    '放风筝': 'fàng fēng zheng',
    '和尚': 'hé shang',
    '沙和尚': 'shā hé shang',
    '蛐蛐': 'qū qu',
    '石榴': 'shí liu',
    '番石榴': 'fān shí liu',
    # polyphones / specialised readings
    '麻将': 'má jiàng',
    '散打': 'sǎn dǎ',
    '海蜇': 'hǎi zhé',
}


CATEGORIES = [
    (
        'fairy',
        '童话',
        [
            ('白雪公主', '灰姑娘'),
            ('睡美人', '长发公主'),
            ('三只小猪', '七只小羊'),
            ('小红帽', '卖火柴的小女孩'),
            ('美人鱼', '海妖'),
            ('七个小矮人', '七仙女'),
            ('王子', '国王'),
            ('公主', '王后'),
            ('城堡', '皇宫'),
            ('仙女', '精灵'),
            ('巫婆', '魔法师'),
            ('大灰狼', '狐狸'),
            ('阿拉丁', '辛巴达'),
            ('龙', '凤凰'),
            ('独角兽', '飞马'),
            ('巨人', '矮人'),
            ('魔法棒', '神灯'),
            ('玻璃鞋', '水晶球'),
            ('南瓜车', '飞天扫帚'),
            ('魔镜', '魔毯'),
            ('孙悟空', '猪八戒'),
            ('沙和尚', '唐僧'),
            ('牛魔王', '铁扇公主'),
            ('红孩儿', '哪吒'),
            ('二郎神', '托塔天王'),
            ('嫦娥', '织女'),
            ('牛郎', '后羿'),
            ('八仙', '神仙'),
            ('玉兔', '兔八哥'),
            ('葫芦娃', '黑猫警长'),
            ('喜羊羊', '懒羊羊'),
            ('美羊羊', '沸羊羊'),
            ('灰太狼', '红太狼'),
            ('熊大', '熊二'),
            ('蜡笔小新', '大耳朵图图'),
            ('海绵宝宝', '派大星'),
            ('章鱼哥', '蟹老板'),
            ('哆啦A梦', '大雄'),
            ('静香', '王聪明'),
            ('胖虎', '小夫'),
            ('小猪佩奇', '乔治'),
            ('米老鼠', '唐老鸭'),
            ('米妮', '黛西'),
            ('史努比', '加菲猫'),
            ('汤姆', '杰瑞'),
            ('花木兰', '穆桂英'),
            ('圣诞老人', '雪人'),
            ('大头儿子', '小头爸爸'),
            ('蓝精灵', '阿凡提'),
            ('皮卡丘', '杰尼龟'),
        ],
    ),
    (
        'animals',
        '动物',
        [
            ('小猫', '小狗'),
            ('兔子', '仓鼠'),
            ('老虎', '狮子'),
            ('大象', '河马'),
            ('熊猫', '考拉'),
            ('长颈鹿', '斑马'),
            ('猴子', '猩猩'),
            ('金鱼', '锦鲤'),
            ('麻雀', '燕子'),
            ('蚂蚁', '蜜蜂'),
            ('蝴蝶', '蜻蜓'),
            ('鸭子', '大鹅'),
            ('松鼠', '老鼠'),
            ('刺猬', '豪猪'),
            ('狼', '狐狸'),
            ('海豚', '鲸鱼'),
            ('章鱼', '乌贼'),
            ('螃蟹', '龙虾'),
            ('鳄鱼', '蜥蜴'),
            ('青蛙', '蟾蜍'),
            ('公鸡', '母鸡'),
            ('黄牛', '水牛'),
            ('绵羊', '山羊'),
            ('猪', '野猪'),
            ('马', '驴'),
            ('骆驼', '羊驼'),
            ('北极熊', '棕熊'),
            ('海豹', '海狮'),
            ('海龟', '乌龟'),
            ('鸽子', '喜鹊'),
            ('老鹰', '秃鹫'),
            ('猫头鹰', '啄木鸟'),
            ('企鹅', '海鸥'),
            ('火烈鸟', '鸵鸟'),
            ('孔雀', '雉鸡'),
            ('蜘蛛', '蝎子'),
            ('蚊子', '苍蝇'),
            ('蟑螂', '甲虫'),
            ('蝉', '蛐蛐'),
            ('蚕', '毛毛虫'),
            ('蝙蝠', '飞鼠'),
            ('雪豹', '金钱豹'),
            ('蛇', '蚯蚓'),
            ('壁虎', '变色龙'),
            ('梅花鹿', '麋鹿'),
            ('海星', '海葵'),
            ('水母', '海蜇'),
            ('鳗鱼', '黄鳝'),
            ('鲤鱼', '鲫鱼'),
            ('海螺', '田螺'),
        ],
    ),
    (
        'fruits',
        '水果蔬菜',
        [
            ('苹果', '梨'),
            ('香蕉', '橘子'),
            ('葡萄', '樱桃'),
            ('西瓜', '哈密瓜'),
            ('草莓', '蓝莓'),
            ('桃子', '李子'),
            ('柠檬', '橙子'),
            ('菠萝', '榴莲'),
            ('芒果', '木瓜'),
            ('火龙果', '杨桃'),
            ('山竹', '龙眼'),
            ('荔枝', '杨梅'),
            ('石榴', '山楂'),
            ('柚子', '葡萄柚'),
            ('椰子', '牛油果'),
            ('桑葚', '树莓'),
            ('雪梨', '鸭梨'),
            ('红枣', '蜜枣'),
            ('葡萄干', '蔓越莓'),
            ('西梅', '黑布林'),
            ('罗汉果', '无花果'),
            ('柿子', '番石榴'),
            ('土豆', '红薯'),
            ('胡萝卜', '白萝卜'),
            ('西红柿', '茄子'),
            ('黄瓜', '丝瓜'),
            ('白菜', '生菜'),
            ('玉米', '高粱'),
            ('菠菜', '油菜'),
            ('芹菜', '香菜'),
            ('大葱', '大蒜'),
            ('韭菜', '香葱'),
            ('包菜', '大白菜'),
            ('西兰花', '花椰菜'),
            ('苦瓜', '冬瓜'),
            ('南瓜', '西葫芦'),
            ('蘑菇', '木耳'),
            ('香菇', '平菇'),
            ('金针菇', '茶树菇'),
            ('青椒', '红椒'),
            ('莲藕', '山药'),
            ('春笋', '冬笋'),
            ('豆芽', '豆角'),
            ('豌豆', '蚕豆'),
            ('红豆', '绿豆'),
            ('黄豆', '黑豆'),
            ('莴笋', '莴苣'),
            ('茼蒿', '苋菜'),
            ('老姜', '嫩姜'),
            ('樱桃萝卜', '水萝卜'),
        ],
    ),
    (
        'school',
        '学校生活',
        [
            ('铅笔', '钢笔'),
            ('橡皮', '卷笔刀'),
            ('书包', '文具盒'),
            ('黑板', '白板'),
            ('课桌', '椅子'),
            ('尺子', '圆规'),
            ('课本', '字典'),
            ('粉笔', '马克笔'),
            ('作业本', '试卷'),
            ('修正带', '涂改液'),
            ('中性笔', '水彩笔'),
            ('蜡笔', '彩铅'),
            ('油画棒', '水粉'),
            ('草稿纸', '笔记本'),
            ('直尺', '三角板'),
            ('透明胶', '双面胶'),
            ('订书机', '打孔器'),
            ('文件夹', '笔袋'),
            ('自动铅笔', '圆珠笔'),
            ('拼音本', '田字格'),
            ('老师', '同学'),
            ('校长', '教导主任'),
            ('班长', '学习委员'),
            ('课代表', '值日生'),
            ('班主任', '副班主任'),
            ('操场', '教室'),
            ('食堂', '宿舍'),
            ('图书馆', '阅览室'),
            ('实验室', '美术教室'),
            ('升旗台', '主席台'),
            ('体育馆', '礼堂'),
            ('语文', '数学'),
            ('体育', '音乐'),
            ('美术', '书法'),
            ('科学', '自然'),
            ('历史', '地理'),
            ('道德与法治', '思想品德'),
            ('校服', '运动服'),
            ('队徽', '校徽'),
            ('奖状', '奖杯'),
            ('早自习', '晚自习'),
            ('上课', '下课'),
            ('考试', '测验'),
            ('期中考试', '期末考试'),
            ('作业', '复习'),
            ('朗读', '背诵'),
            ('听写', '默写'),
            ('课间操', '升旗仪式'),
            ('班会', '队会'),
            ('三好学生', '优秀干部'),
        ],
    ),
    (
        'food',
        '美食零食',
        [
            ('米饭', '面条'),
            ('饺子', '包子'),
            ('馒头', '花卷'),
            ('烙饼', '大饼'),
            ('馄饨', '抄手'),
            ('炒饭', '炒面'),
            ('拉面', '刀削面'),
            ('牛肉面', '阳春面'),
            ('凉皮', '凉面'),
            ('米线', '粉丝'),
            ('河粉', '米粉'),
            ('汉堡', '披萨'),
            ('三明治', '卷饼'),
            ('意大利面', '通心粉'),
            ('寿司', '饭团'),
            ('乌冬面', '荞麦面'),
            ('牛排', '鸡排'),
            ('薯条', '薯片'),
            ('巧克力', '糖果'),
            ('棒棒糖', '棉花糖'),
            ('饼干', '曲奇'),
            ('蛋卷', '威化饼'),
            ('蛋糕', '面包'),
            ('慕斯', '布丁'),
            ('果冻', '软糖'),
            ('牛轧糖', '太妃糖'),
            ('牛奶糖', '奶片'),
            ('雪饼', '仙贝'),
            ('冰淇淋', '雪糕'),
            ('雪条', '冰棍'),
            ('棒冰', '冰沙'),
            ('牛奶', '豆浆'),
            ('果汁', '汽水'),
            ('可乐', '雪碧'),
            ('蜂蜜水', '柠檬水'),
            ('酸奶', '豆奶'),
            ('椰汁', '杏仁露'),
            ('矿泉水', '纯净水'),
            ('红茶', '绿茶'),
            ('茉莉花茶', '龙井'),
            ('火锅', '烧烤'),
            ('麻辣烫', '串串香'),
            ('红烧肉', '糖醋排骨'),
            ('鱼香肉丝', '宫保鸡丁'),
            ('酸辣土豆丝', '醋溜白菜'),
            ('鸡蛋', '鸭蛋'),
            ('煎蛋', '荷包蛋'),
            ('油条', '麻团'),
            ('豆腐', '豆腐脑'),
            ('月饼', '粽子'),
        ],
    ),
    (
        'sports',
        '运动游戏',
        [
            ('篮球', '足球'),
            ('乒乓球', '羽毛球'),
            ('网球', '排球'),
            ('棒球', '垒球'),
            ('高尔夫球', '台球'),
            ('沙滩排球', '沙滩足球'),
            ('保龄球', '飞镖'),
            ('曲棍球', '冰球'),
            ('跳绳', '踢毽子'),
            ('捉迷藏', '老鹰捉小鸡'),
            ('跳房子', '跳皮筋'),
            ('拍皮球', '玩沙包'),
            ('丢手绢', '丢沙包'),
            ('滚铁环', '抽陀螺'),
            ('放风筝', '叠纸飞机'),
            ('跑步', '慢跑'),
            ('短跑', '接力赛'),
            ('跳高', '跳远'),
            ('标枪', '铅球'),
            ('铁饼', '链球'),
            ('跨栏', '障碍跑'),
            ('游泳', '跳水'),
            ('自由泳', '蛙泳'),
            ('蝶泳', '仰泳'),
            ('冲浪', '帆船'),
            ('滑冰', '滑雪'),
            ('单板滑雪', '双板滑雪'),
            ('速度滑冰', '花样滑冰'),
            ('冰壶', '雪橇'),
            ('自行车', '三轮车'),
            ('滑板', '滑板车'),
            ('轮滑', '直排轮'),
            ('平衡车', '独轮车'),
            ('跆拳道', '空手道'),
            ('柔道', '摔跤'),
            ('散打', '拳击'),
            ('击剑', '棍术'),
            ('瑜伽', '舞蹈'),
            ('体操', '艺术体操'),
            ('蹦床', '蹦极'),
            ('街舞', '民族舞'),
            ('芭蕾舞', '现代舞'),
            ('仰卧起坐', '俯卧撑'),
            ('哑铃', '杠铃'),
            ('象棋', '围棋'),
            ('五子棋', '跳棋'),
            ('国际象棋', '中国象棋'),
            ('飞行棋', '军棋'),
            ('扑克', '麻将'),
            ('斗地主', '升级'),
        ],
    ),
]


def to_pinyin(word: str) -> str:
    """Return tone-marked pinyin for a word, applying overrides where needed."""
    if word in PINYIN_OVERRIDES:
        return PINYIN_OVERRIDES[word]
    return ' '.join(lazy_pinyin(word, style=Style.TONE))


def js_string(s: str) -> str:
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"


def render_pair(common: str, undercover: str, indent: str = '    ') -> str:
    return (
        f"{indent}{{\n"
        f"{indent}  commonWord: {js_string(common)},\n"
        f"{indent}  commonPinyin: {js_string(to_pinyin(common))},\n"
        f"{indent}  undercoverWord: {js_string(undercover)},\n"
        f"{indent}  undercoverPinyin: {js_string(to_pinyin(undercover))},\n"
        f"{indent}}},"
    )


def render_category(cat_id: str, cat_name: str, pairs):
    var_name = cat_id.upper()
    pair_blocks = '\n'.join(render_pair(c, u) for c, u in pairs)
    return (
        f"const {var_name} = {{\n"
        f"  id: {js_string(cat_id)},\n"
        f"  name: {js_string(cat_name)},\n"
        f"  pairs: [\n{pair_blocks}\n  ],\n"
        f"}};\n"
    )


def main() -> None:
    blocks = [render_category(cat_id, cat_name, pairs) for cat_id, cat_name, pairs in CATEGORIES]
    sub_var_list = ', '.join(cat_id.upper() for cat_id, _, _ in CATEGORIES)

    parts = [
        "// Auto-generated by scripts/build-word-bank.py — edit the script and rerun.\n\n",
        '\n'.join(blocks),
        "\n",
        f"const SUB_CATEGORIES = [{sub_var_list}];\n\n",
        "const MIXED = {\n",
        "  id: 'mixed',\n",
        "  name: '大杂烩',\n",
        "  pairs: SUB_CATEGORIES.flatMap((category) => category.pairs),\n",
        "};\n\n",
        "const WORD_BANK = [MIXED, ...SUB_CATEGORIES];\n\n",
        "function getCategorySummaries() {\n",
        "  return WORD_BANK.map(({ id, name, pairs }) => ({\n",
        "    id,\n",
        "    name,\n",
        "    pairCount: pairs.length,\n",
        "  }));\n",
        "}\n\n",
        "function findCategoryById(categoryId) {\n",
        "  return WORD_BANK.find((category) => category.id === categoryId);\n",
        "}\n\n",
        "module.exports = {\n",
        "  WORD_BANK,\n",
        "  findCategoryById,\n",
        "  getCategorySummaries,\n",
        "};\n",
    ]

    output = ''.join(parts)
    target = Path(__file__).resolve().parent.parent / 'data' / 'word-bank.js'
    target.write_text(output)

    total_sub = sum(len(p) for _, _, p in CATEGORIES)
    print(f"wrote {target}")
    print(f"sub categories: {len(CATEGORIES)}")
    for cat_id, cat_name, pairs in CATEGORIES:
        print(f"  {cat_id:8s} {cat_name:6s} {len(pairs):3d} pairs")
    print(f"sub total pairs: {total_sub}")
    print(f"mixed (union):   {total_sub} pairs (computed at runtime)")


if __name__ == '__main__':
    main()
