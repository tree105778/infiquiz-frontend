import Link from 'next/link';
import * as styles from './Footer.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 infiquiz</span>
      <Link href="#" style={{ color: 'inherit' }}>
        이용약관
      </Link>
      <span className={styles.dot}>·</span>
      <Link href="#" style={{ color: 'inherit' }}>
        개인정보처리방침
      </Link>
    </footer>
  );
}
