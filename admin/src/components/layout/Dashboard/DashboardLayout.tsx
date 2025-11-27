import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout() {
  return (
    <div className={styles.layout}>
      <DashboardNavbar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
