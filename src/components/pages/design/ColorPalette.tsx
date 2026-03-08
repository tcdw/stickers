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
          <section key={palette.title} className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-foreground">{palette.title}</h3>
              <p className="text-sm text-muted-foreground">{palette.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {palette.colors.map(color => (
                <button
                  key={color.token}
                  type="button"
                  onClick={() => handleCopy(color)}
                  className="group overflow-hidden rounded-3xl bg-white text-left shadow-lg shadow-black/5 ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary-400"
                  aria-label={`复制 ${color.name} ${color.value}`}
                >
                  <div className="h-28 w-full" style={{ backgroundColor: color.value }} aria-hidden="true" />
                  <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-bold text-foreground">{color.name}</p>
                        <p className="text-sm text-muted-foreground">{color.token}</p>
                      </div>
                      <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 transition-colors group-hover:bg-primary-100">
                        点击复制
                      </span>
                    </div>
                    <p className="font-mono text-sm text-gray-700">{color.value}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
