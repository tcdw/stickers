import { cn } from "../../../utils/cn";

export type StickerType = "all" | "normal" | "hug";

interface FilterOption {
  value: StickerType;
  label: string;
  count: number;
}

interface StickerFilterProps {
  options: FilterOption[];
  value: StickerType;
  onChange: (value: StickerType) => void;
}

export default function StickerFilter({ options, value, onChange }: StickerFilterProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-2 mb-4 md:mb-6 md:gap-3"
      role="radiogroup"
      aria-label="贴纸类型筛选"
    >
      {options.map(option => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors cursor-pointer",
              isActive ? "bg-primary-400 text-white" : "text-muted-foreground hover:bg-gray-200",
            )}
          >
            {option.label}
            <span className={cn("ml-1.5 text-xs", isActive ? "text-white/80" : "text-muted-foreground/60")}>
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
