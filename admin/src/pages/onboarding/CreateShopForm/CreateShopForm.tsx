import type { FormEvent } from 'react';
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
  shopName?: string;
  onShopNameChange?: (name: string) => void;
  onDescriptionChange?: (description: string) => void;
  onDomainChange?: (domain: string) => void;
  onEmailChange?: (email: string) => void;
  onCountryChange?: (country: string) => void;
  onCodeChange?: (code: string) => void;
}

export default function CreateShopForm({
  step,
  onComplete,
  shopName,
  onShopNameChange,
  onDescriptionChange,
  onDomainChange,
  onEmailChange,
  onCountryChange,
  onCodeChange,
}: CreateShopFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Чтобы создать магазин, заполните поля ниже</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {step === 'step1' && (
          <>
            <div className={styles.column}>
              <FormTextField
                id="title"
                type="input"
                label="Название магазина"
                value={shopName || ''}
                onChange={(e) => onShopNameChange?.(e.target.value)}
                // required
              />
              <FormTextField
                id="description"
                type="textarea"
                label="Описание магазина"
                onChange={(e) => onDescriptionChange?.(e.target.value)}
              />
            </div>
            <div className={styles.column}>
              <FormTextField
                id="domain"
                type="input"
                label="Адрес сайта (домен)"
                onChange={(e) => onDomainChange?.(e.target.value)}
              />
              <FormTextField
                id="email"
                type="input"
                label="Контактный Email"
                onChange={(e) => onEmailChange?.(e.target.value)}
              />
              <FormTextField
                id="country"
                type="input"
                label="Страна"
                onChange={(e) => onCountryChange?.(e.target.value)}
              />
              <FormTextField
                id="code"
                type="input"
                label="Код"
                onChange={(e) => onCodeChange?.(e.target.value)}
              />
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
                    Я даю согласие на обработку моих персональных данных в соответствии с
                    <a className={styles.agreementLink} href="#">
                      Политикой конфиденциальности
                    </a>
                  </FormAgreement>
                  <FormAgreement id="agreement">
                    Я принимаю условия
                    <a href="" className={styles.agreementLink}>
                      Пользовательского соглашения
                    </a>
                  </FormAgreement>
                </div>
              </div>
            </div>
          </>
        )}
      </form>

      {step === 'step1' ? (
        <Button type="submit" fontSize={15} color="blue">
          Далее
          <img src={nextIcon} className={styles.buttonIcon} />
        </Button>
      ) : (
        <Button type="submit" fontSize={15} color="blue">
          Создать
          <img src={finishIcon} className={styles.buttonIcon} />
        </Button>
      )}
    </div>
  );
}
