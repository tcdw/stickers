/**
 * 贴纸数据文件
 * 
 * 添加新贴纸：
 * 1. 将 PNG 文件放入 public/stickers/ 目录
 * 2. 在此文件中添加新条目
 * 3. 重新构建项目
 */

export interface Sticker {
  /** 唯一标识符 */
  id: string;
  /** 图片文件名（位于 public/stickers/ 下） */
  file: string;
  /** 对应的 Unicode emoji（可多个） */
  emoji: string[];
  /** 替代文字（无障碍） */
  alt: string;
  /** 可选标签，用于未来扩展 */
  tags?: string[];
}

/**
 * 示例贴纸数据
 * 
 * ⚠️ 重要提示：
 * 当前使用的是 .svg 占位图片，方便开发和预览。
 * 部署前请：
 * 1. 将真实 PNG 贴纸放入 public/stickers/
 * 2. 更新下方 file 字段为 .png 扩展名
 * 3. 删除或替换 .svg 占位文件
 */
export const stickers: Sticker[] = [
  {
    id: 'wave',
    file: 'sticker-01.svg',
    emoji: ['👋'],
    alt: '挥手打招呼',
    tags: ['greeting', 'hello'],
  },
  {
    id: 'love',
    file: 'sticker-02.svg',
    emoji: ['❤️', '😍'],
    alt: '爱心与喜爱',
    tags: ['love', 'heart'],
  },
  {
    id: 'laugh',
    file: 'sticker-03.svg',
    emoji: ['😂', '🤣'],
    alt: '大笑',
    tags: ['laugh', 'happy'],
  },
  {
    id: 'cry',
    file: 'sticker-04.svg',
    emoji: ['😭', '😢'],
    alt: '哭泣',
    tags: ['cry', 'sad'],
  },
  {
    id: 'angry',
    file: 'sticker-05.svg',
    emoji: ['😠', '😤'],
    alt: '生气',
    tags: ['angry', 'mad'],
  },
  {
    id: 'sleep',
    file: 'sticker-06.svg',
    emoji: ['😴', '💤'],
    alt: '睡觉',
    tags: ['sleep', 'tired'],
  },
  {
    id: 'think',
    file: 'sticker-07.svg',
    emoji: ['🤔', '💭'],
    alt: '思考',
    tags: ['think', 'wonder'],
  },
  {
    id: 'cool',
    file: 'sticker-08.svg',
    emoji: ['😎', '🕶️'],
    alt: '酷炫',
    tags: ['cool', 'awesome'],
  },
];

/**
 * Telegram 贴纸包链接
 */
export const TELEGRAM_STICKER_URL = 'https://t.me/addstickers/yukinowan';

/**
 * 平台配置
 */
export const platforms = [
  {
    id: 'telegram',
    name: 'Telegram',
    icon: '✈️',
    url: TELEGRAM_STICKER_URL,
    available: true,
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '🎮',
    url: '#',
    available: false,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '💬',
    url: '#',
    available: false,
  },
  {
    id: 'line',
    name: 'LINE',
    icon: '📱',
    url: '#',
    available: false,
  },
] as const;
