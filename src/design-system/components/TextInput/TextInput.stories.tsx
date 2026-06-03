import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TextInput } from './TextInput';

const meta = {
  title: 'components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    placeholder: '닉네임을 입력하세요',
    type: 'text',
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search'],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    maxLength: { control: 'number' },
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        maxWidth: 320,
      }}
    >
      <TextInput {...args} placeholder="플레이스홀더" />
      <TextInput {...args} defaultValue="인피퀴즈 마스터" />
      <TextInput {...args} defaultValue="수정할 수 없어요" disabled />
      <TextInput {...args} defaultValue="읽기 전용입니다" readOnly />
    </div>
  ),
};

export const Types: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        maxWidth: 320,
      }}
    >
      <TextInput {...args} type="text" placeholder="이름" />
      <TextInput {...args} type="email" placeholder="you@infiquiz.com" />
      <TextInput {...args} type="password" placeholder="비밀번호" />
      <TextInput {...args} type="number" placeholder="문제 수" />
      <TextInput {...args} type="search" placeholder="퀴즈 검색" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '비활성 상태' },
};

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: '읽기 전용 값' },
};

function ControlledTextInput() {
  const [value, setValue] = useState('인피퀴즈');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        maxWidth: 320,
      }}
    >
      <TextInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="퀴즈 제목을 입력하세요"
        maxLength={20}
      />
      <span style={{ fontSize: 13, color: '#888' }}>
        {value.length}/20 — 현재 값: {value || '(비어 있음)'}
      </span>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledTextInput />,
};
