'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  closeButton,
  dialog,
  footer,
  panel,
} from '@/design-system/components/Modal/Modal.css';
import { Text, type TextProps } from '@/design-system/components/Text';
import { cx } from '@/design-system/utils/cx';

// 제목/설명 등록은 다이얼로그가 열리기 전에 끝나야 showModal() 시점에 접근성
// 이름이 존재한다(이미 열린 채로 처음 마운트되는 경우 중요). useLayoutEffect는
// paint 전에 flush하고, 서버에서는 React의 SSR 경고를 피하려 useEffect로 대체한다.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type ModalContextValue = {
  titleId: string;
  descriptionId: string;
  onClose?: () => void;
  setHasTitle: (present: boolean) => void;
  setHasDescription: (present: boolean) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext(component: string): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error(`<${component}> must be rendered inside <Modal>.`);
  }
  return ctx;
}

export type ModalProps = {
  /** 다이얼로그 표시 여부. showModal()/close()를 제어한다. */
  open: boolean;
  /** 닫기 요청 시 호출(Escape·백드롭·<ModalClose>). 생략하면 해당 경로로 닫히지 않는다. */
  onClose?: () => void;
  children: ReactNode;
  /** 최대 콘텐츠 너비(px). min(92vw, width)로 반응형을 유지한다. */
  width?: number;
  className?: string;
  /** 접근성 이름. 가능하면 보이는 <ModalTitle>을 쓰고, 보이는 제목이 없을 때만 사용한다. */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  /** false로 두면 백드롭 클릭으로 닫히지 않는다. */
  dismissOnBackdropClick?: boolean;
};

/**
 * 네이티브 <dialog> 기반 접근성 모달. showModal()로 포커스 가두기·복원, 배경 inert,
 * top layer 렌더링, 네이티브 Escape 처리를 얻는다. controlled(부모가 open 소유)이며
 * 모든 닫기 경로는 onClose로 흐른다. 본문은 ModalTitle/ModalDescription/ModalFooter/
 * ModalClose로 조합하거나, 일반 children에 aria-label/aria-labelledby로 이름을 준다.
 */
export function Modal({
  open,
  onClose,
  children,
  width = 480,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  dismissOnBackdropClick = true,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  // controlled open을 다이얼로그 상태와 동기화. onClose의 불안정한 참조가 잘못된
  // 닫기를 유발하지 않도록 deps는 open만 둔다. 닫기는 cleanup에서 처리되며(open
  // 변경·언마운트 시 호출돼 opener로 포커스 복원), 닫힌 다이얼로그의 close()는
  // 명세상 no-op이라 StrictMode 이중 호출에도 안전하다.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    return () => el.close();
  }, [open]);

  // 닫기 리스너를 JSX prop이 아니라 element에 직접 등록 → controlled 백드롭 클릭이
  // a11y lint를 건드리지 않는다(모달 <dialog>는 Escape→cancel로 이미 키보드 닫기 가능).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleCancel = (event: Event) => {
      event.preventDefault(); // 네이티브 닫기를 막고 controlled 유지
      onClose?.();
    };
    // click의 target은 pointerdown/up target의 공통 조상이라, 패널에서 시작해
    // 백드롭에서 놓는 드래그가 백드롭 클릭으로 오인될 수 있다(반대 방향도 마찬가지).
    // 제스처의 시작과 끝이 모두 다이얼로그일 때만 닫는다.
    let downTarget: EventTarget | null = null;
    const handlePointerDown = (event: Event) => {
      downTarget = event.target;
    };
    const handleClick = (event: MouseEvent) => {
      const onBackdrop = event.target === el && downTarget === el;
      downTarget = null;
      if (dismissOnBackdropClick && onBackdrop) onClose?.();
    };
    el.addEventListener('pointerdown', handlePointerDown);
    el.addEventListener('click', handleClick);
    el.addEventListener('cancel', handleCancel);
    return () => {
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('click', handleClick);
      el.removeEventListener('cancel', handleCancel);
    };
  }, [onClose, dismissOnBackdropClick]);

  const value = useMemo<ModalContextValue>(
    () => ({
      titleId,
      descriptionId,
      onClose,
      setHasTitle,
      setHasDescription,
    }),
    [titleId, descriptionId, onClose],
  );

  // 실제로 마운트된 요소만 가리킨다(dangling ref 방지).
  const labelledBy = ariaLabelledby ?? (hasTitle ? titleId : undefined);
  const describedBy =
    ariaDescribedby ?? (hasDescription ? descriptionId : undefined);
  // ARIA상 aria-labelledby가 aria-label보다 우선하므로, 라벨 요소가 있으면
  // 무시될 aria-label은 떨군다.
  const label = labelledBy ? undefined : ariaLabel;

  return (
    <ModalContext.Provider value={value}>
      <dialog
        ref={ref}
        className={cx(dialog, className)}
        style={{ width: `min(92vw, ${width}px)` }}
        aria-label={label}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
      >
        <div className={panel}>{children}</div>
      </dialog>
    </ModalContext.Provider>
  );
}

export type ModalTitleProps = Omit<TextProps<'h2'>, 'as' | 'id'>;

/** 다이얼로그 제목. <h2>를 렌더링하고 aria-labelledby를 자동 연결한다. Modal당 하나만 사용(중복 id 방지). */
export function ModalTitle({
  variant = 'headingSm',
  tone = 'ink',
  ...rest
}: ModalTitleProps) {
  const { titleId, setHasTitle } = useModalContext('ModalTitle');
  useIsomorphicLayoutEffect(() => {
    setHasTitle(true);
    return () => setHasTitle(false);
  }, [setHasTitle]);
  return <Text as="h2" id={titleId} variant={variant} tone={tone} {...rest} />;
}

export type ModalDescriptionProps = Omit<TextProps<'p'>, 'as' | 'id'>;

/** 보조 설명문. <p>를 렌더링하고 aria-describedby를 자동 연결한다. Modal당 하나만 사용(중복 id 방지). */
export function ModalDescription({
  variant = 'bodyMd',
  tone = 'inkSecondary',
  ...rest
}: ModalDescriptionProps) {
  const { descriptionId, setHasDescription } =
    useModalContext('ModalDescription');
  useIsomorphicLayoutEffect(() => {
    setHasDescription(true);
    return () => setHasDescription(false);
  }, [setHasDescription]);
  return (
    <Text as="p" id={descriptionId} variant={variant} tone={tone} {...rest} />
  );
}

export type ModalFooterProps = {
  children: ReactNode;
  className?: string;
};

/** 오른쪽 정렬 액션 버튼 행. */
export function ModalFooter({ children, className }: ModalFooterProps) {
  return <div className={cx(footer, className)}>{children}</div>;
}

export type ModalCloseProps = {
  className?: string;
  /** 아이콘 버튼의 접근성 라벨. 기본값 "닫기". */
  'aria-label'?: string;
  /** 기본 ✕ 글리프를 교체한다. */
  children?: ReactNode;
};

/** 모달의 onClose에 연결된 아이콘 전용 닫기 버튼. */
export function ModalClose({
  className,
  'aria-label': ariaLabel = '닫기',
  children,
}: ModalCloseProps) {
  const { onClose } = useModalContext('ModalClose');
  return (
    <button
      type="button"
      className={cx(closeButton, className)}
      aria-label={ariaLabel}
      onClick={() => onClose?.()}
    >
      {children ?? <span aria-hidden="true">✕</span>}
    </button>
  );
}
