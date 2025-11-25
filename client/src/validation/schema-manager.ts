import { loginSchema, confirmSchema } from './schemas';
import type { CustomFormType } from '../components/CustomForm/CustomForm';

export const getSchemaByType = (type: CustomFormType) => {
  const schemas: Record<CustomFormType, any> = {
    login: loginSchema,
    confirm: confirmSchema,
  };

  return schemas[type];
};
