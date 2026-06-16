import Image from 'next/image';
import Link from 'next/link';
import { AvatarMenu } from '@/components/AvatarMenu';
import {
  header,
  headerTransport,
  inner,
  logoMark,
  nav,
  right,
} from '@/components/Header.css';
import { NavLink } from '@/components/NavLink';
import { navLink } from '@/components/NavLink.css';
import { buttonClass, cx } from '@/design-system';

type HeaderProps = {
  profile?: {
    userId: string;
    displayName: string;
    avatarUrl: string | null;
    bio: string | null;
    createdAt: string;
  };
  transparent?: boolean;
};

const NAV_ITEMS: ReadonlyArray<
  readonly [label: string, href: string, matches: ReadonlyArray<string>]
> = [
  ['홈', '/home', ['/home']],
  ['주제', '/topic', ['/topic']],
  ['내 기록', '/records', ['/records']],
  ['리더보드', '/leaderboard', ['/leaderboard']],
];

export function Header({ profile, transparent }: HeaderProps) {
  const displayName = profile?.displayName ?? '';
  const initial = displayName.slice(0, 1).toUpperCase() || '?';

  return (
    <header className={cx(header, transparent && headerTransport)}>
      <div className={inner}>
        <Link href={profile ? '/home' : '/'} className={logoMark}>
          <Image
            src="/infiquiz-logo.png"
            alt="infiquiz"
            width={36}
            height={36}
            style={{ display: 'block', borderRadius: 8 }}
          />
        </Link>

        {profile ? (
          <>
            <nav className={nav}>
              {NAV_ITEMS.map(([label, href, matches]) => (
                <NavLink key={label} href={href} matches={matches}>
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className={right}>
              <AvatarMenu initial={initial} />
            </div>
          </>
        ) : (
          <>
            <nav className={nav} />
            <div className={right}>
              <Link href="/login" className={navLink}>
                로그인
              </Link>
              <Link
                href="/login"
                className={buttonClass({ variant: 'primary', size: 'md' })}
              >
                시작하기 <span aria-hidden>▶</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
