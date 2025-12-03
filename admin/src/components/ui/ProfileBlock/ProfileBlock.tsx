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

  const handleButtonClick = () => {
    if (from === 'profile') {
      const fromDashboard = location.state?.from === 'dashboard';
      navigate(fromDashboard ? '/dashboard' : '/onboarding');
    } else {
      navigate('/profile', {
        state: { from: from },
      });
    }
  };

  const buttonText = from === 'profile' ? 'Вернуться в панель администратора' : 'Изменить';

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.image}>
          <ProfileImage />
        </div>
        <div className={styles.name}>Петров Дмитрий Петрович</div>
        <Button fontSize={15} color="blue" onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
