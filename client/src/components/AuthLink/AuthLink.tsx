import styles from './AuthLink.module.css';
import Link from 'next/link';

interface AuthLinkProps {
  children: React.ReactNode;
  href: string;
}

export default function AuthLink({ children, href }: AuthLinkProps) {
  return (
    <Link className={styles.link} href={href}>
      {children}
    </Link>
  );
}
