import styles from '../../../pages/dashboard/SettingsPage/SettingsForm.module.css';

export default function PaymentSettings() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Настройки оплаты</h2>
      <p className={styles.subtitle}>Управление способами оплаты в магазине</p>

      <div className={styles.comingSoon}>
        <div className={styles.comingSoonIcon}>💳</div>
        <p className={styles.comingSoonNote}>
          <br />• Банковские карты
          <br />• Электронные кошельки
          <br />• Оплату при получении
          <br />• И другие способы оплаты
        </p>
      </div>
    </div>
  );
}
