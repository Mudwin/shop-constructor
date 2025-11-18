import styles from './AuthHeader.module.css';

export default function AuthorizationHeader({ children }: { children: React.ReactNode }) {
  return <h1 className={styles.header}>{children}</h1>;
}
