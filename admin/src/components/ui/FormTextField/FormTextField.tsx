import styles from './FormTextField.module.css';
import FormLabel from '../FormLabel/FormLabel';
import FormInput from '../FormInput/FormInput';
import FormTextarea from '../FormTextarea/FormTextarea';

interface FormTextFieldProps {
  id: string;
  type: 'input' | 'textarea';
  inputType?: string;
  label: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FormTextField({
  id,
  type,
  inputType = 'text',
  label,
  required = false,
  value,
  onChange,
}: FormTextFieldProps) {
  return (
    <div className={styles.field}>
      <FormLabel element={id} required={required}>
        {label}
      </FormLabel>

      {type === 'input' ? (
        <FormInput id={id} type={inputType} required={required} value={value} onChange={onChange} />
      ) : (
        <FormTextarea id={id} required={required} value={value} onChange={onChange} />
      )}
    </div>
  );
}
