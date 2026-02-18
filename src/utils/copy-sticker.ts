/**
 * 贴纸复制功能
 *
 * 功能：将 PNG 图片复制到剪贴板
 * 浏览器限制：
 * - 需要 HTTPS 或 localhost（安全上下文）
 * - 需要用户交互触发
 * - Clipboard API 写入图片需要浏览器支持
 *
 * Fallback 策略：
 * 1. 优先尝试复制图片 Blob（最理想）
 * 2. 失败则复制图片 URL
 * 3. 最后触发图片下载
 */

export interface CopyResult {
  success: boolean;
  method: "image" | "url" | "download" | "error";
  message: string;
}

/**
 * 检查浏览器是否支持 Clipboard API 写入图片
 */
function canWriteClipboardImage(): boolean {
  if (!navigator.clipboard) return false;
  if (!navigator.clipboard.write) return false;

  // 检查是否为安全上下文
  if (!window.isSecureContext) return false;

  return true;
}

/**
 * 将图片转换为 Blob
 */
async function imageToBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status}`);
  }
  return await response.blob();
}

/**
 * 尝试复制图片到剪贴板
 */
async function tryCopyImage(url: string): Promise<boolean> {
  if (!canWriteClipboardImage()) return false;

  try {
    const blob = await imageToBlob(url);
    const item = new ClipboardItem({ [blob.type]: blob });
    await navigator.clipboard.write([item]);
    return true;
  } catch {
    return false;
  }
}

/**
 * 尝试复制文本到剪贴板
 */
async function tryCopyText(text: string): Promise<boolean> {
  if (!navigator.clipboard) return false;
  if (!window.isSecureContext) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * 触发图片下载
 */
function triggerDownload(url: string, filename: string): void {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 复制贴纸的主函数
 *
 * @param imageUrl 图片 URL
 * @param filename 下载时使用的文件名
 * @returns CopyResult 结果对象
 */
export async function copySticker(imageUrl: string, filename: string): Promise<CopyResult> {
  // 检查安全上下文
  if (!window.isSecureContext) {
    // 非安全上下文，直接触发下载
    triggerDownload(imageUrl, filename);
    return {
      success: true,
      method: "download",
      message: "已触发下载（非安全上下文无法使用剪贴板）",
    };
  }

  // 尝试 1：复制图片
  const imageCopied = await tryCopyImage(imageUrl);
  if (imageCopied) {
    return {
      success: true,
      method: "image",
      message: "图片已复制到剪贴板w",
    };
  }

  // 尝试 2：复制 URL
  const absoluteUrl = new URL(imageUrl, window.location.origin).href;
  const textCopied = await tryCopyText(absoluteUrl);
  if (textCopied) {
    return {
      success: true,
      method: "url",
      message: "图片链接已复制（浏览器不支持复制图片本身）",
    };
  }

  // Fallback：触发下载
  triggerDownload(imageUrl, filename);
  return {
    success: true,
    method: "download",
    message: "已触发下载（剪贴板不可用）",
  };
}
