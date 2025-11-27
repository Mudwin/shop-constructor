import type React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  fontSize: number;
}

export default function Button({ children, fontSize }: ButtonProps) {
  return (
    <button style={{ fontSize: fontSize }} className={styles.button}>
      {children}
    </button>
  );
}
