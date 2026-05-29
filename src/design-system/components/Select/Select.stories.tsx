import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    disabled: false,
    multiple: false,
    defaultValue: 'easy',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    defaultValue: { control: 'text' },
  },
  render: (args) => (
    <Select {...args}>
      <option value="easy">쉬움</option>
      <option value="normal">보통</option>
      <option value="hard">어려움</option>
    </Select>
  ),
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Difficulty: Story = {
  render: (args) => (
    <Select {...args} defaultValue="normal">
      <option value="easy">쉬움</option>
      <option value="normal">보통</option>
      <option value="hard">어려움</option>
    </Select>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const States: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Select defaultValue="normal">
        <option value="easy">쉬움</option>
        <option value="normal">보통</option>
        <option value="hard">어려움</option>
      </Select>
      <Select disabled defaultValue="hard">
        <option value="easy">쉬움</option>
        <option value="normal">보통</option>
        <option value="hard">어려움</option>
      </Select>
    </div>
  ),
};

function ControlledSelect() {
  const [value, setValue] = useState('5');

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Select value={value} onChange={(event) => setValue(event.target.value)}>
        <option value="5">5 문항</option>
        <option value="10">10 문항</option>
        <option value="20">20 문항</option>
        <option value="30">30 문항</option>
      </Select>
      <span style={{ fontSize: 14 }}>선택한 문항 수: {value}</span>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledSelect />,
};

export const Multiple: Story = {
  args: { multiple: true, defaultValue: undefined },
  render: (args) => (
    <Select {...args} defaultValue={['math', 'science']}>
      <option value="math">수학</option>
      <option value="science">과학</option>
      <option value="history">역사</option>
      <option value="language">언어</option>
    </Select>
  ),
};
