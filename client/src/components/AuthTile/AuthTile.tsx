import styles from './AuthTile.module.css';

export default function AuthTile({ children }: { children: React.ReactNode }) {
  return <form className={styles.tile}>{children}</form>;
}
