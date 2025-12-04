import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShop } from '../../../store/slices/authSlice';

import PageHeader from '../../../components/ui/PageHeader/PageHeader';
import ContentTile from '../../../components/ui/ContentTile/ContentTile';
import CreateShopForm from '../CreateShopForm/CreateShopForm';
import OnboardingButtons from '../../../components/ui/OnboardingButtons/OnboardingButtons';

import styles from './OnboardingPage.module.css';

export default function OnboardingPage() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [creationStep, setCreationStep] = useState<'buttons' | 'step1' | 'step2'>('buttons');
  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [code, setCode] = useState('');

  const handleCreateShopClick = () => {
    navigate('/onboarding/step1');
  };

  // const handleStep1Complete = () => {
  //   if (!shopName.trim()) {
  //     alert('Пожалуйста, введите название магазина');
  //     return;
  //   }

  //   setCreationStep('step2');
  // };

  // const handleStep2Complete = () => {
  //   // проверка согласий
  //   dispatch(setShop({ id: Date.now().toString(), name: shopName, role: 'owner' }));

  //   navigate('/dashboard');
  // };

  // const renderContent = () => {
  //   switch (creationStep) {
  //     case 'buttons':
  //       return <OnboardingButtons onCreateShopClick={handleCreateShopClick} />;
  //     case 'step1':
  //       return (
  //         <CreateShopForm
  //           step="step1"
  //           shopName={shopName}
  //           description={description}
  //           domain={domain}
  //           email={email}
  //           country={country}
  //           code={code}
  //           onShopNameChange={setShopName}
  //           onDescriptionChange={setDescription}
  //           onDomainChange={setDomain}
  //           onEmailChange={setEmail}
  //           onCountryChange={setCountry}
  //           onCodeChange={setCode}
  //           onComplete={handleStep1Complete}
  //         />
  //       );
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
        <OnboardingButtons onCreateShopClick={handleCreateShopClick} />
      </ContentTile>
    </div>
  );
}
