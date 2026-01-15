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

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.image}>
          <ProfileImage />
        </div>
        <div className={styles.name}>spiderfrommars4@gmail.com</div>

        {from === 'profile' ? (
          <Button
            fontSize={12}
            color="blue"
            onClick={handleButtonClick}
            paddingBlock={5}
            paddingInline={0}
          >
            Вернуться в панель администратора
          </Button>
        ) : (
          <Button
            fontSize={13}
            color="blue"
            onClick={handleButtonClick}
            paddingBlock={6}
            paddingInline={20}
          >
            Изменить
          </Button>
        )}
      </div>
    </div>
  );
}
