import styles from './AdminInput.module.css';

interface AdminInputProps {
  id: string;
  value?: string;
  name?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function AdminInput({
  id,
  value,
  name,
  placeholder,
  onKeyDown,
  onChange,
}: AdminInputProps) {
  return (
    <input
      className={styles.input}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
