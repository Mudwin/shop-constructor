import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { initializeAuth } from './store/slices/authSlice';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import OnboardingPage from './pages/onboarding/OnboardingPage/OnboardingPage';
import ProfilePage from './pages/profile/ProfilePage';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/dashboard/DashboardPage/DashboardPage';
import OrdersPage from './pages/dashboard/OrdersPage/OrdersPage';
import ProductsPage from './pages/dashboard/ProductsPage/ProductsPage';
import CustomersPage from './pages/dashboard/CustomersPage/CustomersPage';
import SettingsPage from './pages/dashboard/SettingsPage/SettingsPage';
import AdminsPage from './pages/dashboard/AdminsPage/AdminsPage';
import ConstructorPage from './pages/dashboard/ConstructorPage/ConstructorPage';
import CreateShopForm from './pages/onboarding/CreateShopForm/CreateShopForm';
import AppSettingsPage from './pages/settings/AppSettingsPage';
import HelpPage from './pages/help/HelpPage';
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage';
import AddProductPage from './pages/dashboard/AddProductPage/AddProductPage';
import EditProductPage from './pages/dashboard/EditProductPage/EditProductPage';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isInitializing, setIsInitializing] = useState(true);

  const hasShop = useSelector((state: RootState) => !!state.auth.shop);
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    const init = async () => {
      await dispatch(initializeAuth());
      setIsInitializing(false);
    };
    init();
  }, [dispatch]);

  const isAuthCallback = window.location.pathname === '/auth-callback';

  if (isInitializing || isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div>Загрузка...</div>
      </div>
    );
  }

  console.log('App State:', {
    userId,
    isInitializing,
    isLoading,
    isAuthCallback,
    path: window.location.pathname,
  });

  if (!userId && !isAuthCallback) {
    console.warn('REDIRECTING TO AUTH-CALLBACK BECAUSE userId IS EMPTY');

    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/auth-callback" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth-callback" element={<AuthCallbackPage />} />

        <Route path="/profile" element={<Layout type="profile" />}>
          <Route index element={<ProfilePage />} />
        </Route>
        <Route path="/settings" element={<Layout type="profile" />}>
          <Route index element={<AppSettingsPage />} />
        </Route>
        <Route path="/help" element={<Layout type="profile" />}>
          <Route index element={<HelpPage />} />
        </Route>

        <Route path="/onboarding" element={<Layout type="onboard" />}>
          <Route index element={<OnboardingPage />} />
          <Route path="step1" element={<CreateShopForm step="step1" />} />
          <Route path="step2" element={<CreateShopForm step="step2" />} />
        </Route>

        <Route path="/dashboard" element={<Layout type="dashboard" />}>
          <Route index element={<DashboardPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/add" element={<AddProductPage />} />
          <Route path="products/edit/:productId" element={<EditProductPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="admins" element={<AdminsPage />} />
          <Route path="constructor" element={<ConstructorPage />} />
        </Route>

        <Route path="/" element={<Navigate to={hasShop ? '/dashboard' : '/onboarding'} />} />

        <Route path="*" element={<Navigate to={hasShop ? '/dashboard' : '/onboarding'} />} />
      </Routes>
    </BrowserRouter>
  );
}
