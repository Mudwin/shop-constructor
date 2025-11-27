import styles from './ProfileBlock.module.css';
import ProfileImage from '../ProfileImage/ProfileImage';
import Button from '../Button/Button';

export default function ProfileBlock() {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.image}>
          <ProfileImage />
        </div>
        <div className={styles.name}>Петров Дмитрий Петрович</div>
        <Button fontSize={18}>Изменить</Button>
      </div>
    </div>
  );
}
