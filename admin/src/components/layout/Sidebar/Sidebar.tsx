import styles from './Sidebar.module.css';
import Navbar from '../../ui/Navbar/Navbar';
import ProfileBlock from '../../ui/ProfileBlock/ProfileBlock';
import SettingsBlock from '../../ui/SettingsBlock/SettingsBlock';
import NavItem from '../../ui/NavItem/NavItem';

interface SidebarProps {
  type: 'onboard' | 'dashboard' | 'profile';
}

export default function Sidebar({ type }: SidebarProps) {
  if (type === 'onboard') {
    return (
      <Navbar>
        <div className={styles.onboardSidebar}>
          <ProfileBlock from="onboard" />
          <SettingsBlock />
        </div>
      </Navbar>
    );
  }

  if (type === 'dashboard') {
    return (
      <Navbar>
        <div className={styles.dashboardSidebar}>
          <div className={styles.navItems}>
            <NavItem to="/dashboard" label="Панель управления" end={true} />
            <NavItem to="/dashboard/orders" label="Заказы" />
            <NavItem to="/dashboard/products" label="Товары" />
            <NavItem to="/dashboard/customers" label="Клиенты" />
            <NavItem to="/dashboard/settings" label="Настройки" />
            <NavItem to="/dashboard/admins" label="Администраторы" />
            <NavItem to="/dashboard/constructor" label="Конструктор" />
          </div>
          <ProfileBlock from="dashboard" />
        </div>
      </Navbar>
    );
  }

  return (
    <Navbar>
      <div className={styles.onboardSidebar}>
        <ProfileBlock from="profile" />
        <SettingsBlock />
      </div>
    </Navbar>
  );
}
