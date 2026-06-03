import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

// A stand-in profile for the signed-in states. Shape matches the `profile`
// prop the real layout threads in from the session.
const sampleProfile = {
  userId: 'u_demo',
  displayName: '배주연',
  avatarUrl: null,
  bio: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

const meta = {
  title: 'app/Header',
  component: Header,
  tags: ['autodocs'],
  // The header is a sticky, full-bleed bar — render it edge to edge.
  parameters: { layout: 'fullscreen' },
  argTypes: {
    transparent: { control: 'boolean' },
    profile: { control: false },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

// Signed-in: nav links (one active for '/home') plus the account menu.
export const Playground: Story = {
  args: { profile: sampleProfile, transparent: false },
  parameters: { nextPathname: '/home' },
};

// Signed-out: no nav, login + 시작하기 calls to action.
export const LoggedOut: Story = {
  args: { profile: undefined, transparent: false },
};

// Transparent variant used over a colored hero — no background or border.
// Shown on a soft canvas so the absence of the white bar is visible.
export const Transparent: Story = {
  args: { profile: sampleProfile, transparent: true },
  parameters: { nextPathname: '/home' },
  globals: { backgrounds: { value: 'canvasSoft' } },
};
