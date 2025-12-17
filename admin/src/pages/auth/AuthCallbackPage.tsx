import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const handleAuth = async () => {
      try {
        console.log('🚀 AuthCallbackPage: Начало обработки');

        // Получаем параметры из URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userId = urlParams.get('user_id');
        const email = urlParams.get('email');

        console.log('📊 Параметры из URL:', { token, userId, email });

        if (!token) {
          console.error('❌ Нет токена в URL');
          setStatus('error');
          navigate('/error');
          return;
        }

        // Сохраняем токен
        console.log('💾 Сохраняем токен...');
        api.setToken(token);
        localStorage.setItem('access_token', token);
        console.log('✅ Токен сохранен');

        // Получаем профиль пользователя
        console.log('👤 Получаем профиль...');
        const profile = await api.getProfile();
        console.log('✅ Профиль получен:', profile);

        // Получаем магазины пользователя
        console.log('🏪 Получаем магазины...');
        const shops = await api.getMyShops();
        console.log('✅ Магазины получены:', shops);

        // Перенаправляем в зависимости от наличия магазинов
        if (shops && shops.length > 0) {
          console.log('📦 У пользователя есть магазин, перенаправляем в /dashboard');
          navigate('/dashboard');
        } else {
          console.log('🆕 У пользователя нет магазина, перенаправляем в /onboarding');
          navigate('/onboarding');
        }

        setStatus('success');
      } catch (error) {
        console.error('❌ Ошибка в AuthCallbackPage:', error);
        setStatus('error');
        navigate('/error');
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Авторизация</h1>
      {status === 'loading' && <p>⏳ Обработка входа...</p>}
      {status === 'error' && <p style={{ color: 'red' }}>❌ Ошибка авторизации</p>}
    </div>
  );
}
