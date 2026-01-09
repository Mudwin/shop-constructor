'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';
import { api } from '../../../src/lib/api';

export default function EnterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setError('');
      setLoading(true);

      const response = await api.sendOTP(data.email);

      if (response.success) {
        router.push(`/auth/confirm-code?email=${encodeURIComponent(data.email)}`);
      } else {
        throw new Error(response.detail || 'Не удалось отправить код');
      }
    } catch (error: any) {
      setError(error.message || 'Не удалось отправить код');
      console.error('Ошибка отправки OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <CustomForm onSubmit={handleSubmit} type="login">
        <CustomFormField label="Email" id="email" placeholder="Введите ваш email" />
      </CustomForm>
    </>
  );
}
