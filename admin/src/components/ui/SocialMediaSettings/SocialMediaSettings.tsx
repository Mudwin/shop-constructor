import { useState } from 'react';
import Button from '../../../components/ui/Button/Button';
import styles from '../../../pages/dashboard/SettingsPage/SettingsForm.module.css';

interface SocialMediaSettingsProps {
  initialData: {
    telegram: string;
    youtube: string;
    vk: string;
  };
  onSave: (data: any) => Promise<void>;
  saveStatus?: 'saving' | 'saved' | 'error';
}

export default function SocialMediaSettings({
  initialData,
  onSave,
  saveStatus,
}: SocialMediaSettingsProps) {
  const [telegram, setTelegram] = useState(initialData.telegram || '');
  const [youtube, setYoutube] = useState(initialData.youtube || '');
  const [vk, setVk] = useState(initialData.vk || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ telegram, youtube, vk });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Социальные сети</h2>
      <p className={styles.subtitle}>Ссылки на ваши социальные сети (опционально)</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Социальные сети</h3>

          <div className={styles.formGroup}>
            <label htmlFor="telegram" className={styles.label}>
              Telegram
            </label>
            <div className={styles.inputWithPrefix}>
              <span className={styles.prefix}>@</span>
              <input
                id="telegram"
                type="text"
                className={styles.input}
                value={telegram.replace('@', '')}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="username"
              />
            </div>
            <p className={styles.helpText}>Укажите только имя пользователя без @</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="youtube" className={styles.label}>
              YouTube
            </label>
            <input
              id="youtube"
              type="text"
              className={styles.input}
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              placeholder="youtube.com/c/channelname"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="vk" className={styles.label}>
              ВКонтакте
            </label>
            <input
              id="vk"
              type="text"
              className={styles.input}
              value={vk}
              onChange={(e) => setVk(e.target.value)}
              placeholder="vk.com/publicname"
            />
          </div>
        </div>

        <div className={styles.actions}>
          <Button type="submit" color="blue" fontSize={14} disabled={saveStatus === 'saving'}>
            {saveStatus === 'saving' ? 'Сохранение...' : 'Сохранить ссылки'}
          </Button>

          {saveStatus === 'saved' && (
            <span className={styles.successMessage}>✓ Соцсети сохранены</span>
          )}

          {saveStatus === 'error' && (
            <span className={styles.errorMessage}>✗ Ошибка сохранения</span>
          )}
        </div>
      </form>
    </div>
  );
}
