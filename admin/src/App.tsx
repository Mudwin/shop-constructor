import { useSelector } from 'react-redux';
import type { RootState } from './store';
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

export default function App() {
  const hasShop = useSelector((state: RootState) => !!state.auth.shop);

  return (
    <BrowserRouter>
      <Routes>
        {/* Общие роуты */}
        <Route path="/profile" element={<Layout type="profile"></Layout>}>
          <Route index element={<ProfilePage />} />
        </Route>
        <Route path="/settings" element={<Layout type="profile" />}>
          <Route index element={<AppSettingsPage />} />
        </Route>
        <Route path="/help" element={<Layout type="profile" />}>
          <Route index element={<HelpPage />} />
        </Route>

        {/* Pre-shop роуты */}
        <Route path="/onboarding" element={<Layout type="onboard" />}>
          <Route index element={<OnboardingPage />} />
          <Route path="step1" element={<CreateShopForm step="step1" />} />
          <Route path="step2" element={<CreateShopForm step="step2" />} />
        </Route>

        {/* Post-shop роуты */}
        <Route path="/dashboard" element={<Layout type="dashboard" />}>
          <Route index element={<DashboardPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="admins" element={<AdminsPage />} />
          <Route path="constructor" element={<ConstructorPage />} />
        </Route>

        {/* Редирект в зависимости от состояния */}
        <Route path="/" element={<Navigate to={hasShop ? '/dashboard' : '/onboarding'} />} />

        {/* Fallback-редирект */}
        <Route path="*" element={<Navigate to={hasShop ? '/dashboard' : '/onboarding'} />} />
      </Routes>
    </BrowserRouter>
  );
}
