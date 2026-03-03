/**
 * 贴纸数据文件
 *
 * ⚠️ 此文件由脚本自动生成 (scripts/generate-sticker-metadata.ts)
 * 使用 Gemini Pro 多模态分析生成
 *
 * 如需重新生成，请运行:
 *   export GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"
 *   bun run scripts/generate-sticker-metadata.ts
 */

const HUG_UNIVERSAL_EMOJI = ["🫂", "🥰"];

export interface Sticker {
  /** 唯一标识符 */
  id: string;
  /** 图片文件名（位于 src/assets/stickers/ 下） */
  file: string;
  /** 对应的 Unicode emoji（1-3个） */
  emoji: string[];
  /** 替代文字（无障碍） */
  alt: string;
  /** 标签，用于搜索和分类 */
  tags: string[];
  /** 是否为贴贴贴纸（与其他角色互动） */
  isHug: boolean;
}

export const stickers: Sticker[] = [
  {
    id: "sticker-0",
    file: "0.png",
    emoji: ["🙂", "😊", "✨"],
    alt: "温柔微笑",
    tags: ["微笑", "开心", "可爱"],
    isHug: false,
  },
  {
    id: "sticker-1",
    file: "1.png",
    emoji: ["🤤", "🍴", "😋"],
    alt: "手拿刀叉流口水",
    tags: ["饿了", "开饭", "想吃", "流口水", "吃饭"],
    isHug: false,
  },
  {
    id: "sticker-3",
    file: "3.png",
    emoji: ["😆", "😄", "🤣"],
    alt: "开怀大笑",
    tags: ["开心", "大笑", "哈哈", "YukinoWan"],
    isHug: false,
  },
  {
    id: "sticker-4",
    file: "4.png",
    emoji: ["😂", "🤣", "😆"],
    alt: "笑哭了ww",
    tags: ["笑哭", "爆笑", "哈哈", "好笑"],
    isHug: false,
  },
  {
    id: "sticker-5",
    file: "5.png",
    emoji: ["😜", "😋"],
    alt: "调皮吐舌眨眼",
    tags: ["调皮", "卖萌", "略略略", "眨眼"],
    isHug: false,
  },
  {
    id: "sticker-6",
    file: "6.png",
    emoji: ["🥰", "👋"],
    alt: "乖巧被摸头",
    tags: ["摸头", "乖巧", "摸摸", "夸奖", "安慰"],
    isHug: false,
  },
  {
    id: "sticker-7",
    file: "7.png",
    emoji: ["😈", "😏", "😼"],
    alt: "得意的坏笑",
    tags: ["坏笑", "得意", "计划通", "搞事", "YukinoWan"],
    isHug: false,
  },
  {
    id: "sticker-8",
    file: "8.png",
    emoji: ["😍", "🥰", "❤️"],
    alt: "眼冒爱心",
    tags: ["喜欢", "爱心眼", "心动", "花痴", "love"],
    isHug: false,
  },
  {
    id: "sticker-9",
    file: "9.png",
    emoji: ["🤩", "✨", "😲"],
    alt: "兴奋星星眼",
    tags: ["星星眼", "期待", "哇", "崇拜", "兴奋"],
    isHug: false,
  },
  {
    id: "sticker-10",
    file: "10.png",
    emoji: ["👀", "🫣", "😶"],
    alt: "暗中观察",
    tags: ["暗中观察", "偷看", "盯", "探头", "雪乃碗"],
    isHug: false,
  },
  {
    id: "sticker-11",
    file: "11.png",
    emoji: ["🤭", "🫣", "🫢"],
    alt: "捂嘴偷笑",
    tags: ["捂嘴", "偷笑", "害羞", "可爱"],
    isHug: false,
  },
  {
    id: "sticker-12",
    file: "12.png",
    emoji: ["😱", "😨", "😰"],
    alt: "吓得脸色发青",
    tags: ["危", "惊恐", "完蛋", "害怕", "雪乃碗"],
    isHug: false,
  },
  {
    id: "sticker-13",
    file: "13.png",
    emoji: ["🥺", "😢", "😟"],
    alt: "委屈巴巴",
    tags: ["委屈", "难过", "可怜", "求求"],
    isHug: false,
  },
  {
    id: "sticker-14",
    file: "14.png",
    emoji: ["😛", "😝", "😜"],
    alt: "调皮吐舌头",
    tags: ["调皮", "卖萌", "略略略", "吐舌"],
    isHug: false,
  },
  {
    id: "sticker-15",
    file: "15.png",
    emoji: ["🤔", "😕", "🧐"],
    alt: "托腮思考",
    tags: ["思考", "疑惑", "沉思", "想不通", "YukinoWan"],
    isHug: false,
  },
  {
    id: "sticker-16",
    file: "16.png",
    emoji: ["🤕", "🩹"],
    alt: "受伤包扎",
    tags: ["受伤", "痛", "绷带", "可怜"],
    isHug: false,
  },
  {
    id: "sticker-17",
    file: "17.png",
    emoji: ["😭", "😢"],
    alt: "放声大哭",
    tags: ["大哭", "委屈", "流泪", "难过", "雪乃碗"],
    isHug: false,
  },
  {
    id: "sticker-18",
    file: "18.png",
    emoji: ["😤", "😠", "😡"],
    alt: "气鼓鼓地嘟嘴",
    tags: ["生气", "嘟嘴", "气鼓鼓", "哼"],
    isHug: false,
  },
  {
    id: "sticker-19",
    file: "19.png",
    emoji: ["😵‍💫", "🤯", "🌀"],
    alt: "晕头转向",
    tags: ["晕", "懵逼", "蚊香眼", "宕机", "混乱"],
    isHug: false,
  },
  {
    id: "sticker-20",
    file: "20.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与 Lynn 酱贴贴（令人窒息版）",
    tags: ["抱抱", "贴贴", "窒息", "喜欢", "抓到了"],
    isHug: true,
  },
  {
    id: "sticker-21",
    file: "21.png",
    emoji: ["🧋", "😋", "🥤"],
    alt: "正在喝珍珠奶茶",
    tags: ["奶茶", "好喝", "吨吨吨", "珍珠奶茶", "休息"],
    isHug: false,
  },
  {
    id: "sticker-22",
    file: "22.png",
    emoji: ["🤤", "😪", "😶"],
    alt: "流口水发呆",
    tags: ["流口水", "饿", "馋", "发呆", "睡觉"],
    isHug: false,
  },
  {
    id: "sticker-25",
    file: "25.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与可莉贴贴",
    tags: ["贴贴", "拥抱", "可莉", "原神", "可爱"],
    isHug: true,
  },
  {
    id: "sticker-26",
    file: "26.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与梦梦贴贴",
    tags: ["贴贴", "拥抱", "喜欢", "好耶", "YukinoWan"],
    isHug: true,
  },
  {
    id: "sticker-27",
    file: "27.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与狐店长贴贴",
    tags: ["拥抱", "贴贴", "抱抱", "喜爱", "雪乃碗"],
    isHug: true,
  },
  {
    id: "sticker-28",
    file: "28.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与 Mono 兔贴贴",
    tags: ["贴贴", "抱抱", "喜欢", "亲密", "姐妹"],
    isHug: true,
  },
  {
    id: "sticker-29",
    file: "29.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与 Lynn 酱贴贴",
    tags: ["抱抱", "贴贴", "拥抱", "喜欢", "雪乃碗"],
    isHug: true,
  },
  {
    id: "sticker-30",
    file: "30.png",
    emoji: ["🥵", "🌶️", "🔥"],
    alt: "被辣到喷火",
    tags: ["辣", "spicy", "喷火", "好辣", "雪乃碗"],
    isHug: false,
  },
  {
    id: "sticker-31",
    file: "31.png",
    emoji: ["🤦‍♀️", "😓", "🫣"],
    alt: "无语扶额",
    tags: ["扶额", "无语", "尴尬", "没眼看", "YukinoWan"],
    isHug: false,
  },
  {
    id: "sticker-32",
    file: "32.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与御庭智乃贴贴",
    tags: ["贴贴", "抱抱", "喜欢", "百合", "治愈"],
    isHug: true,
  },
  {
    id: "sticker-33",
    file: "33.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与 aoi 贴贴",
    tags: ["拥抱", "贴贴", "抱抱", "安慰", "喜欢"],
    isHug: true,
  },
  {
    id: "sticker-34",
    file: "34.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与 Canmi 贴贴",
    tags: ["抱抱", "贴贴", "拥抱"],
    isHug: true,
  },
  {
    id: "sticker-35",
    file: "35.png",
    emoji: ["❓", "🤔", "😯"],
    alt: "感到疑惑",
    tags: ["疑惑", "问号", "不懂", "什么", "YukinoWan"],
    isHug: false,
  },
  {
    id: "sticker-36",
    file: "36.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与 Zhixiang 贴贴",
    tags: ["贴贴", "抱抱", "可爱"],
    isHug: true,
  },
  {
    id: "sticker-37",
    file: "37.png",
    emoji: ["💀", "😨", "😰"],
    alt: "面色发青、生无可恋",
    tags: ["绝望", "生无可恋", "眼神死", "阴暗"],
    isHug: false,
  },
  {
    id: "sticker-38",
    file: "38.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与腥味狐罐贴贴",
    tags: ["贴贴", "抱抱", "可爱"],
    isHug: true,
  },
  {
    id: "sticker-39",
    file: "39.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与小睡枕贴贴",
    tags: ["贴贴", "抱抱", "可爱"],
    isHug: true,
  },
  {
    id: "sticker-40",
    file: "40.png",
    emoji: ["❤️", "🥰", "💝"],
    alt: "抱着大红心",
    tags: ["爱心", "喜欢", "感谢", "可爱"],
    isHug: false,
  },
  {
    id: "sticker-41",
    file: "41.png",
    emoji: HUG_UNIVERSAL_EMOJI,
    alt: "与 47 贴贴",
    tags: ["贴贴", "抱抱", "可爱"],
    isHug: true,
  },
];

/**
 * Telegram 贴纸包链接
 */
export const TELEGRAM_STICKER_URL = "https://t.me/addstickers/yukinowan";

/**
 * 平台配置
 */
export const platforms = [
  {
    id: "telegram",
    name: "Telegram",
    icon: "✈️",
    url: TELEGRAM_STICKER_URL,
    available: true,
  },
  {
    id: "discord",
    name: "Discord",
    icon: "🎮",
    url: "#",
    available: false,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "💬",
    url: "#",
    available: false,
  },
  {
    id: "line",
    name: "LINE",
    icon: "📱",
    url: "#",
    available: false,
  },
] as const;
