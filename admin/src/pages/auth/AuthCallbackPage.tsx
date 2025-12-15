import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setUser, setShop } from '../../store/slices/authSlice';
import { api } from '../../api';

export default function AuthCallbackPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const token = searchParams.get('token');
      const userId = searchParams.get('user_id');
      const email = searchParams.get('email');

      if (!token || !userId || !email) {
        navigate('/error');
        return;
      }

      try {
        api.setToken(token);

        const profile = await api.getProfile();

        dispatch(
          setUser({
            id: userId,
            email: email,
            profile: {
              firstName: profile.first_name,
              lastName: profile.last_name,
              phone: profile.phone,
            },
          })
        );

        const shops = await api.getMyShops();

        if (shops.length > 0) {
          dispatch(
            setShop({
              id: String(shops[0].id),
              name: shops[0].name,
              role: 'owner',
            })
          );
          navigate('/dashboard');
        } else {
          navigate('/onboarding');
        }
      } catch (error) {
        console.error(`Auth error: ${error}`);
        navigate('/error');
      }
    };

    handleAuthCallback();
  }, [dispatch, navigate, searchParams]);

  return <div>Загрузка...</div>;
}
