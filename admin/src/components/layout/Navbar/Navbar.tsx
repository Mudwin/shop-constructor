import styles from './Navbar.module.css';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { id: 'dashboard', path: '/', label: 'Панель управления' },
  { id: 'orders', path: '/orders', label: 'Заказы' },
  { id: 'products', path: '/products', label: 'Товары' },
  { id: 'clients', path: '/clients', label: 'Клиенты' },
  { id: 'settings', path: '/settings', label: 'Настройки' },
  { id: 'administrators', path: '/administrators', label: 'Администраторы' },
  { id: 'constructor', path: '/constructor', label: 'Конструктор' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Logo</div>
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li className={styles.item}>
            <Link
              className={`${styles.link} ${location.pathname === item.path ? styles.active : ''}`}
              key={item.id}
              to={item.path}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
