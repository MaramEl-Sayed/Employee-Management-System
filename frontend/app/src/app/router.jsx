import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Register from '../pages/Register';
import ProtectedRoute from '../auth/ProtectedRoute';
import Dashboard from '../features/dashboard/pages/Dashboard';
import CompanyList from '../features/companies/pages/CompanyList';
import EmployeeList from '../features/employees/pages/EmployeeList';
import AppLayout from '../components/layout/AppLayout';
// import CompanyView from '../features/companies/pages/CompanyView';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
      
        <Route index element={<Dashboard />} />
        <Route path="companies" element={<CompanyList />} />
        <Route path="employees" element={<EmployeeList />} />
        {/* <Route path="companies/:id" element={<CompanyView />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
