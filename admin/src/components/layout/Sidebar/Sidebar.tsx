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
        <ProfileBlock from="onboard" />
        <SettingsBlock />
      </Navbar>
    );
  }

  if (type === 'dashboard') {
    return (
      <Navbar>
        <NavItem to="/dashboard" label="Панель управления" />
        <NavItem to="/dashboard/orders" label="Заказы" />
        <NavItem to="/dashboard/products" label="Товары" />
        <NavItem to="/dashboard/customers" label="Клиенты" />
        <NavItem to="/dashboard/settings" label="Настройки" />
        <NavItem to="/dashboard/admins" label="Администраторы" />
        <NavItem to="/dashboard/constructor" label="Конструктор" />
        <ProfileBlock from="dashboard" />
      </Navbar>
    );

    return (
      <Navbar>
        <ProfileBlock from="profile" />
        <SettingsBlock />
      </Navbar>
    );
  }
}
