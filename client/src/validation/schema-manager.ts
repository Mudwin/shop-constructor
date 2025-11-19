import { loginSchema, signupSchema, forgotPasswordSchema, resetPasswordSchema } from './schemas';
import type { CustomFormType } from '../components/CustomForm/CustomForm';

export const getSchemaByType = (type: CustomFormType) => {
  const schemas: Record<CustomFormType, any> = {
    login: loginSchema,
    signup: signupSchema,
    recovery: forgotPasswordSchema,
    reset: resetPasswordSchema,
  };

  return schemas[type];
};
