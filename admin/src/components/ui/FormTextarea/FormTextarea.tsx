import styles from './FormTextarea.module.css';

interface FormTextareaProps {
  id: string;
  required?: boolean;
}

export default function FormTextarea({ id, required = false }: FormTextareaProps) {
  return <textarea className={styles.textarea} id={id} required></textarea>;
}
