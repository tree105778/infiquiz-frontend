import { resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: [
    '../src/design-system/**/*.stories.@(ts|tsx)',
    '../src/components/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-docs'],
  // Serves /public so Pretendard `url("/fonts/...")` faces resolve.
  staticDirs: ['../public'],
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [vanillaExtractPlugin()],
      resolve: {
        alias: {
          // Explicit alias so both the app code and vanilla-extract's child
          // compile resolve `@/...` to src/ (matches tsconfig paths).
          '@': resolve(process.cwd(), 'src'),
          // The builder is `@storybook/react-vite` (no Next runtime — see the
          // storybook-setup memory for why). App-level components under
          // `src/components` import these Next primitives, so we alias them to
          // lightweight mocks. `usePathname` is driven per-story via the
          // `nextPathname` parameter + the decorator in preview.tsx.
          'next/link': resolve(process.cwd(), '.storybook/next-mocks/link.tsx'),
          'next/image': resolve(
            process.cwd(),
            '.storybook/next-mocks/image.tsx',
          ),
          'next/navigation': resolve(
            process.cwd(),
            '.storybook/next-mocks/navigation.tsx',
          ),
        },
      },
    });
  },
};

export default config;
