import { useDispatch, useSelector } from 'react-redux';
import { setShop } from '../../store/slices/authSlice';
import type { RootState } from '../../store';

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

  return 'onboarding page';

  //   other elements (buttons)
}
