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
          // NOTE: order matters — Vite matches aliases top-to-bottom and the
          // first hit wins. More specific `@/…` entries must precede the broad
          // `@` fallback below, or they get shadowed by it.
          //
          // `@/lib/action` holds a `'use server'` action whose server-only
          // implementation (`next/headers`, `server-only`, `process.env`) the
          // Vite builder would otherwise bundle client-side and crash on
          // (`process is not defined`). Next hands the client a stub at the
          // `'use server'` boundary; we mirror that with a no-op so the
          // AvatarMenu/Header stories load.
          '@/lib/action': resolve(
            process.cwd(),
            '.storybook/app-mocks/action.ts',
          ),
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
