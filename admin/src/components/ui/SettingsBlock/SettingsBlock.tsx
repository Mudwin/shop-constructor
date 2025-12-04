import Button from '../Button/Button';
import styles from './SettingsBlock.module.css';
import logoutIcon from '../../../assets/icons/logout-icon.svg';
import settingsIcon from '../../../assets/icons/settings-icon.svg';
import questionIcon from '../../../assets/icons/question-icon.svg';

export default function SettingsBlock() {
  return (
    <div className={styles.container}>
      <Button fontSize={13} color="white" maxWidth justifyStart paddingBlock="10">
        <img className={styles.icon} src={settingsIcon}></img>
        Настройки
      </Button>
      <Button fontSize={13} color="white" maxWidth justifyStart paddingBlock="10">
        <img className={styles.icon} src={questionIcon}></img>
        Помощь
      </Button>
      <Button fontSize={13} color="white" maxWidth justifyStart paddingBlock="10">
        <img className={styles.icon} src={logoutIcon}></img>
        Выход
      </Button>
    </div>
  );
}
