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
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
