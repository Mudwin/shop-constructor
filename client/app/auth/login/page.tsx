'use client';

import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';

export default function EnterPage() {
  const handleSubmit = () => {
    console.log('handling');
  };

  return (
    <CustomForm onSubmit={handleSubmit} type="login">
      <CustomFormField label="Имя пользователя или Email" id="username" />
      <CustomFormField label="Пароль" id="password" />
    </CustomForm>
  );
}
