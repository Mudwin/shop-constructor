import styles from './OnboardingButtons.module.css';
import Button from '../Button/Button';
import addIcon from '../../../assets/icons/add-icon.svg';
import joinIcon from '../../../assets/icons/join-icon.svg';

export default function OnboardingButtons() {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Создайте свой магазин, либо присоединитесь к существующему</h2>
      <div className={styles.buttons}>
        <Button fontSize={18} color="blue">
          Создать
          <img src={addIcon} className={styles.buttonIcon} />
        </Button>
        <Button fontSize={18} color="emerald">
          Присоединиться
          <img src={joinIcon} className={styles.buttonIcon} />
        </Button>
      </div>
    </div>
  );
}
