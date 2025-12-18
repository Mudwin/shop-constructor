import type React from 'react';
import styles from './Button.module.css';

type ButtonColor = 'blue' | 'white' | 'emerald';

interface ButtonProps {
  children: React.ReactNode;
  fontSize: number;
  color: ButtonColor;
  maxWidth?: boolean;
  justifyStart?: boolean;
  disabled?: boolean;
  paddingInline?: number;
  paddingBlock?: number;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
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
  paddingInline,
  disabled = false,
  paddingBlock,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      style={{
        fontSize: fontSize,
        backgroundColor: buttonColors[color],
        width: maxWidth ? '100%' : '',
        justifyContent: justifyStart ? 'start' : 'center',
        paddingBlock: `${paddingBlock}px`,
        paddingInline: `${paddingInline}px`,
      }}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
