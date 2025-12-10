'use client';

import { useState } from 'react';
import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';
import { api } from '../../../src/lib/api';

export default function EnterPage() {
  const [error, setError] = useState('');

  const handleSubmit = async (data: any) => {
    try {
      setError('');
      await api.sendOTP(data.email);
      window.location.href = `/auth/confirm-code?email=${encodeURIComponent(data.email)}`;
    } catch (error: any) {
      setError(error.message || 'Не удалось отправить код');
    }
  };

  return (
    <>
      {error && alert(`${error}`)}
      <CustomForm onSubmit={handleSubmit} type="login">
        <CustomFormField label="Email" id="email" />
      </CustomForm>
    </>
  );
}
