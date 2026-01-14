import styles from './FormTextarea.module.css';

interface FormTextareaProps {
  id: string;
  required?: boolean;
  value?: string | number;
  name?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function FormTextarea({
  id,
  name,
  required = false,
  value,
  placeholder,
  onChange,
}: FormTextareaProps) {
  return (
    <textarea
      className={styles.textarea}
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value || ''}
      onChange={onChange}
    ></textarea>
  );
}
