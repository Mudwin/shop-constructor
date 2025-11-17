'use client';

import styles from './styles/page.module.css';
import CustomButton from '../src/components/CustomButton';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles['buttons-container']}>
        <CustomButton>Зарегистрироваться</CustomButton>
        <CustomButton>Войти</CustomButton>
      </div>
    </div>
  );
}
