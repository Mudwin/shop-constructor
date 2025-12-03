import styles from './FormInput.module.css';

interface FormInputProps {
  id: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  id,
  type = 'text',
  required = false,
  value,
  onChange,
}: FormInputProps) {
  return (
    <input
      className={styles.input}
      id={id}
      type={type}
      required={required}
      value={value || ''}
      onChange={onChange}
    />
  );
}
