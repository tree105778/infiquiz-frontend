import { createContext } from 'react';

// The single seam shared between the `next/navigation` mock (the consumer,
// via `usePathname`) and `preview.tsx` (the provider). BOTH must import this
// exact module so they resolve to one context instance — otherwise the
// Provider in preview never reaches the hook and `usePathname` always returns
// the default. Canary: NavLink's active underline must react to the
// `nextPathname` story parameter; if it never activates, the instances diverged.
export const PathnameContext = createContext<string>('/');
