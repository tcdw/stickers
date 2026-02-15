#!/usr/bin/env bun
/**
 * 下载 Twemoji SVG 到本地 public/twemoji
 *
 * 用法:
 *   bun run scripts/fetch-twemoji.ts
 *   bun run scripts/fetch-twemoji.ts --force
 *
 * 环境变量:
 *   TWEMOJI_VERSION=17.0.2 (默认)
 *   TWEMOJI_BASE_URL=https://cdn.jsdelivr.net/gh/jdecked/twemoji@17.0.2/assets/svg
 */

import { promises as fs } from "node:fs";
import { join } from "node:path";
import { stickers } from "../src/data/stickers-generated.ts";
import { emojiToCodePoint } from "../src/utils/twemoji.ts";

const TWEMOJI_VERSION = process.env.TWEMOJI_VERSION ?? "17.0.2";
const TWEMOJI_BASE_URL =
  process.env.TWEMOJI_BASE_URL ?? `https://cdn.jsdelivr.net/gh/jdecked/twemoji@${TWEMOJI_VERSION}/assets/svg`;
const OUTPUT_DIR = join(process.cwd(), "public", "twemoji");
const force = process.argv.includes("--force");

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function fetchTwemojiSvg(codePoint: string, outputPath: string): Promise<boolean> {
  const response = await fetch(`${TWEMOJI_BASE_URL}/${codePoint}.svg`);
  if (!response.ok) {
    console.warn(`✗ 未找到: ${codePoint} (${response.status})`);
    return false;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, buffer);
  return true;
}

async function main() {
  const emojiSet = new Set<string>();
  for (const sticker of stickers) {
    for (const item of sticker.emoji) {
      if (item.trim()) {
        emojiSet.add(item);
      }
    }
  }

  const emojiList = Array.from(emojiSet).sort();
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const emoji of emojiList) {
    const codePoint = emojiToCodePoint(emoji);
    if (!codePoint) {
      console.warn(`✗ 无法解析: ${emoji}`);
      failed += 1;
      continue;
    }

    const outputPath = join(OUTPUT_DIR, `${codePoint}.svg`);
    if (!force && (await fileExists(outputPath))) {
      skipped += 1;
      continue;
    }

    const ok = await fetchTwemojiSvg(codePoint, outputPath);
    if (ok) {
      downloaded += 1;
    } else {
      failed += 1;
    }
  }

  console.log(`完成: 下载 ${downloaded} 个, 跳过 ${skipped} 个, 失败 ${failed} 个`);
  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
