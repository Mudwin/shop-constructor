'use client';

import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';

export default function EnterPage() {
  const handleSubmit = () => {
    console.log('handling');
    window.location.href = '/auth/confirm-code';
  };

  return (
    <CustomForm onSubmit={handleSubmit} type="login">
      <CustomFormField label="Email" id="email" />
    </CustomForm>
  );
}
