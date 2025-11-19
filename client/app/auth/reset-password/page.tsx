'use client';

import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';

export default function ResetPasswordPage() {
  const handleSubmit = () => {
    console.log('handling');
  };

  return (
    <CustomForm onSubmit={handleSubmit} type="reset">
      <CustomFormField label="Код из почты" id="code" />
      <CustomFormField label="Введите новый пароль" id="newPassword" />
      <CustomFormField label="Подтвердите пароль" id="confirmPassword" />
    </CustomForm>
  );
}
