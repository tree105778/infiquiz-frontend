import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const meta = {
  title: 'app/Footer',
  component: Footer,
  tags: ['autodocs'],
  // Full width so the centered container and hairline border read correctly.
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
