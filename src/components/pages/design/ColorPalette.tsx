import { Toaster } from "sonner";

import { toast } from "../../ui/CustomToast";

type PaletteColor = {
  name: string;
  token: string;
  value: string;
};

type PaletteGroup = {
  title: string;
  description: string;
  colors: PaletteColor[];
};

interface Props {
  palettes: PaletteGroup[];
}

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function getShadeFromName(name: string): string {
  const match = name.match(/\d+$/);
  return match ? match[0] : name;
}

export default function ColorPalette({ palettes }: Props) {
  const handleCopy = async (color: PaletteColor) => {
    try {
      await copyText(color.value);
      toast({
        title: "复制好了w",
        description: `${color.name} · ${color.value}`,
      });
    } catch {
      toast({
        title: "坏了……",
        description: "颜色复制失败了，再点一下试试看",
      });
    }
  };

  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
          },
        }}
      />

      <div className="space-y-8">
        {palettes.map(palette => (
          <section key={palette.title}>
            <h3 className="mb-3 text-sm font-semibold text-foreground">{palette.title}</h3>
            <div className="grid grid-cols-3 gap-x-3 gap-y-2 sm:grid-cols-11 2xl:gap-x-3">
              {palette.colors.map(color => (
                <button
                  key={color.token}
                  type="button"
                  onClick={() => handleCopy(color)}
                  className="group cursor-pointer text-left focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary-400"
                  aria-label={`复制 ${color.name} ${color.value}`}
                >
                  <div
                    className="mb-1.5 h-10 w-full rounded-md ring-1 ring-black/10 ring-inset transition-shadow group-hover:ring-black/25 sm:rounded-lg 2xl:h-12"
                    style={{ backgroundColor: color.value }}
                    aria-hidden="true"
                  />
                  <p className="text-xs font-medium text-foreground">{getShadeFromName(color.name)}</p>
                  <p className="font-mono text-xs text-muted-foreground">{color.value}</p>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
