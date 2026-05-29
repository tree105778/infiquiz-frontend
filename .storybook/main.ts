import { resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/design-system/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  // Serves /public so Pretendard `url("/fonts/...")` faces resolve.
  staticDirs: ['../public'],
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [vanillaExtractPlugin()],
      // Explicit alias so both the app code and vanilla-extract's child
      // compile resolve `@/...` to src/ (matches tsconfig paths).
      resolve: {
        alias: { '@': resolve(process.cwd(), 'src') },
      },
    });
  },
};

export default config;
