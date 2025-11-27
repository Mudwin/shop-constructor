import styles from './DashboardNavbar.module.css';
import Navbar from '../../ui/Navbar/Navbar';
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

export default function DashboardNavbar() {
  // const location = useLocation();

  return <Navbar>dashboard navbar</Navbar>;
}
