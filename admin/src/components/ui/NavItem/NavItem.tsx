import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';

interface NavItemProps {
  to: string;
  label: string;
  end?: boolean;
}

export default function NavItem({ to, label, end = false }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
    >
      {label}
    </NavLink>
  );
}
