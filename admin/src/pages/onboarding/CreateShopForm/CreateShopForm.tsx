import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { setShop } from '../../../store/slices/authSlice';
import { api } from '../../../api';
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    join_password: '',
    domain: '',
    email: '',
    country: '',
  });

  const [agreementConfidential, setAgreementConfidential] = useState(false);
  const [agreementTerms, setAgreementTerms] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (step === 'step1') {
      navigate('/onboarding/step2');
      return;
    }

    if (step === 'step2') {
      if (!agreementConfidential || !agreementTerms) {
        setError('Необходимо принять все соглашения');
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      const shopData = {
        name: formData.name,
        description: formData.description || undefined,
        join_password: formData.join_password,
      };

      const shop = await api.createShop(formData);

      dispatch(
        setShop({
          id: String(shop.id),
          name: shop.name,
          role: 'owner',
        })
      );

      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Ошибка создания магазина');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name || e.target.id]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <PageHeader>Создание магазина</PageHeader>
      <ContentTile width="1100" height="600">
        <div className={styles.formContainer}>
          <h2 className={styles.header}>Чтобы создать магазин, заполните поля ниже</h2>

          {/* Добавить отображение ошибки */}

          <form className={styles.form} onSubmit={handleSubmit}>
            {step === 'step1' && (
              <div className={styles.formColumns}>
                <div className={styles.column}>
                  <FormTextField
                    id="name"
                    name="name"
                    type="input"
                    label="Название магазина"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <FormTextField
                    id="description"
                    name="description"
                    type="textarea"
                    label="Описание магазина"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.column}>
                  <FormTextField
                    id="domain"
                    name="domain"
                    type="input"
                    label="Адрес сайта (домен)"
                    value={formData.domain}
                    onChange={handleChange}
                    placeholder="example-shop.ru"
                  />
                  <FormTextField
                    id="email"
                    name="email"
                    type="email"
                    label="Контактный Email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="shop@example.com"
                  />
                  <FormTextField
                    id="country"
                    name="country"
                    type="input"
                    label="Страна"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Россия"
                  />
                  <FormTextField
                    id="join_password"
                    name="join_password"
                    type="password"
                    label="Пароль для присоединения"
                    value={formData.join_password}
                    onChange={handleChange}
                    required
                    placeholder="Минимум 8 символов"
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
                      <FormAgreement
                        id="confidential"
                        checked={agreementConfidential}
                        onChange={(e: any) => setAgreementConfidential(e.target.checked)}
                      >
                        Я даю согласие на обработку моих персональных данных в соответствии с
                        <a className={styles.agreementLink} href="#">
                          Политикой конфиденциальности
                        </a>
                      </FormAgreement>
                      <FormAgreement
                        id="agreement"
                        checked={agreementTerms}
                        onChange={(e: any) => setAgreementTerms(e.target.checked)}
                      >
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

            {/* Добавить превью данных из предыдущего шага */}

            {step === 'step1' ? (
              <Button type="submit" fontSize={15} color="blue" disabled={loading}>
                Далее
                <img src={nextIcon} className={styles.buttonIcon} alt="" />
              </Button>
            ) : (
              <Button type="submit" fontSize={15} color="blue" disabled={loading}>
                {loading ? 'Создание...' : 'Создать'}
                <img src={finishIcon} className={styles.buttonIcon} alt="" />
              </Button>
            )}
          </form>
        </div>
      </ContentTile>
    </div>
  );
}
