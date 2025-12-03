import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';

interface NavItemProps {
  to: string;
  label: string;
}

export default function NavItem({ to, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
    >
      {label}
    </NavLink>
  );
}
