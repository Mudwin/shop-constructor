'use client';

import styles from './styles/page.module.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
  backgroundColor: 'var(--color-blue-transparent)',
  color: 'var(--color-dark)',
  padding: '6px 12px',
  fontSize: '20px',
  fontWeight: '600',
  textTransform: 'none',
  borderRadius: '10px',
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
  '&:hover': {
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
  },
});

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
