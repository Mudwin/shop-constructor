import Sidebar from './Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

interface LayoutProps {
  type: 'onboard' | 'dashboard' | 'profile';
}

export default function Layout({ type }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar type={type} />

      {/* временно */}

      {type === 'onboard' ? (
        <main className={styles.main}>
          <Outlet />
        </main>
      ) : (
        <main className={styles.main} style={{ alignItems: 'center' }}>
          <Outlet />
        </main>
      )}
    </div>
  );
}
