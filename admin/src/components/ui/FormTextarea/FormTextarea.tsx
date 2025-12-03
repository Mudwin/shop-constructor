import styles from './FormTextarea.module.css';

interface FormTextareaProps {
  id: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function FormTextarea({ id, required = false, value, onChange }: FormTextareaProps) {
  return (
    <textarea
      className={styles.textarea}
      id={id}
      required={required}
      value={value || ''}
      onChange={onChange}
    ></textarea>
  );
}
