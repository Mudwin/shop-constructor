import styles from './AuthTile.module.css';

export default function AuthTile({ children }: { children: React.ReactNode }) {
  return <div className={styles.tile}>{children}</div>;
}
