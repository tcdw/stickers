import type { ImgHTMLAttributes } from "react";
import { Toaster } from "sonner";

import Navigation from "./Navigation";
import StickerCardButton from "./StickerCardButton";

type OptimizedImage = {
  src: string;
  srcSet?: string;
  attributes?: Record<string, unknown>;
  alt?: string;
};

type StickerItem = {
  id: string;
  file: string;
  emoji: string[];
  alt: string;
  tags: string[];
  copySrc: string;
  image: OptimizedImage;
};

interface Props {
  banner: OptimizedImage & { alt: string };
  stickers: StickerItem[];
}

function buildImageProps(image: OptimizedImage, alt: string, className: string): ImgHTMLAttributes<HTMLImageElement> {
  const attributes = image.attributes ?? {};
  const {
    class: _class,
    className: _className,
    src: _src,
    srcset,
    srcSet: _srcSet,
    alt: _alt,
    ...rest
  } = attributes as Record<string, unknown>;
  const resolvedSrcSet = (image.srcSet ?? _srcSet ?? srcset) as string | undefined;

  const props: ImgHTMLAttributes<HTMLImageElement> = {
    ...(rest as ImgHTMLAttributes<HTMLImageElement>),
    src: image.src,
    alt,
    className,
  };

  if (resolvedSrcSet) {
    props.srcSet = resolvedSrcSet;
  }

  return props;
}

export default function StickerPage({ banner, stickers }: Props) {
  const bannerProps = buildImageProps(
    banner,
    banner.alt,
    "w-[calc(100lvw-8rem)] max-w-84 h-auto relative bottom-0 -right-1/2 transform-[translate(-50%,calc(163/2991*100%))] md:absolute md:right-16 md:transform-[translate(0,calc(163/2991*100%))] lg:max-w-112",
  );

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
      <Navigation />
      <header>
        <div className="container sm:px-6 lg:px-8 pb-8 sm:pb-10 md:pb-12">
          <div
            id="navBackground"
            className="md:h-128 relative flex flex-col justify-center sm:justify-end bg-muted sm:rounded-b-3xl md:rounded-b-4xl banner"
          >
            <div className="flex flex-col items-center py-16 mt-22 md:ps-12 md:pb-12 md:items-start md:mt-0">
              <h1 className="text-4xl text-foreground sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">雪乃碗的贴纸</h1>
              <p className="text-lg text-muted-foreground">点击复制，随处贴贴</p>
            </div>
            <img {...bannerProps} />
          </div>
        </div>
      </header>
      <div className="container px-4 sm:px-6 lg:px-8">
        <main>
          <section aria-label="贴纸列表">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" id="sticker-grid">
              {stickers.map(sticker => {
                const stickerImageProps = buildImageProps(
                  sticker.image,
                  sticker.alt,
                  "max-w-full max-h-full object-contain",
                );

                return (
                  <StickerCardButton
                    key={sticker.id}
                    id={sticker.id}
                    imageUrl={sticker.copySrc}
                    filename={sticker.file}
                    alt={sticker.alt}
                    emoji={sticker.emoji}
                    label={`复制 ${sticker.alt}`}
                  >
                    <img {...stickerImageProps} />
                  </StickerCardButton>
                );
              })}
            </div>
          </section>
        </main>
      </div>
      <footer className="py-8 mt-8 bg-muted">
        <div className="container px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} tcdw. Made with ❤️ for Yukino Wan.</p>
            <p>在本站出现的插画图案均借助生成式 AI 技术生成</p>
          </div>
        </div>
      </footer>
    </>
  );
}
