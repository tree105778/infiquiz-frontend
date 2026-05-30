import type { CSSProperties, HTMLAttributes } from 'react';
import { skeleton } from '@/design-system/components/Skeleton/Skeleton.css';
import { cx } from '@/design-system/utils/cx';

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  radius?: CSSProperties['borderRadius'];
};

export function Skeleton({
  width,
  height,
  radius,
  className,
  style,
  ...rest
}: SkeletonProps) {
  return (
    <div
      className={cx(skeleton, className)}
      style={{ width, height, borderRadius: radius, ...style }}
      {...rest}
    />
  );
}
