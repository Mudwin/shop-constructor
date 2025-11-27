import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
