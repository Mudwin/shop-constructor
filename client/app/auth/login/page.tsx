'use client';

import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';

export default function EnterPage() {
  return (
    <CustomForm type="login">
      <CustomFormField label="Имя пользователя или Email" id="login" />
      <CustomFormField label="Пароль" id="password" />
    </CustomForm>
  );
}
