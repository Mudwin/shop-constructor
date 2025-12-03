import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShop } from '../../../store/slices/authSlice';

import PageHeader from '../../../components/ui/PageHeader/PageHeader';
import ContentTile from '../../../components/ui/ContentTile/ContentTile';
import CreateShopForm from '../CreateShopForm/CreateShopForm';
import OnboardingButtons from '../../../components/ui/OnboardingButtons/OnboardingButtons';

import styles from './OnboardingPage.module.css';

export default function OnboardingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [creationStep, setCreationStep] = useState<'buttons' | 'step1' | 'step2'>('buttons');
  const [shopName, setShopName] = useState('');
  // + другие состояния для формы добавить (лого, согласие)

  const handleCreateShopClick = () => {
    setCreationStep('step1');
  };

  const handleStep1Complete = () => {
    setCreationStep('step2');
  };

  const handleStep2Complete = (/* данные со второго шага */) => {
    dispatch(
      setShop({ id: Date.now().toString(), name: shopName || 'Мой магазин', role: 'owner' })
    );

    navigate('/dashboard');
  };

  const renderContent = () => {
    switch (creationStep) {
      case 'buttons':
        return <OnboardingButtons onCreateShopClick={handleCreateShopClick} />;
      case 'step1':
        return (
          <CreateShopForm
            step="step1"
            shopName={shopName}
            onShopNameChange={setShopName}
            onComplete={handleStep1Complete}
          />
        );
      case 'step2':
        return <CreateShopForm step="step2" onComplete={handleStep1Complete} />;
      default:
        return <OnboardingButtons onCreateShopClick={handleCreateShopClick} />;
    }
  };

  return (
    <div className={styles.onboardingContainer}>
      <PageHeader>
        {creationStep === 'buttons' ? 'Добро пожаловать!' : 'Создание магазина'}
      </PageHeader>
      <ContentTile width="1100" height="600">
        {renderContent()}
      </ContentTile>
    </div>
  );
}
