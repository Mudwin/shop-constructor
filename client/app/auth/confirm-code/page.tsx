'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';
import { api } from '../../../src/lib/api';

export default function ConfirmCodePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const email = searchParams.get('email');

  const handleSubmit = async (data: any) => {
    if (!email) {
      setError('Email не найден. Пожалуйста, начните заново.');
      router.push('/auth/login');
      return;
    }

    try {
      setError('');
      setLoading(true);

      const response = await api.confirmOTP(email, data.code);

      if (response.access_token) {
        api.setToken(response.access_token);

        if (response.is_profile_completed) {
          window.location.href = `http://localhost:5173/auth-callback?token=${response.access_token}&user_id=${response.user_id}&email=${encodeURIComponent(response.email)}&is_profile_completed=true`;
        } else {
          router.push(`/auth/complete-profile?token=${response.access_token}`);
        }
      } else {
        throw new Error('Неверный ответ от сервера');
      }
    } catch (error: any) {
      setError(error.message || 'Неверный код или ошибка ввода');
      console.error('Ошибка подтверждения OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <p style={{ marginBottom: '20px' }}>
        Мы отправили код на email: <strong>{email}</strong>
      </p>
      <CustomForm onSubmit={handleSubmit} type="confirm">
        <CustomFormField label="Введите 6-значный код" id="code" placeholder="123456" />
      </CustomForm>
    </>
  );
}
