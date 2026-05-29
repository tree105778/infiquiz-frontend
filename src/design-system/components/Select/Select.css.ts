import { style } from '@vanilla-extract/css';
import { vars } from '@/design-system/tokens';

const CARET = `url("data:image/svg+xml,%3Csvg viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748d' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`;

export const select = style({
  background: vars.color.canvas,
  border: `1px solid ${vars.color.hairlineInput}`,
  borderRadius: vars.radius.sm,
  fontSize: 14,
  fontWeight: 400,
  color: vars.color.ink,
  appearance: 'none',
  cursor: 'pointer',
  backgroundImage: CARET,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  backgroundSize: 10,
});
