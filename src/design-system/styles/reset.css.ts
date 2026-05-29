import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../tokens/contract.css';

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('html', {
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textRendering: 'optimizeLegibility',
});

globalStyle('html, body', {
  margin: 0,
  background: vars.color.canvas,
  color: vars.color.ink,
  fontFamily: vars.font.body,
});

globalStyle('body', {
  fontSize: vars.type.bodyMdSize,
  lineHeight: vars.type.bodyMdLh,
  fontWeight: 400,
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('button', {
  fontFamily: 'inherit',
  cursor: 'pointer',
});

globalStyle('*, *::before, *::after', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animationDuration: '0.001ms',
      transitionDuration: '0.001ms',
    },
  },
});
