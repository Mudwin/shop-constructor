import styles from './FormAgreement.module.css';

interface FormAgreementProps {
  children: React.ReactNode;
  id: string;
}

export default function FormAgreement({ children, id }: FormAgreementProps) {
  return (
    <label htmlFor={id} className={styles.label}>
      <span className={styles.text}>{children}</span>
      <input id={id} type="checkbox" className={styles.originalCheckbox} />
      <span className={styles.customCheckbox}></span>
    </label>
  );
}
