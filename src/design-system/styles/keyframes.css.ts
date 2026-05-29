import { globalKeyframes, keyframes } from '@vanilla-extract/css';

// Global keyframe — emitted under the literal name `pulseRing` so the
// prototype's inline `animation: "pulseRing ..."` references resolve. Use
// the exported `pulseRing` constant below when authoring new code.
globalKeyframes('pulseRing', {
  '0%, 100%': { boxShadow: '0 0 0 0 rgba(83, 58, 253, 0.4)' },
  '50%': { boxShadow: '0 0 0 8px rgba(83, 58, 253, 0)' },
});

export const fadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(6px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const scaleIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.85)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

export const modalIn = keyframes({
  from: { transform: 'translateY(8px)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
});

export const toastIn = keyframes({
  from: { transform: 'translateY(-8px)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
});

export const shimmer = keyframes({
  '0%': { backgroundPosition: '200% 0' },
  '100%': { backgroundPosition: '-200% 0' },
});

export const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const pulseRing = keyframes({
  '0%, 100%': { boxShadow: '0 0 0 0 rgba(83, 58, 253, 0.4)' },
  '50%': { boxShadow: '0 0 0 8px rgba(83, 58, 253, 0)' },
});
