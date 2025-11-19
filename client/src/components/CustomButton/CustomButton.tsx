'use client';

import Button from '@mui/material/Button';
import Link from 'next/link';

type ButtonTypes = 'enter' | 'add' | 'delete' | 'change';

interface CustomButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  buttonType?: ButtonTypes;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fontSize?: number;
}

const styles = {
  color: 'var(--color-dark)',
  padding: '6px 12px',
  // fontSize: '20px',
  fontWeight: '600',
  textTransform: 'none',
  borderRadius: '10px',
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
  '&:hover': {
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
  },
};

const backgroundColors: Record<ButtonTypes, string> = {
  enter: 'var(--color-blue-transparent)',
  add: 'var(--color-teal)',
  delete: 'var(--color-red)',
  change: 'var(--color-gray)',
};

export default function CustomButton({
  children,
  href,
  onClick,
  buttonType = 'enter',
  type = 'button',
  disabled = false,
  fontSize = 15,
}: CustomButtonProps) {
  const buttonStyles = {
    backgroundColor: backgroundColors[buttonType],
    fontSize: `${fontSize}px`,
    ...styles,
  };

  if (href) {
    return (
      <Button type={type} sx={buttonStyles} component={Link} href={href} disabled={disabled}>
        {children}
      </Button>
    );
  }

  return (
    <Button type={type} sx={buttonStyles} disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
}
