import { useContext } from 'react';
import { PathnameContext } from './router-context';

// Mock of `next/navigation` for the react-vite Storybook builder, which has no
// Next runtime. Aliased in `.storybook/main.ts`. Only the surface our app
// components actually touch is implemented; the rest are inert stubs so an
// import never crashes a story.

export function usePathname(): string {
  return useContext(PathnameContext);
}

const noop = () => {};

export function useRouter() {
  return {
    push: noop,
    replace: noop,
    back: noop,
    forward: noop,
    refresh: noop,
    prefetch: noop,
  };
}

export function useSearchParams() {
  return new URLSearchParams();
}

export function useParams<T = Record<string, string>>(): T {
  return {} as T;
}

export function useSelectedLayoutSegment(): string | null {
  return null;
}

export function useSelectedLayoutSegments(): string[] {
  return [];
}

export function redirect(): never {
  throw new Error('redirect() is a no-op in Storybook');
}

export function notFound(): never {
  throw new Error('notFound() is a no-op in Storybook');
}
