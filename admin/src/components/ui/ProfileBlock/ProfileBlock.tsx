import styles from './ProfileBlock.module.css';
import ProfileImage from '../ProfileImage/ProfileImage';
import Button from '../Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProfileProps {
  from: 'profile' | 'onboard' | 'dashboard';
}

export default function ProfileBlock({ from }: ProfileProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const getBackPath = () => {
    const fromDashboard = location.state?.from === 'dashboard';

    return fromDashboard ? '/dashboard' : '/onboarding';
  };

  const handleButtonClick = () => navigate(getBackPath());

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.image}>
          <ProfileImage />
        </div>
        <div className={styles.name}>Петров Дмитрий Петрович</div>
        <Button fontSize={15} color="blue" onClick={handleButtonClick}>
          {from === 'profile' ? 'Вернуться в панель администратора' : 'Изменить'}
        </Button>
      </div>
    </div>
  );
}
