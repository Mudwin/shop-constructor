import styles from '../styles/auth-layout.module.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles['layout-container']}>{children}</div>;
}
