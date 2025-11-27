import type React from 'react';
import styles from './Button.module.css';

type ButtonColor = 'blue' | 'white' | 'emerald';

interface ButtonProps {
  children: React.ReactNode;
  fontSize: number;
  color: ButtonColor;
  maxWidth?: boolean;
  justifyStart?: boolean;
}

const buttonColors: Record<ButtonColor, string> = {
  blue: 'var(--color-light-blue)',
  white: 'var(--color-white)',
  emerald: 'var(--color-light-teal)',
};

export default function Button({
  children,
  fontSize,
  color = 'blue',
  maxWidth = false,
  justifyStart = false,
}: ButtonProps) {
  return (
    <button
      style={{
        fontSize: fontSize,
        backgroundColor: buttonColors[color],
        width: maxWidth ? '100%' : '',
        justifyContent: justifyStart ? 'start' : 'center',
      }}
      className={styles.button}
    >
      {children}
    </button>
  );
}
