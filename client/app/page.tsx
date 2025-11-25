'use client';

import styles from './styles/page.module.css';
import CustomButton from '../src/components/CustomButton/CustomButton';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles['buttons-container']}>
        <CustomButton fontSize={30} type="button" href="/auth/login">
          Вход
        </CustomButton>
      </div>
    </div>
  );
}
