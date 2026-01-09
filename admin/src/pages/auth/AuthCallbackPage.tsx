import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { initializeAuth } from '../../store/slices/authSlice';
import { api } from '../../api';

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const processAuth = async () => {
      try {
        const token = searchParams.get('token');
        const user_id = searchParams.get('user_id');
        const email = searchParams.get('email');
        const isProfileCompleted = searchParams.get('is_profile_completed') === 'true';

        if (!token) {
          throw new Error('Токен не найден');
        }

        api.setToken(token);

        await dispatch(initializeAuth()).unwrap(); // unwrap для обработки ошибок

        if (isProfileCompleted) {
          navigate('/dashboard');
        } else {
          navigate('/onboarding/complete-profile');
        }
      } catch (error) {
        console.error('Ошибка обработки авторизации:', error);
        navigate('/login');
      }
    };

    processAuth();
  }, [dispatch, navigate, searchParams]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Авторизация</h1>
      {status === 'loading' && <p>Обработка входа...</p>}
      {status === 'error' && <p style={{ color: 'red' }}>Ошибка авторизации</p>}
    </div>
  );
}
