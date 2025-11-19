import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Administrators from './pages/Administrators/Administrators';
import Clients from './pages/Clients/Clients';
import Constructor from './pages/Constructor/Constructor';
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Orders/Orders';
import Products from './pages/Products/Products';
import Settings from './pages/Settings/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/administrators" element={<Administrators />} />
        <Route path="/constructor" element={<Constructor />} />
      </Routes>
    </BrowserRouter>
  );
}
