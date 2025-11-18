import styles from './CustomForm.module.css';
import AuthHeader from '../AuthHeader/AuthHeader';
import AuthTile from '../AuthTile/AuthTile';
import CustomButton from '../CustomButton/CustomButton';
import AuthLink from '../AuthLink/AuthLink';

type CustomFormType = 'signup' | 'login' | 'recovery' | 'reset';

interface CustomFormProps {
  children: React.ReactNode;
  type: CustomFormType;
}

const formHeaders: Record<CustomFormType, string> = {
  signup: 'Регистрация',
  login: 'Авторизация',
  recovery: 'Восстановление',
  reset: 'Восстановление',
};

const formButtons: Record<CustomFormType, string> = {
  signup: 'Зарегистрироваться',
  login: 'Войти',
  recovery: 'Получить код',
  reset: 'Сбросить пароль',
};

export default function CustomForm({ children, type }: CustomFormProps) {
  return (
    <>
      <AuthHeader>{formHeaders[type]}</AuthHeader>
      <AuthTile>
        <form className={styles.form}>
          {children}
          <CustomButton>{formButtons[type]}</CustomButton>
        </form>
        <div className={styles.links}>
          {type === 'login' && <AuthLink href="/">Забыли пароль?</AuthLink>}
          <AuthLink href="/">Назад</AuthLink>
        </div>
      </AuthTile>
    </>
  );
}
