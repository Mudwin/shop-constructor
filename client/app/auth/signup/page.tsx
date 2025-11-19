'use client';

import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';

export default function RegisterPage() {
  const handleSubmit = (data: any) => {
    console.log('Данные формы:', data);
    console.log(1);
    window.location.href = '/'; // или '/admin'
  };

  return (
    <CustomForm onSubmit={handleSubmit} type="signup">
      <CustomFormField label="Имя пользователя" id="username" placeholder="alex47" />
      <CustomFormField label="Email" id="email" placeholder="mymail@proton.me" />
      <CustomFormField label="Фамилия" id="surname" placeholder="Иванов" />
      <CustomFormField label="Имя" id="name" placeholder="Иван" />
      <CustomFormField label="Отчество" id="fatherName" placeholder="Иванович" />
      <CustomFormField label="Пароль" id="password" />
      <CustomFormField label="Повторите пароль" id="repeatPassword" />
    </CustomForm>
  );
}
