import styles from './SettingsSidebar.module.css';

type TabType = 'general' | 'contacts' | 'categories' | 'payment' | 'delivery' | 'social';

interface SettingsSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TABS = [
  { id: 'general', label: 'Общие настройки', icon: '⚙️' },
  { id: 'contacts', label: 'Контакты', icon: '📞' },
  { id: 'categories', label: 'Категории', icon: '📁' },
  { id: 'payment', label: 'Оплата', icon: '💳' },
  { id: 'delivery', label: 'Доставка', icon: '🚚' },
  { id: 'social', label: 'Соцсети', icon: '🌐' },
];

export default function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3 className={styles.sidebarTitle}>Настройки магазина</h3>
        <p className={styles.sidebarSubtitle}>Управление параметрами вашего магазина</p>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {TABS.map((tab) => (
            <li key={tab.id} className={styles.navItem}>
              <button
                className={`${styles.navButton} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => onTabChange(tab.id as TabType)}
              >
                <span className={styles.navIcon}>{tab.icon}</span>
                <span className={styles.navLabel}>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <p className={styles.helpText}>Настройте параметры магазина для корректной работы</p>
      </div>
    </div>
  );
}
