import styles from './FormAgreement.module.css';

interface FormAgreementProps {
  children: React.ReactNode;
  id: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormAgreement({
  children,
  id,
  checked = false,
  onChange,
}: FormAgreementProps) {
  return (
    <label htmlFor={id} className={styles.label}>
      <span className={styles.text}>{children}</span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        className={styles.originalCheckbox}
        onChange={onChange}
      />
      <span className={styles.customCheckbox}></span>
    </label>
  );
}
