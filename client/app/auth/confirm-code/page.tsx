'use client';

import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';

export default function ConfirmCodePage() {
  const handleSubmit = (event: any) => {
    console.log(event.target);
    window.location.href = 'https://localhost:5173/';
  };

  return (
    <CustomForm onSubmit={handleSubmit} type="confirm">
      <CustomFormField label="Введите полученный код" id="code" />
    </CustomForm>
  );
}
