import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { Provider } from 'react-redux';
import { store } from './store';

async function initializeMocks() {
  if (import.meta.env.DEV) {
    console.log('Режим разработки активирован');

    if (!localStorage.getItem('access_token')) {
      console.log('Установка мокового токена...');
      localStorage.setItem('access_token', 'mock-jwt-token-for-development');
    }

    if (!localStorage.getItem('has_shop')) {
      console.log('Установка флага наличия магазина...');
      localStorage.setItem('has_shop', 'true');
    }

    try {
      const { worker } = await import('./mocks/browser');

      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
        quiet: false,
      });

      console.log('MSW успешно запущен');
      return true;
    } catch (error) {
      console.error('Ошибка запуска MSW:', error);
      return false;
    }
  }
  return true;
}

initializeMocks().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
});
