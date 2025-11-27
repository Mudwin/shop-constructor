import { useDispatch, useSelector } from 'react-redux';
import { setShop } from '../../store/slices/authSlice';
import type { RootState } from '../../store';
import ProfileBlock from '../../components/ui/ProfileBlock/ProfileBlock';

export default function OnboardingPage() {
  const dispatch = useDispatch();
  const hasShop = useSelector((state: RootState) => !!state.auth.shop);

  const handleCreateShop = (shopName: string) => {
    dispatch(
      setShop({
        id: '1',
        name: shopName,
        role: 'owner',
      })
    );
  };

  return <ProfileBlock />;

  //   other elements (buttons)
}
