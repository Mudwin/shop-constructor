import styles from './FormInput.module.css';

interface FormInputProps {
  id: string;
  type?: string;
  required?: boolean;
}

export default function FormInput({ id, type = 'text', required = false }: FormInputProps) {
  return <input className={styles.input} id={id} type={type} required />;
}
