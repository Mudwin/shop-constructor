import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import OnboardingPage from './pages/onboarding/OnboardingPage';
import ProfilePage from './pages/profile/ProfilePage';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/dashboard/DashboardPage';
import OrdersPage from './pages/dashboard/orders/OrdersPage';
import ProductsPage from './pages/dashboard/products/ProductsPage';
import CustomersPage from './pages/dashboard/customers/CustomersPage';
import SettingsPage from './pages/dashboard/settings/SettingsPage';
import AdminsPage from './pages/dashboard/admins/AdminsPage';
import ConstructorPage from './pages/dashboard/constructor/ConstructorPage';
import CreateShopForm from './pages/onboarding/CreateShopForm';

export default function App() {
  const hasShop = useSelector((state: RootState) => !!state.auth.shop);

  return (
    <BrowserRouter>
      <Routes>
        {/* Общие роуты */}
        <Route path="/profile" element={<Layout type="profile"></Layout>}>
          <Route index element={<ProfilePage />} />
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
