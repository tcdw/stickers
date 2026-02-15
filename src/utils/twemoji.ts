export const TWEMOJI_LOCAL_PATH = "/twemoji";
const VARIATION_SELECTOR_16 = 0xfe0f;
const ZERO_WIDTH_JOINER = 0x200d;
const KEYCAP = 0x20e3;

export function emojiToCodePoint(emoji: string): string {
  const codePoints = Array.from(emoji)
    .map(char => char.codePointAt(0))
    .filter((codePoint): codePoint is number => typeof codePoint === "number");

  const hasZwj = codePoints.includes(ZERO_WIDTH_JOINER);
  const hasKeycap = codePoints.includes(KEYCAP);

  const normalized = codePoints.filter(codePoint => {
    if (codePoint !== VARIATION_SELECTOR_16) return true;
    return hasZwj || hasKeycap;
  });

  return normalized.map(codePoint => codePoint.toString(16).toLowerCase()).join("-");
}

export function getTwemojiSrc(emoji: string, basePath = TWEMOJI_LOCAL_PATH): string {
  const codePoint = emojiToCodePoint(emoji);
  return codePoint ? `${basePath}/${codePoint}.svg` : "";
}
