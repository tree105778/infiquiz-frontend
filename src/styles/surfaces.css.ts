import { style } from '@vanilla-extract/css';
import { vars } from '@/design-system/tokens/contract.css';

/**
 * Reusable hover surfaces shared across home/records/quiz pages. Kept in
 * a domain-shared module rather than the design system because each is
 * paired with concrete page layouts (topic card, choice card, etc.).
 */

const hoverLift = {
  transition: [
    `transform ${vars.motion.durationHover} ${vars.motion.easeOut}`,
    `box-shadow ${vars.motion.durationHover} ${vars.motion.easeOut}`,
  ].join(', '),
  selectors: {
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: vars.shadow.level2,
    },
  },
};

export const topicMini = style(hoverLift);
export const topicCard = style(hoverLift);

export const choiceCard = style({
  selectors: {
    '&:hover:not(:disabled)': {
      background: vars.color.canvasSoft,
      boxShadow: vars.shadow.level1,
    },
  },
});

export const topicRow = style({
  selectors: {
    '&:hover': { background: vars.color.canvasSoft },
  },
});

export const activityRow = style({
  selectors: {
    '&:hover': {
      background: vars.color.canvasSoft,
      borderColor: vars.color.hairlineInput,
    },
  },
});
