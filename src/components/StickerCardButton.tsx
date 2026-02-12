import React, { useEffect, useRef, useState } from "react";

import { copySticker, showCopyFeedback } from "../scripts/copy-sticker";

type CopyStatusLabel = "复制贴纸" | "复制中..." | "复制成功了喵" | "已处理";

interface StickerCardButtonProps {
  id: string;
  imageUrl: string;
  filename: string;
  alt: string;
  emoji: string[];
  label: string;
  children: React.ReactNode;
}

export default function StickerCardButton({
  id,
  imageUrl,
  filename,
  alt,
  emoji,
  label,
  children,
}: StickerCardButtonProps) {
  const [isCopying, setIsCopying] = useState(false);
  const [statusLabel, setStatusLabel] = useState<CopyStatusLabel>("复制贴纸");
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
    setStatusLabel("复制中...");

    try {
      const result = await copySticker(imageUrl, filename);
      showCopyFeedback(result.message);
      setStatusLabel(result.method === "image" ? "复制成功了喵" : "已处理");

      resetTimerRef.current = window.setTimeout(() => {
        setStatusLabel("复制贴纸");
        resetTimerRef.current = null;
      }, 2000);
    } catch (error) {
      showCopyFeedback("操作失败，请重试");
      setStatusLabel("复制贴纸");
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="relative group" data-sticker-wrapper>
      <button
        type="button"
        className="relative z-10 w-full bg-white p-4 md:p-6 flex flex-col items-center text-center transition-transform duration-150 group-hover:-translate-x-2.5 group-hover:-translate-y-2.5 rounded-2xl md:rounded-3xl cursor-pointer disabled:cursor-wait disabled:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
        onClick={handleClick}
        disabled={isCopying}
        aria-label={label}
        data-sticker-id={id}
      >
        <span className="block w-full aspect-square flex items-center justify-center mb-4">
          {children}
        </span>
        <span className="block text-2xl mb-2" aria-hidden="true">
          {emoji.join(" ")}
        </span>
        <span className="block text-sm opacity-60 mb-3">{alt}</span>
        <span className="block text-xs font-semibold uppercase tracking-wide opacity-60">
          {statusLabel}
        </span>
      </button>
      <div
        className="left-0 top-0 bg-primary-400 p-4 md:p-6 flex flex-col items-center rounded-2xl md:rounded-3xl absolute w-full h-full invisible"
        data-sticker-shadow
        aria-hidden="true"
      />
    </div>
  );
}
