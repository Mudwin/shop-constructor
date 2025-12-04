import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setShop } from '../../../store/slices/authSlice';
import styles from './CreateShopForm.module.css';
import FormTextField from '../../../components/ui/FormTextField/FormTextField';
import Button from '../../../components/ui/Button/Button';
import nextIcon from '../../../assets/icons/next-icon.svg';
import finishIcon from '../../../assets/icons/finish-icon.svg';
import FormLabel from '../../../components/ui/FormLabel/FormLabel';
import FormFileInput from '../../../components/ui/FormFileInput/FormFileInput';
import FormAgreement from '../../../components/ui/FormAgreement/FormAgreement';
import PageHeader from '../../../components/ui/PageHeader/PageHeader';
import ContentTile from '../../../components/ui/ContentTile/ContentTile';

interface CreateShopFormProps {
  step: 'step1' | 'step2';
}

export default function CreateShopForm({ step }: CreateShopFormProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (step === 'step1') {
      navigate('/onboarding/step2');
    } else if (step === 'step2') {
      dispatch(
        setShop({
          id: Date.now().toString(),
          name: shopName,
          role: 'owner',
        })
      );

      navigate('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader>Создание магазина</PageHeader>
      <ContentTile width="1100" height="600">
        <div className={styles.formContainer}>
          <h2 className={styles.header}>Чтобы создать магазин, заполните поля ниже</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            {step === 'step1' && (
              <div className={styles.formColumns}>
                <div className={styles.column}>
                  <FormTextField
                    id="title"
                    type="input"
                    label="Название магазина"
                    value={shopName || ''}
                    onChange={(e) => setShopName(e.target.value)}
                    required
                  />
                  <FormTextField
                    id="description"
                    type="textarea"
                    label="Описание магазина"
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className={styles.column}>
                  <FormTextField
                    id="domain"
                    type="input"
                    label="Адрес сайта (домен)"
                    value={domain || ''}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                  <FormTextField
                    id="email"
                    type="input"
                    label="Контактный Email"
                    value={email || ''}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormTextField
                    id="country"
                    type="input"
                    label="Страна"
                    value={country || ''}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <FormTextField
                    id="code"
                    type="input"
                    label="Код"
                    value={code || ''}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
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
          </form>
        </div>
      </ContentTile>
    </div>
  );
}
