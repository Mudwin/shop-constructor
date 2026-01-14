import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
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

interface ShopFormData {
  name: string;
  description: string;
  join_password: string;
}

export default function CreateShopForm({ step }: CreateShopFormProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Сохраняем данные формы в localStorage для сохранения между шагами
  const [formData, setFormData] = useState<ShopFormData>(() => {
    const saved = localStorage.getItem('shop_creation_data');
    return saved ? JSON.parse(saved) : {
      name: '',
      description: '',
      join_password: '',
    };
  });

  const [agreementConfidential, setAgreementConfidential] = useState(false);
  const [agreementTerms, setAgreementTerms] = useState(false);

  // Сохраняем данные формы при изменении
  useEffect(() => {
    localStorage.setItem('shop_creation_data', JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (step === 'step1') {
      // Валидация полей первого шага
      if (!formData.name.trim()) {
        setError('Введите название магазина');
        return;
      }
      if (!formData.join_password || formData.join_password.length < 8) {
        setError('Пароль для присоединения должен быть не менее 8 символов');
        return;
      }
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
      // Отправляем только те поля, которые ожидает бэкенд
      const shopData = {
        name: formData.name,
        description: formData.description || undefined,
        join_password: formData.join_password,
      };

      console.log('1. Отправка данных:', shopData);
      
      const response = await api.createShop(shopData);
      console.log('2. Ответ от сервера:', response);

      // Очищаем временные данные
      localStorage.removeItem('shop_creation_data');

      dispatch(
        setShop({
          id: String(response.id),
          name: response.name,
          role: 'owner',
        })
      );

      console.log('3. После dispatch, проверяем Redux state');

      localStorage.setItem('current_shop_id', String(response.id));
      localStorage.setItem('has_shop', 'true');

      setTimeout(() => {
        console.log('4. Переход в /dashboard');
        navigate('/dashboard');
      }, 100);
      
    } catch (error: any) {
      console.error('5. Ошибка:', error);
      setError(error.message || 'Ошибка создания магазина');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <PageHeader>Создание магазина</PageHeader>
      <ContentTile width="1100" height="600">
        <div className={styles.formContainer}>
          <h2 className={styles.header}>
            {step === 'step1' ? 'Основные данные магазина' : 'Дополнительные настройки и соглашения'}
          </h2>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            {step === 'step1' && (
              <div className={styles.formColumns}>
                <div className={styles.column}>
                  <FormTextField
                    id="name"
                    name="name"
                    type="input"
                    label="Название магазина *"
                    placeholder="Пятерочка"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <FormTextField
                    id="join_password"
                    name="join_password"
                    type="input"
                    label="Пароль для присоединения *"
                    value={formData.join_password}
                    onChange={handleChange}
                    required
                    placeholder="Минимум 8 символов"
                  />
                </div>
                <div className={styles.column}>
                  <FormTextField
                    id="description"
                    name="description"
                    type="textarea"
                    label="Описание магазина"
                    placeholder="Краткое описание вашего магазина"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {step === 'step2' && (
              <>
                <div className={styles.step2Container}>
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

            {step === 'step1' ? (
              <Button type="submit" fontSize={15} color="blue" disabled={loading}>
                Далее
                <img src={nextIcon} className={styles.buttonIcon} alt="" />
              </Button>
            ) : (
              <div className={styles.finalActions}>
                <Button 
                  type="button" 
                  fontSize={15} 
                  color="blue" 
                  onClick={() => navigate('/onboarding/step1')}
                  disabled={loading}
                >
                  Назад
                </Button>
                <Button type="submit" fontSize={15} color="blue" disabled={loading}>
                  {loading ? 'Создание...' : 'Создать магазин'}
                  <img src={finishIcon} className={styles.buttonIcon} alt="" />
                </Button>
              </div>
            )}
          </form>
        </div>
      </ContentTile>
    </div>
  );
}