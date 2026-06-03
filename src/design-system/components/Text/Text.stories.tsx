import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const variantOptions = [
  'displayXxl',
  'displayXl',
  'displayLg',
  'displayMd',
  'headingLg',
  'headingMd',
  'headingSm',
  'bodyLg',
  'bodyMd',
  'bodyTabular',
  'buttonMd',
  'buttonSm',
  'caption',
  'micro',
  'microCap',
] as const;

const toneOptions = [
  'default',
  'ink',
  'inkSecondary',
  'inkMute',
  'onPrimary',
  'primary',
  'ruby',
] as const;

const meta = {
  title: 'components/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children: '인피퀴즈로 매일 5분 퀴즈를 풀어보세요.',
    variant: 'bodyMd',
    tone: 'default',
    tabular: false,
    align: 'left',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variantOptions,
    },
    tone: {
      control: 'select',
      options: toneOptions,
    },
    tabular: { control: 'boolean' },
    align: {
      control: 'inline-radio',
      options: ['left', 'center', 'right'],
    },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {variantOptions.map((variant) => (
        <Text {...args} key={variant} variant={variant}>
          {variant} — InfiQuiz 인피퀴즈
        </Text>
      ))}
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const Tones: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {toneOptions.map((tone) => (
        <Text {...args} key={tone} variant="headingSm" tone={tone}>
          {tone}
        </Text>
      ))}
    </div>
  ),
};

export const Alignment: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text {...args} align="left">
        왼쪽 정렬 — Left aligned
      </Text>
      <Text {...args} align="center">
        가운데 정렬 — Center aligned
      </Text>
      <Text {...args} align="right">
        오른쪽 정렬 — Right aligned
      </Text>
    </div>
  ),
  parameters: { layout: 'padded' },
};

export const Tabular: Story = {
  args: { variant: 'bodyTabular', tabular: true, children: '1,234,567' },
};

export const OnDark: Story = {
  args: { tone: 'onPrimary', variant: 'headingMd', children: '온다크 텍스트' },
  globals: { backgrounds: { value: 'brandDark' } },
};

export const AsHeading: Story = {
  args: { as: 'h1', variant: 'displayLg', children: '오늘의 퀴즈' },
  parameters: { layout: 'padded' },
};
