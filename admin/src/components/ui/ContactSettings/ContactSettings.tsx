import { useState } from 'react';
import Button from '../../../components/ui/Button/Button';
import styles from '../../../pages/dashboard/SettingsPage/SettingsForm.module.css';

interface ContactSettingsProps {
  initialData: {
    email: string;
    phone: string;
    address: string;
  };
  onSave: (data: any) => Promise<void>;
  saveStatus?: 'saving' | 'saved' | 'error';
}

export default function ContactSettings({ initialData, onSave, saveStatus }: ContactSettingsProps) {
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [address, setAddress] = useState(initialData.address || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ email, phone, address });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Контактная информация</h2>
      <p className={styles.subtitle}>Как клиенты могут связаться с вами</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Контактные данные</h3>

          <div className={styles.formGroup}>
            <label htmlFor="contactEmail" className={styles.label}>
              Email для связи *
            </label>
            <input
              id="contactEmail"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@shop.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contactPhone" className={styles.label}>
              Номер телефона *
            </label>
            <input
              id="contactPhone"
              type="tel"
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (999) 123-45-67"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contactAddress" className={styles.label}>
              Физический адрес (опционально)
            </label>
            <textarea
              id="contactAddress"
              className={styles.textarea}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Полный адрес магазина"
              rows={3}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            type="submit"
            color="blue"
            fontSize={14}
            // loading={saveStatus === 'saving'}
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? 'Сохранение...' : 'Сохранить контакты'}
          </Button>

          {saveStatus === 'saved' && (
            <span className={styles.successMessage}>✓ Контакты сохранены</span>
          )}

          {saveStatus === 'error' && (
            <span className={styles.errorMessage}>✗ Ошибка сохранения</span>
          )}
        </div>
      </form>
    </div>
  );
}
