import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/ui/PageHeader/PageHeader';
import ContentTile from '../../../components/ui/ContentTile/ContentTile';
import OnboardingButtons from '../../../components/ui/OnboardingButtons/OnboardingButtons';
import styles from './OnboardingPage.module.css';

export default function OnboardingPage() {
  const navigate = useNavigate();

  const handleCreateShopClick = () => {
    navigate('/onboarding/step1');
  };

  return (
    <div className={styles.onboardingContainer}>
      <PageHeader>Добро пожаловать!</PageHeader>
      <ContentTile width="1100" height="600">
        <OnboardingButtons onCreateShopClick={handleCreateShopClick} />
      </ContentTile>
    </div>
  );
}
