import { createVar, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from '@/design-system/tokens';

export const sizeVar = createVar();
export const avatar = style({
  width: sizeVar,
  height: sizeVar,
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.onPrimary,
  fontWeight: 500,
  fontSize: calc(sizeVar).multiply(0.4).toString(),
  cursor: 'pointer',
  border: `1px solid ${vars.color.hairline}`,
});
