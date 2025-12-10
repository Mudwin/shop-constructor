'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';
import { api } from '../../../src/lib/api';

export default function ConfirmCodePage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  const email = searchParams.get('email');

  const handleSubmit = async (data: any) => {
    if (!email) {
      setError('Email не найден');
      return;
    }

    try {
      setError('');
      const response = await api.confirmOTP(email, data.code);

      window.location.href = `http://localhost:5173/auth-callback?token=${response.access_token}&user_id=${response.user_id}&email=${encodeURIComponent(response.email)}`;
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
