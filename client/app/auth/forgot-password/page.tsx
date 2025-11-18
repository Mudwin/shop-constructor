'use client';

import CustomFormField from '../../../src/components/CustomFormField/CustomFormField';
import CustomForm from '../../../src/components/CustomForm/CustomForm';

export default function ForgotPasswordPage() {
  return (
    <CustomForm type="recovery">
      <CustomFormField label="Email" id="email" />
    </CustomForm>
  );
}
