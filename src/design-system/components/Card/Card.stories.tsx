import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const sampleContent = (
  <div style={{ padding: 24, maxWidth: 280 }}>
    <p
      style={{
        margin: 0,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
        opacity: 0.6,
      }}
    >
      오늘의 퀴즈
    </p>
    <h3 style={{ margin: '8px 0 6px', fontSize: 18, fontWeight: 700 }}>
      자바스크립트 기초 10문제
    </h3>
    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, opacity: 0.75 }}>
      클로저, 호이스팅, 이벤트 루프까지. 5분 안에 실력을 점검해 보세요.
    </p>
  </div>
);

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    variant: 'surface',
    interactive: false,
    children: sampleContent,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['surface', 'cream', 'soft', 'dark'],
    },
    interactive: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Card {...args} variant="surface">
        {sampleContent}
      </Card>
      <Card {...args} variant="cream">
        {sampleContent}
      </Card>
      <Card {...args} variant="soft">
        {sampleContent}
      </Card>
      <Card {...args} variant="dark">
        {sampleContent}
      </Card>
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const Interactive: Story = {
  args: { interactive: true },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Card {...args} variant="surface">
        {sampleContent}
      </Card>
      <Card {...args} variant="cream">
        {sampleContent}
      </Card>
      <Card {...args} variant="soft">
        {sampleContent}
      </Card>
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const Dark: Story = {
  args: { variant: 'dark' },
  globals: { backgrounds: { value: 'brandDark' } },
};
