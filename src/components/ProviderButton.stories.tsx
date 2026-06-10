import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProviderButton } from './ProviderButton';

const meta = {
  title: 'components/ProviderButton',
  component: ProviderButton,
  tags: ['autodocs'],
  args: {
    provider: 'kakao',
    block: true,
  },
  argTypes: {
    provider: {
      control: 'inline-radio',
      options: ['kakao', 'google', 'naver'],
    },
    block: { control: 'boolean' },
    returnTo: { control: 'text' },
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ProviderButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllProviders: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        maxWidth: 320,
      }}
    >
      <ProviderButton {...args} provider="kakao" />
      <ProviderButton {...args} provider="google" />
      <ProviderButton {...args} provider="naver" />
    </div>
  ),
};
