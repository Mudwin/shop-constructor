'use client';

import styles from './styles/page.module.css';
import CustomButton from '../src/components/CustomButton/CustomButton';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles['buttons-container']}>
        <CustomButton type="enter" href="/auth/signup">
          Зарегистрироваться
        </CustomButton>
        <CustomButton type="enter" href="/auth/login">
          Войти
        </CustomButton>
      </div>
    </div>
  );
}
