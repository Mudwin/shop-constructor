import styles from './FormLabel.module.css';

interface FormLabelProps {
  children: React.ReactNode;
  element: string;
  required?: boolean;
  customMargin?: string;
}

export default function FormLabel({
  children,
  element,
  required = false,
  customMargin,
}: FormLabelProps) {
  return (
    <label className={styles.label} htmlFor={element} style={{ marginBottom: `${customMargin}px` }}>
      {children}
    </label>
  );
}
