import { useState } from 'react';
import FormFileInput from '../../../components/ui/FormFileInput/FormFileInput';
import Button from '../../../components/ui/Button/Button';
import styles from '../../../pages/dashboard/SettingsPage/SettingsForm.module.css';
import { fileToBase64, checkBase64Size } from '../../../utils/storage';

interface GeneralSettingsProps {
  initialData: {
    storeName: string;
    storeEmail: string;
    address: string;
    logoBase64: string;
  };
  onSave: (data: any) => Promise<void>;
  saveStatus?: 'saving' | 'saved' | 'error';
}

export default function GeneralSettings({ initialData, onSave, saveStatus }: GeneralSettingsProps) {
  const [storeName, setStoreName] = useState(initialData.storeName);
  const [storeEmail, setStoreEmail] = useState(initialData.storeEmail);
  const [address, setAddress] = useState(initialData.address);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoBase64, setLogoBase64] = useState(initialData.logoBase64);
  const [logoError, setLogoError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!storeName.trim()) {
      alert('Введите название магазина');
      return;
    }

    if (!storeEmail.trim()) {
      alert('Введите email магазина');
      return;
    }

    let finalLogoBase64 = logoBase64;

    if (logoFile) {
      try {
        const base64 = await fileToBase64(logoFile);

        if (!checkBase64Size(base64)) {
          setLogoError('Размер изображения не должен превышать 5MB');
          return;
        }

        finalLogoBase64 = base64;
        setLogoBase64(base64);
      } catch (error) {
        console.error('Ошибка конвертации файла:', error);
        setLogoError('Ошибка загрузки изображения');
        return;
      }
    }

    try {
      await onSave({
        storeName,
        storeEmail,
        address,
        logoBase64: finalLogoBase64,
      });

      setLogoError('');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  const handleLogoChange = (file: File | null) => {
    setLogoFile(file);
    setLogoError('');

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoBase64('');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Общие настройки магазина</h2>
      <p className={styles.subtitle}>Основная информация о вашем магазине</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Логотип магазина</h3>
          <div className={styles.logoSection}>
            <FormFileInput
              id="logo"
              value={logoBase64 || logoFile}
              onChange={handleLogoChange}
              accept="image/*"
            />
            {logoError && <p className={styles.errorText}>{logoError}</p>}
            <p className={styles.helpText}>
              Рекомендуемый размер: 300×100 пикселей. Форматы: JPG, PNG, WebP. Максимум 5MB.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Основная информация</h3>

          <div className={styles.formGroup}>
            <label htmlFor="storeName" className={styles.label}>
              Название магазина *
            </label>
            <input
              id="storeName"
              type="text"
              className={styles.input}
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Введите название магазина"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="storeEmail" className={styles.label}>
              Email магазина *
            </label>
            <input
              id="storeEmail"
              type="email"
              className={styles.input}
              value={storeEmail}
              onChange={(e) => setStoreEmail(e.target.value)}
              placeholder="example@shop.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>
              Физический адрес
            </label>
            <input
              id="address"
              type="text"
              className={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="г. Москва, ул. Примерная, д. 1"
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button color="blue" fontSize={15} type="submit" disabled={saveStatus === 'saving'}>
            {saveStatus === 'saving' ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>

          {saveStatus === 'saved' && (
            <span className={styles.successMessage}>✓ Настройки сохранены</span>
          )}

          {saveStatus === 'error' && (
            <span className={styles.errorMessage}>✗ Ошибка сохранения</span>
          )}
        </div>
      </form>
    </div>
  );
}
