import { useSelector } from 'react-redux';
import type { RootState } from './store';
import OnboardingPage from './pages/onboarding/OnboardingPage';
import ProfilePage from './pages/profile/ProfilePage';
import DashboardLayout from './components/layout/Dashboard/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import OrdersPage from './pages/dashboard/orders/OrdersPage';
import ProductsPage from './pages/dashboard/products/ProductsPage';
import CustomersPage from './pages/dashboard/customers/CustomersPage';
import SettingsPage from './pages/dashboard/settings/SettingsPage';
import AdminsPage from './pages/dashboard/admins/AdminsPage';
import ConstructorPage from './pages/dashboard/constructor/ConstructorPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

export default function App() {
  const hasShop = useSelector((state: RootState) => !!state.auth.shop);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {hasShop && (
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="constructor" element={<ConstructorPage />} />
          </Route>
        )}

        <Route path="*" element={<Navigate to={hasShop ? '/dashboard' : '/onboarding'} />} />
      </Routes>
    </BrowserRouter>
  );
}
