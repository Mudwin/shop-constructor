'use client';

import AuthorizationHeader from '../../../src/components/AuthHeader/AuthHeader';
import AuthTile from '../../../src/components/AuthTile/AuthTile';
import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';

export default function RegisterPage() {
  return (
    <>
      <AuthorizationHeader>Регистрация</AuthorizationHeader>
      <AuthTile>
        <CustomFormField label="Имя пользователя" id="username" placeholder="alex47" />
        <CustomFormField label="Email" id="email" placeholder="mymail@proton.me" />
        <CustomFormField label="Фамилия" id="surname" placeholder="Иванов" />
        <CustomFormField label="Имя" id="name" placeholder="Иван" />
        <CustomFormField label="Отчество" id="father-name" placeholder="Иванович" />
        <CustomFormField label="Пароль" id="password" />
        <CustomFormField label="Повторите пароль" id="repeat-password" />
      </AuthTile>
    </>
  );
}
