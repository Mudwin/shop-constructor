import styles from '../../../pages/dashboard/SettingsPage/SettingsForm.module.css';

export default function DeliverySettings() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Настройки доставки</h2>
      <p className={styles.subtitle}>Управление способами доставки товаров</p>

      <div className={styles.comingSoon}>
        <div className={styles.comingSoonIcon}>🚚</div>
        <p className={styles.comingSoonNote}>
          <br />• Самовывоз
          <br />• Курьерскую доставку
          <br />• Почтовые службы
          <br />• Стоимость и сроки доставки
        </p>
      </div>
    </div>
  );
}
