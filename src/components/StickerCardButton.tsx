import React, { useEffect, useRef, useState } from "react";

import { copySticker, showCopyFeedback } from "../utils/copy-sticker";
import { getTwemojiSrc } from "../utils/twemoji";

const shadowHideDelayMs = 200;

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
  const [shadowVisible, setShadowVisible] = useState(false);
  const resetTimerRef = useRef<number | null>(null);
  const shadowTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      if (shadowTimerRef.current !== null) {
        window.clearTimeout(shadowTimerRef.current);
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
    // setStatusLabel("复制中...");

    try {
      const result = await copySticker(imageUrl, filename);
      showCopyFeedback(result.message);
      // setStatusLabel(result.method === "image" ? "复制成功了喵" : "已处理");

      resetTimerRef.current = window.setTimeout(() => {
        // setStatusLabel("复制贴纸");
        resetTimerRef.current = null;
      }, 2000);
    } catch (error) {
      showCopyFeedback("操作失败，请重试");
      // setStatusLabel("复制贴纸");
    } finally {
      setIsCopying(false);
    }
  };

  const handleMouseEnter = () => {
    if (shadowTimerRef.current !== null) {
      window.clearTimeout(shadowTimerRef.current);
      shadowTimerRef.current = null;
    }
    setShadowVisible(true);
  };

  const handleMouseLeave = () => {
    if (shadowTimerRef.current !== null) {
      window.clearTimeout(shadowTimerRef.current);
    }

    shadowTimerRef.current = window.setTimeout(() => {
      setShadowVisible(false);
      shadowTimerRef.current = null;
    }, shadowHideDelayMs);
  };

  const shadowClassName = shadowVisible
    ? "left-0 top-0 bg-primary-300 p-4 md:p-6 flex flex-col items-center rounded-2xl sm:rounded-3xl md:rounded-4xl absolute w-full h-full"
    : "left-0 top-0 bg-primary-300 p-4 md:p-6 flex flex-col items-center rounded-2xl sm:rounded-3xl md:rounded-4xl absolute w-full h-full invisible";

  return (
    <div
      className="relative group"
      data-sticker-wrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="relative z-10 w-full bg-muted p-4 md:p-6 flex flex-col items-center text-center transition-transform duration-200 group-hover:-translate-x-2.5 group-hover:-translate-y-2.5 rounded-2xl sm:rounded-3xl md:rounded-4xl cursor-pointer disabled:cursor-wait disabled:opacity-80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary-400"
        onClick={handleClick}
        disabled={isCopying}
        aria-label={label}
        data-sticker-id={id}
      >
        <span className="block w-full aspect-square items-center justify-center mb-4">{children}</span>
        <span className="block text-2xl mb-2" aria-hidden="true">
          <span className="inline-flex items-center justify-center gap-1">
            {emoji.map((emojiChar, index) => (
              <img
                key={`${emojiChar}-${index}`}
                src={getTwemojiSrc(emojiChar)}
                alt=""
                className="twemoji"
                loading="lazy"
                decoding="async"
              />
            ))}
          </span>
        </span>
        <span className="block text-sm text-muted-foreground">{alt}</span>
      </button>
      <div className={shadowClassName} data-sticker-shadow aria-hidden="true" />
    </div>
  );
}
