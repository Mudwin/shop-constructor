import styles from './ContentTile.module.css';

export default function ContentTile({ children }: { children: React.ReactNode }) {
  return <div className={styles.tile}>{children}</div>;
}
