import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'auto' },
});

const BACKEND = process.env.BACKEND_INTERNAL_URL ?? '';
// Guard: only proxy to a private (.internal/.flycast) or localhost origin, so a
// misconfig can't forward the session cookie to an arbitrary public host.
const BACKEND_OK =
  /^https?:\/\/([a-z0-9-]+\.(internal|flycast)|localhost)(:\d+)?$/i.test(
    BACKEND,
  );

const nextConfig: NextConfig = {
  async rewrites() {
    if (!BACKEND_OK) {
      throw new Error(
        `BACKEND_INTERNAL_URL must be a *.internal/*.flycast/localhost origin, got: "${BACKEND}"`,
      );
    }
    return [{ source: '/api/:path*', destination: `${BACKEND}/api/:path*` }];
  },
};

export default withVanillaExtract(nextConfig);
