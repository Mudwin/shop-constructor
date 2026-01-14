import styles from './FormTextField.module.css';
import FormLabel from '../FormLabel/FormLabel';
import FormInput from '../FormInput/FormInput';
import FormTextarea from '../FormTextarea/FormTextarea';

interface FormTextFieldProps {
  id: string;
  type: 'input' | 'textarea' | 'email' | 'password';
  inputType?: string;
  label: string;
  name?: string;
  required?: boolean;
  step?: string;
  value?: string | number;
  min?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FormTextField({
  id,
  type,
  inputType = 'text',
  label,
  step,
  name,
  min,
  required = false,
  value,
  onChange,
  placeholder,
}: FormTextFieldProps) {
  return (
    <div className={styles.field}>
      <FormLabel element={id} required={required}>
        {label}
      </FormLabel>

      {type === 'input' ? (
        <FormInput
          name={name}
          id={id}
          type={inputType}
          required={required}
          value={value}
          min={min}
          step={step}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <FormTextarea
          name={name}
          id={id}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
