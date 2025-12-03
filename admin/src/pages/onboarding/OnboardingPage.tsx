import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShop } from '../../store/slices/authSlice';

// import OnboardingButtons from '../../components/ui/OnboardingButtons/OnboardingButtons';
import PageHeader from '../../components/ui/PageHeader/PageHeader';
import ContentTile from '../../components/ui/ContentTile/ContentTile';
import CreateShopForm from './CreateShopForm/CreateShopForm';

import styles from './FormStyles.module.css'; /* временно */

export default function OnboardingPage() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const [creationStep, setCreationStep] = useState<'buttons' | 'step1' | 'step2'>('buttons');
  // const [shopName, setShopName] = useState('');
  // // + другие состояния для формы добавить (лого, согласие)

  // const handleCreateShopClick = () => {
  //   setCreationStep('step1');
  // };

  // const handleStep1Complete = (name: string) => {
  //   setShopName(name);
  //   setCreationStep('step2');
  // };

  // const handleStep2Complete = (/* данные со второго шага */) => {
  //   dispatch(setShop({ id: 'new-shop', name: shopName, role: 'owner' }));

  //   navigate('/dashboard');
  // };

  // const renderContent = () => {
  //   switch (creationStep) {
  //     case 'buttons':
  //       return <OnboardingButtons onCreateShopClick={handleCreateShopClick} />;
  //     case 'step1':
  //       return <CreateShopForm step="step1" onComplete={handleStep1Complete} />;
  //     case 'step2':
  //       return <CreateShopForm step="step2" onComplete={handleStep2Complete} />;
  //     default:
  //       return <OnboardingButtons onCreateShopClick={handleCreateShopClick} />;
  //   }
  // };

  return (
    <div className={styles.onboardingContainer}>
      <PageHeader>Добро пожаловать!</PageHeader>
      <ContentTile width="1100" height="600">
        <CreateShopForm step="step2" />
      </ContentTile>
    </div>
  );
}
