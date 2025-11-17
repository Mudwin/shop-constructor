'use client';

import Button from '@mui/material/Button';

export default function CustomButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      sx={{
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
      }}
    >
      {children}
    </Button>
  );
}
