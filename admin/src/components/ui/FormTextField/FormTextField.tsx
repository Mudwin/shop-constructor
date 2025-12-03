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
}

export default function FormTextField({
  id,
  type,
  inputType = 'text',
  label,
  required = false,
}: FormTextFieldProps) {
  return (
    <div className={styles.field}>
      <FormLabel element={id} required>
        {label}
      </FormLabel>

      {type === 'input' ? (
        <FormInput id={id} type={inputType} required />
      ) : (
        <FormTextarea id={id} required />
      )}
    </div>
  );
}
