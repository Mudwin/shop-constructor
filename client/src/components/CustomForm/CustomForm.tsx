import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './CustomForm.module.css';
import AuthHeader from '../AuthHeader/AuthHeader';
import AuthTile from '../AuthTile/AuthTile';
import CustomButton from '../CustomButton/CustomButton';
import AuthLink from '../AuthLink/AuthLink';
import { getSchemaByType } from '../../validation/schema-manager';

export type CustomFormType = 'login' | 'confirm';

interface CustomFormProps {
  children: React.ReactNode;
  type: CustomFormType;
  onSubmit: (data: any) => void;
}

const formHeaders: Record<CustomFormType, string> = {
  login: 'Вход',
  confirm: 'Подтверждение входа',
};

const formButtons: Record<CustomFormType, string> = {
  login: 'Получить код',
  confirm: 'Подтвердить',
};

export default function CustomForm({ children, type, onSubmit }: CustomFormProps) {
  const schema = getSchemaByType(type);
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  return (
    <>
      <AuthHeader>{formHeaders[type]}</AuthHeader>
      <AuthTile>
        <FormProvider {...methods}>
          <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
            {children}
            <CustomButton type="submit">{formButtons[type]}</CustomButton>
          </form>
        </FormProvider>
        <div className={styles.links}>
          {type === 'confirm' && <AuthLink href="/auth/login">Не получили код?</AuthLink>}
          <AuthLink href="/">На главную</AuthLink>
        </div>
      </AuthTile>
    </>
  );
}
