import type { Decorator, Preview } from '@storybook/react-vite';
// Side-effect imports — order matters:
// 1) contract.css defines the `:root` theme (all `--color-*`, `--space-*`, … vars).
// 2) styles barrel registers @font-face (Pretendard), the CSS reset, and utilities.
import '@/design-system/tokens/contract.css';
import '@/design-system/styles';
import { PathnameContext } from './next-mocks/router-context';

// Provides the value our mocked `next/navigation` `usePathname` reads. Stories
// for route-aware components (e.g. NavLink) set `parameters.nextPathname` to
// exercise the active state. Defaults to '/home', the app's primary route.
const withNextPathname: Decorator = (Story, context) => (
  <PathnameContext.Provider value={context.parameters.nextPathname ?? '/home'}>
    <Story />
  </PathnameContext.Provider>
);

const withTheme: Decorator = (Story) => (
  <div
    style={{
      fontFamily: 'var(--font-body)',
      color: 'var(--color-ink)',
      lineHeight: 1.4,
    }}
  >
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [withNextPathname, withTheme],
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    backgrounds: {
      options: {
        canvas: { name: 'Canvas', value: '#ffffff' },
        canvasSoft: { name: 'Canvas soft', value: '#f6f9fc' },
        brandDark: { name: 'Brand dark', value: '#1c1e54' },
      },
    },
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Colors', 'Typography', 'Spacing'],
          'components',
          'app',
        ],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'canvas' },
  },
};

export default preview;
