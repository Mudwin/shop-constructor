'use client';

import AuthorizationHeader from '../../../src/components/AuthHeader/AuthHeader';
import AuthTile from '../../../src/components/AuthTile/AuthTile';
import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomButton from '../../../src/components/CustomButton/CustomButton';
import AuthLink from '../../../src/components/AuthLink/AuthLink';

export default function EnterPage() {
  return (
    <>
      <AuthorizationHeader>Авторизация</AuthorizationHeader>
      <AuthTile>
        <CustomFormField label="Имя пользователя или Email" id="login" />
        <CustomFormField label="Пароль" id="password" />
        <CustomButton>Войти</CustomButton>
        <AuthLink href="/">Забыли пароль?</AuthLink>
        <AuthLink href="/">Назад</AuthLink>
      </AuthTile>
    </>
  );
}
