import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavLink } from './NavLink';

// The active underline is driven by the mocked `usePathname`, fed by the
// `nextPathname` story parameter (see preview.tsx). The Playground below
// doubles as the canary that the mock context is wired to one instance: with
// pathname '/home' and href '/home' the link must render its active underline.
const meta = {
  title: 'app/NavLink',
  component: NavLink,
  tags: ['autodocs'],
  args: {
    href: '/home',
    children: '홈',
  },
  argTypes: {
    href: { control: 'text' },
    children: { control: 'text' },
    matches: { control: false },
  },
  parameters: { nextPathname: '/home' },
} satisfies Meta<typeof NavLink>;

export default meta;

type Story = StoryObj<typeof meta>;

// pathname '/home' === href '/home' → active underline shown.
export const Playground: Story = {};

// pathname '/leaderboard' ≠ href '/home' → inactive.
export const Inactive: Story = {
  parameters: { nextPathname: '/leaderboard' },
};

// The real Header scenario: a row of links with exactly one active for the
// current route (here '/records' → "내 기록").
export const InNav: Story = {
  parameters: { nextPathname: '/records' },
  render: () => (
    <div style={{ display: 'flex', gap: 28 }}>
      <NavLink href="/home" matches={['/home']}>
        홈
      </NavLink>
      <NavLink href="/records" matches={['/records']}>
        내 기록
      </NavLink>
      <NavLink href="/leaderboard" matches={['/leaderboard']}>
        리더보드
      </NavLink>
    </div>
  ),
};
