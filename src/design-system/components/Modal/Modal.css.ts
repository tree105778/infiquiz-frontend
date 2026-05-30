import { style } from '@vanilla-extract/css';
import { fadeIn, modalIn } from '@/design-system/styles';
import { vars } from '@/design-system/tokens';

/**
 * 네이티브 <dialog>. showModal()로 열면 top layer에 올라가 포커스를 가두고 배경을
 * inert로 만들며 ::backdrop으로 스크림을 그린다. UA 기본 스타일만 리셋하고 가운데
 * 정렬하며, 시각적 요소는 모두 panel에 둔다.
 *
 * padding: 0은 중요하다: 백드롭 클릭 판정이 event.target === dialogEl을 비교하는데,
 * dialog 자체에 padding이 있으면 그 패딩 클릭이 백드롭 클릭으로 읽힌다. 모든 padding은
 * panel에 둔다.
 */
export const dialog = style({
  border: 'none',
  padding: 0,
  margin: 'auto',
  maxWidth: 'none',
  maxHeight: 'none',
  background: 'transparent',
  color: vars.color.ink,
  animation: `${modalIn} 240ms ${vars.motion.easeOut}`,
  selectors: {
    '&::backdrop': {
      background: vars.color.scrim,
      animation: `${fadeIn} 200ms ${vars.motion.easeOut}`,
    },
  },
});

/** 다이얼로그 안의 보이는 표면. 자식을 gap으로 세로 정렬한다. */
export const panel = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  background: vars.color.canvas,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.level2,
  padding: vars.space.xxl,
  maxHeight: '85dvh',
  overflowY: 'auto',
});

/** 액션 버튼 행. 본문과 간격을 두고 오른쪽 정렬한다. */
export const footer = style({
  display: 'flex',
  gap: vars.space.md,
  justifyContent: 'flex-end',
  marginTop: vars.space.lg,
});

/** 아이콘 전용 닫기 버튼. 패널 우상단에 고정한다. */
export const closeButton = style({
  position: 'absolute',
  top: vars.space.md,
  right: vars.space.md,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  padding: 0,
  border: 'none',
  borderRadius: vars.radius.pill,
  background: 'transparent',
  color: vars.color.inkMute,
  fontSize: 18,
  lineHeight: 1,
  cursor: 'pointer',
  transition: [
    `background ${vars.motion.durationHover} ${vars.motion.easeOut}`,
    `color ${vars.motion.durationHover} ${vars.motion.easeOut}`,
  ].join(', '),
  selectors: {
    '&:hover': {
      background: vars.color.canvasSoft,
      color: vars.color.ink,
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: vars.shadow.focusRing,
    },
  },
});
