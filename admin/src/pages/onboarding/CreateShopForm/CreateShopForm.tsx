import styles from './CreateShopForm.module.css';
import FormTextField from '../../../components/ui/FormTextField/FormTextField';
import Button from '../../../components/ui/Button/Button';
import nextIcon from '../../../assets/icons/next-icon.svg';
import finishIcon from '../../../assets/icons/finish-icon.svg';
import FormLabel from '../../../components/ui/FormLabel/FormLabel';
import FormFileInput from '../../../components/ui/FormFileInput/FormFileInput';
import FormAgreement from '../../../components/ui/FormAgreement/FormAgreement';

interface CreateShopFormProps {
  step: 'step1' | 'step2';
  onComplete?: () => void;
}

export default function CreateShopForm({ step, onComplete }: CreateShopFormProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Чтобы создать магазин, заполните поля ниже</h2>
      <form className={styles.form}>
        {step === 'step1' && (
          <>
            <div className={styles.column}>
              <FormTextField id="title" type="input" label="Название магазина" />
              <FormTextField id="description" type="textarea" label="Описание магазина" />
            </div>
            <div className={styles.column}>
              <FormTextField id="domain" type="input" label="Адрес сайта (домен)" />
              <FormTextField id="email" type="input" label="Контактный Email" />
              <FormTextField id="country" type="input" label="Страна" />
              <FormTextField id="code" type="input" label="Код" />
            </div>
          </>
        )}

        {step === 'step2' && (
          <>
            <div className={styles.step2Container}>
              <div className={styles.column}>
                <FormLabel element="logo">Логотип сайта</FormLabel>
                <FormFileInput id="logo" />
              </div>
              <div className={styles.column}>
                <FormLabel element="agreement" customMargin="20">
                  Согласия и условия
                </FormLabel>
                <div className={styles.agreementsContainer}>
                  <FormAgreement id="confidential">
                    Я даю согласие на обработку моих персональных данных в соответствии с Политикой
                    конфиденциальности
                  </FormAgreement>
                  <FormAgreement id="agreement">
                    Я принимаю условия Пользовательского соглашения
                  </FormAgreement>
                </div>
              </div>
            </div>
          </>
        )}
      </form>

      {step === 'step1' ? (
        <Button fontSize={15} color="blue">
          Далее
          <img src={nextIcon} className={styles.buttonIcon} />
        </Button>
      ) : (
        <Button fontSize={15} color="blue">
          Создать
          <img src={finishIcon} className={styles.buttonIcon} />
        </Button>
      )}
    </div>
  );
}
