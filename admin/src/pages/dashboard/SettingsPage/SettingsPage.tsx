import styles from './SettingsPage.module.css';
import PageHeader from '../../../components/ui/PageHeader/PageHeader';

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <PageHeader>Настройки</PageHeader>
    </div>
  );
}
