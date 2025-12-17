import styles from './AdminInput.module.css';

interface AdminInputProps {
  id: string;
  value?: string;
  name?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AdminInput({ id, value, name, placeholder, onChange }: AdminInputProps) {
  return (
    <input
      className={styles.input}
      id={id}
      name={name}
      placeholder={placeholder}
      //   value={value || ''}
      onChange={onChange}
    />
  );
}
