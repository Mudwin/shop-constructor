'use client';

import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';

export default function ResetPasswordPage() {
  return (
    <CustomForm type="reset">
      <CustomFormField label="Код из почты" id="code" />
      <CustomFormField label="Введите новый пароль" id="new-password" />
      <CustomFormField label="Подтвердите пароль" id="confirm-password" />
    </CustomForm>
  );
}
