import React, { useEffect, useRef, useState } from "react";

import { copySticker, showCopyFeedback } from "../scripts/copy-sticker";

type CopyResultLabel = "复制贴纸" | "复制中..." | "复制成功了喵" | "已处理";

interface CopyStickerButtonProps {
  imageUrl: string;
  filename: string;
  label: string;
  className?: string;
}

const baseClassName =
  "w-full py-2.5 bg-primary text-primary-text font-semibold text-sm rounded-md cursor-pointer transition-colors duration-200 hover:bg-accent-500 active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-wait";

export default function CopyStickerButton({ imageUrl, filename, label, className }: CopyStickerButtonProps) {
  const [isCopying, setIsCopying] = useState(false);
  const [buttonText, setButtonText] = useState<CopyResultLabel>("复制贴纸");
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleClick = async () => {
    if (isCopying) return;

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    setIsCopying(true);
    setButtonText("复制中...");

    try {
      const result = await copySticker(imageUrl, filename);
      showCopyFeedback(result.message);
      setButtonText(result.method === "image" ? "复制成功了喵" : "已处理");

      resetTimerRef.current = window.setTimeout(() => {
        setButtonText("复制贴纸");
        resetTimerRef.current = null;
      }, 2000);
    } catch (error) {
      showCopyFeedback("操作失败，请重试");
      setButtonText("复制贴纸");
    } finally {
      setIsCopying(false);
    }
  };

  const mergedClassName = className ? `${baseClassName} ${className}` : baseClassName;

  return (
    <button type="button" className={mergedClassName} onClick={handleClick} disabled={isCopying} aria-label={label}>
      {buttonText}
    </button>
  );
}
