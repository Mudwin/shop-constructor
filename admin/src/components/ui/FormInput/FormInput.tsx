import styles from './FormInput.module.css';

interface FormInputProps {
  id: string;
  type?: string;
  required?: boolean;
  value?: string | number;
  name?: string;
  min?: string;
  step?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  id,
  type = 'text',
  required = false,
  name,
  placeholder,
  min,
  step,
  value,
  onChange,
}: FormInputProps) {
  return (
    <input
      className={styles.input}
      id={id}
      name={name}
      min={min}
      step={step}
      type={type}
      placeholder={placeholder}
      required={required}
      value={value || ''}
      onChange={onChange}
    />
  );
}
