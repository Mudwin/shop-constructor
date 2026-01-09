import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { api } from '../../api';
import { initializeAuth } from '../../store/slices/authSlice';

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = searchParams.get('token');

        if (!token) {
          throw new Error('Токен не найден в URL параметрах');
        }

        api.setToken(token);

        // @ts-ignore
        await dispatch(initializeAuth()).unwrap();

        const shops = await api.getMyShops();

        if (shops && shops.length > 0) {
          navigate('/dashboard');
        } else {
          navigate('/onboarding');
        }
      } catch (error: any) {
        console.error('Ошибка инициализации авторизации:', error);
        setError(error.message || 'Ошибка авторизации');
        setTimeout(() => {
          window.location.href = 'http://localhost:3000/auth/login';
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [dispatch, navigate, searchParams]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: '20px' }}>Загрузка...</div>
        <div>Инициализация авторизации</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          color: '#ef4444',
        }}
      >
        <div style={{ marginBottom: '20px', fontSize: '20px' }}>Ошибка</div>
        <div style={{ marginBottom: '20px' }}>{error}</div>
        <div>Перенаправление на страницу входа...</div>
      </div>
    );
  }

  return null;
}
