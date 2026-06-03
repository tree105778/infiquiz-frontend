import type { ImgHTMLAttributes } from 'react';

// Mock of `next/image` for Storybook. Renders a plain <img>; the Next image
// optimizer (`/_next/image?...`) does not exist under the react-vite builder,
// so the optimization-only props are accepted and discarded. `staticDirs`
// serves `/public`, so absolute `src` paths resolve as-is.

type ImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'width' | 'height'
> & {
  src: string | { src: string };
  alt: string;
  width?: number | string;
  height?: number | string;
  // Next-only props — accepted and intentionally discarded:
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  loader?: unknown;
  sizes?: string;
  unoptimized?: boolean;
};

export default function Image({
  src,
  alt,
  width,
  height,
  priority,
  fill,
  quality,
  placeholder,
  blurDataURL,
  loader,
  sizes,
  unoptimized,
  ...rest
}: ImageProps) {
  const resolvedSrc = typeof src === 'string' ? src : src.src;
  return (
    // biome-ignore lint/performance/noImgElement: Storybook mock for next/image; the Next optimizer doesn't exist under the react-vite builder.
    <img src={resolvedSrc} alt={alt} width={width} height={height} {...rest} />
  );
}
