#!/usr/bin/env tsx
/**
 * 使用 Gemini Pro 多模态能力自动生成贴纸 Metadata
 *
 * 用法:
 *   export GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"
 *   npx tsx scripts/generate-sticker-metadata.ts
 *
 * 功能:
 *   - 读取 public/stickers/ 下的所有 PNG 文件
 *   - 调用 Gemini Pro 分析图片内容
 *   - 生成 emoji、alt 文本、tags
 *   - 输出到 src/data/stickers-generated.ts
 */

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { promises as fs } from "fs";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Schema for sticker metadata
const StickerSchema = z.object({
  emoji: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe("最适合描述这张贴纸的 1-3 个 Unicode emoji"),
  alt: z
    .string()
    .min(1)
    .max(50)
    .describe("贴纸的中文描述（用于无障碍），简短有力"),
  tags: z
    .array(z.string())
    .min(1)
    .max(5)
    .describe("相关的标签关键词，用于搜索和分类"),
  mood: z
    .enum([
      "happy",
      "sad",
      "angry",
      "surprised",
      "loving",
      "silly",
      "calm",
      "excited",
      "confused",
      "neutral",
    ])
    .describe("贴纸传达的主要情绪"),
});

type StickerMetadata = z.infer<typeof StickerSchema>;

interface StickerData {
  id: string;
  file: string;
  emoji: string[];
  alt: string;
  tags: string[];
  mood: string;
}

const STICKERS_DIR = join(process.cwd(), "public", "stickers");
const OUTPUT_FILE = join(process.cwd(), "src", "data", "stickers-generated.ts");

/**
 * 将图片转为 base64
 */
async function imageToBase64(
  filePath: string,
): Promise<{ base64: string; mimeType: string }> {
  const buffer = await fs.readFile(filePath);
  const ext = extname(filePath).toLowerCase();
  const mimeType =
    ext === ".png"
      ? "image/png"
      : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : "image/png";
  return {
    base64: buffer.toString("base64"),
    mimeType,
  };
}

/**
 * 调用 Gemini Pro 分析图片
 */
async function analyzeSticker(imagePath: string): Promise<StickerMetadata> {
  const { base64, mimeType } = await imageToBase64(imagePath);
  const fileName = basename(imagePath);

  console.log(`  🤖 分析 ${fileName}...`);

  // 使用环境变量 GOOGLE_GENERATIVE_AI_API_KEY
  const model = google("gemini-3-pro-preview");

  const result = await generateObject({
    model,
    schema: StickerSchema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `这是一张原创角色「雪乃碗（ゆきの・わん） / YukinoWan」的 Telegram Sticker 图片，请分析它的内容并生成合适的 metadata。

她的特征可以使用以下 Stable Diffusion 提示词表达：anime style, long white hair in ponytail, thin dark gray scrunchie, ahoge, bright blue eyes, slight blush, orange hoodie, black turtleneck, slim black pants, black boots

要求：
1. emoji: 选择最能表达这张贴纸情感的 1-3 个 Unicode emoji
2. alt: 用简短有力的中文描述这张贴纸（10字以内），用于无障碍访问
3. tags: 提供 3-5 个相关的标签关键词，用于搜索和分类
4. mood: 判断贴纸传达的主要情绪

请确保描述准确、有趣，符合中文网络文化。`,
          },
          {
            type: "image",
            image: `data:${mimeType};base64,${base64}`,
          },
        ],
      },
    ],
  });

  return result.object;
}

/**
 * 生成 sticker ID（从文件名提取）
 */
function generateId(fileName: string): string {
  const base = basename(fileName, extname(fileName));
  // 如果是纯数字，添加前缀
  if (/^\d+$/.test(base)) {
    return `sticker-${base}`;
  }
  return base;
}

/**
 * 主函数
 */
async function main() {
  const apiKey =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error(
      "❌ 错误: 请设置 GOOGLE_GENERATIVE_AI_API_KEY 或 GEMINI_API_KEY 环境变量",
    );
    console.error('   export GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"');
    process.exit(1);
  }

  // 设置环境变量供 SDK 使用
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = apiKey;

  console.log("🔍 扫描贴纸目录...");

  // 读取所有 PNG 文件
  const files = await fs.readdir(STICKERS_DIR);
  const pngFiles = files
    .filter(
      (f) => f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".jpeg"),
    )
    .sort((a, b) => {
      // 数字排序: 0.png, 1.png, 2.png...
      const numA = parseInt(basename(a, extname(a)));
      const numB = parseInt(basename(b, extname(b)));
      return numA - numB;
    });

  console.log(`📦 找到 ${pngFiles.length} 张贴纸`);
  console.log("");

  const stickers: StickerData[] = [];

  for (let i = 0; i < pngFiles.length; i++) {
    const file = pngFiles[i];
    const filePath = join(STICKERS_DIR, file);

    console.log(`[${i + 1}/${pngFiles.length}] 处理 ${file}...`);

    try {
      const metadata = await analyzeSticker(filePath);

      stickers.push({
        id: generateId(file),
        file,
        emoji: metadata.emoji,
        alt: metadata.alt,
        tags: metadata.tags,
        mood: metadata.mood,
      });

      console.log(`   ✅ ${metadata.emoji.join(" ")} ${metadata.alt}`);
      console.log(`   🏷️  ${metadata.tags.join(", ")}`);
      console.log("");

      // 添加延迟避免 rate limit
      if (i < pngFiles.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(
        `   ❌ 处理失败: ${error instanceof Error ? error.message : error}`,
      );
      // 继续处理下一张
    }
  }

  // 生成 TypeScript 文件
  const tsContent = generateTsFile(stickers);
  await fs.writeFile(OUTPUT_FILE, tsContent, "utf-8");

  console.log("✨ 完成!");
  console.log(`   输出: ${OUTPUT_FILE}`);
  console.log(`   成功处理: ${stickers.length}/${pngFiles.length} 张贴纸`);
}

/**
 * 生成 TypeScript 文件内容
 */
function generateTsFile(stickers: StickerData[]): string {
  const stickerObjects = stickers
    .map(
      (s) => `  {
    id: '${s.id}',
    file: '${s.file}',
    emoji: [${s.emoji.map((e) => `'${e}'`).join(", ")}],
    alt: '${s.alt}',
    tags: [${s.tags.map((t) => `'${t}'`).join(", ")}],
  }`,
    )
    .join(",\n");

  return `/**
 * 贴纸数据文件
 * 
 * ⚠️ 此文件由脚本自动生成 (scripts/generate-sticker-metadata.ts)
 * 使用 Gemini Pro 多模态分析生成
 * 
 * 如需重新生成，请运行:
 *   export GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"
 *   npx tsx scripts/generate-sticker-metadata.ts
 */

export interface Sticker {
  /** 唯一标识符 */
  id: string;
  /** 图片文件名（位于 public/stickers/ 下） */
  file: string;
  /** 对应的 Unicode emoji（1-3个） */
  emoji: string[];
  /** 替代文字（无障碍） */
  alt: string;
  /** 标签，用于搜索和分类 */
  tags: string[];
}

export const stickers: Sticker[] = [
${stickerObjects}
];

/**
 * 按情绪分类的贴纸
 */
export const stickersByMood: Record<string, Sticker[]> = {
${generateMoodGroups(stickers)}
};

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
`;
}

/**
 * 生成按情绪分组的代码
 */
function generateMoodGroups(stickers: StickerData[]): string {
  const groups: Record<string, StickerData[]> = {};

  for (const s of stickers) {
    if (!groups[s.mood]) groups[s.mood] = [];
    groups[s.mood].push(s);
  }

  const entries = Object.entries(groups);
  if (entries.length === 0) return "";

  return entries
    .map(
      ([mood, items]) =>
        `  ${mood}: stickers.filter(s => [${items.map((i) => `'${i.id}'`).join(", ")}].includes(s.id)),`,
    )
    .join("\n");
}

// 运行
main().catch(console.error);
