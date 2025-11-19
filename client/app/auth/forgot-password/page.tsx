'use client';

import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';

export default function ForgotPasswordPage() {
  const handleSubmit = (event: any) => {
    console.log(event.target);
  };

  return (
    <CustomForm onSubmit={handleSubmit} type="recovery">
      <CustomFormField label="Email" id="email" />
    </CustomForm>
  );
}
