import styles from './FormInput.module.css';

interface FormInputProps {
  id: string;
  type?: string;
  required?: boolean;
  value?: string;
  name?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  id,
  type = 'text',
  required = false,
  name,
  placeholder,
  value,
  onChange,
}: FormInputProps) {
  return (
    <input
      className={styles.input}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      value={value || ''}
      onChange={onChange}
    />
  );
}
