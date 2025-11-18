'use client';

import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';

export default function RegisterPage() {
  return (
    <CustomForm type="signup">
      <CustomFormField label="Имя пользователя" id="username" placeholder="alex47" />
      <CustomFormField label="Email" id="email" placeholder="mymail@proton.me" />
      <CustomFormField label="Фамилия" id="surname" placeholder="Иванов" />
      <CustomFormField label="Имя" id="name" placeholder="Иван" />
      <CustomFormField label="Отчество" id="father-name" placeholder="Иванович" />
      <CustomFormField label="Пароль" id="password" />
      <CustomFormField label="Повторите пароль" id="repeat-password" />
    </CustomForm>
  );
}
