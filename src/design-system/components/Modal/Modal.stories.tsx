import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Text } from '../Text';
import {
  Modal,
  ModalClose,
  ModalDescription,
  ModalFooter,
  ModalTitle,
} from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    // children은 Modal 필수 prop이라 기본값 null만 둔다. 각 스토리가 자체
    // 콘텐츠를 렌더링하고 AlwaysOpen이 이를 덮어쓴다.
    children: null,
    open: true,
    width: 480,
  },
  argTypes: {
    open: { control: 'boolean' },
    width: { control: 'number' },
    onClose: { action: 'close' },
    children: { control: false },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const triggerRow = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
  alignItems: 'center',
} as const;

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={triggerRow}>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        {/* 항상 마운트한다(`{open && ...}` 아님): 열린 <dialog>를 언마운트하면
            네이티브 포커스 복원이 생략된다. 닫힌 다이얼로그는 display:none. */}
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <ModalClose />
          <ModalTitle>퀴즈를 시작할까요?</ModalTitle>
          <ModalDescription>
            총 10문항이며, 제한 시간은 5분입니다. 준비되면 시작 버튼을
            눌러주세요.
          </ModalDescription>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setOpen(false)}>시작하기</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

export const ConfirmDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={triggerRow}>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          퀴즈 삭제
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} width={400}>
          <ModalTitle>정말 삭제하시겠어요?</ModalTitle>
          <ModalDescription>
            삭제한 퀴즈와 응시 기록은 복구할 수 없습니다.
          </ModalDescription>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setOpen(false)}>삭제</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

export const QuizResult: Story = {
  // 보이는 <ModalTitle>이 없어, 다이얼로그의 접근성 이름을 aria-label로 제공하는 예시.
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={triggerRow}>
        <Button onClick={() => setOpen(true)}>결과 보기</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-label="퀴즈 결과"
        >
          <ModalClose />
          <Text variant="microCap" tone="primary">
            인피퀴즈 리포트
          </Text>
          <Text as="p" variant="displayMd" tone="ink">
            92점
          </Text>
          <ModalDescription>
            10문항 중 9문항을 맞혔어요. 상위 8%의 성적입니다.
          </ModalDescription>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              닫기
            </Button>
            <Button onClick={() => setOpen(false)}>다시 풀기</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

export const WideWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={triggerRow}>
        <Button onClick={() => setOpen(true)}>넓은 모달 열기</Button>
        <Modal open={open} onClose={() => setOpen(false)} width={680}>
          <ModalClose />
          <ModalTitle variant="headingMd">문항 미리보기</ModalTitle>
          <ModalDescription>
            width 값을 키우면 넓은 레이아웃의 다이얼로그를 만들 수 있습니다.
            표나 긴 문항 본문을 보여줄 때 유용합니다.
          </ModalDescription>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>확인</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

export const AlwaysOpen: Story = {
  // autodocs 문서 페이지에서 제외: 항상 열린 다이얼로그가 문서 블록 위에 겹친다.
  // 사이드바에선 컨트롤을 조정해 보도록 유지한다.
  tags: ['!autodocs'],
  args: {
    children: (
      <>
        <ModalClose />
        <ModalTitle>항상 열려 있는 모달</ModalTitle>
        <ModalDescription>
          이 스토리는 컨트롤(width 등)을 직접 조정해 볼 수 있도록 모달을 열어
          둡니다. 오버레이를 클릭하거나 Esc 키를 누르면 onClose가 호출됩니다.
        </ModalDescription>
      </>
    ),
  },
};
