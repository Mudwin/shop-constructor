'use client';

import styles from './styles/page.module.css';
import CustomButton from '../src/components/CustomButton';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles['buttons-container']}>
        <CustomButton type="enter" href="/auth/register">
          Зарегистрироваться
        </CustomButton>
        <CustomButton type="enter" href="/auth/enter">
          Войти
        </CustomButton>
      </div>
    </div>
  );
}
