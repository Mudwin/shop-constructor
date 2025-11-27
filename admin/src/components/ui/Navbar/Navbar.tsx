import styles from './Navbar.module.css';

export default function Navbar({ children }: { children: React.ReactNode }) {
  return <nav className={styles.nav}>{children}</nav>;
}
