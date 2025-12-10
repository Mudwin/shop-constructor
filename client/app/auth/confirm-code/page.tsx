'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';
import { useAuth } from '../../../src/contexts/AuthContext';

export default function ConfirmCodePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const email = searchParams.get('email');

  const handleSubmit = async (data: any) => {
    if (!email) {
      setError('Email не найден');
      return;
    }

    try {
      setError('');
      await login(email, data.code);

      router.push('/profile');
    } catch (error: any) {
      setError(error.message || 'Неверный код или ошибка ввода');
    }
  };

  return (
    <>
      {error && alert(`${error}`)}
      <CustomForm onSubmit={handleSubmit} type="confirm">
        <CustomFormField label="Введите полученный код" id="code" />
      </CustomForm>
    </>
  );
}
