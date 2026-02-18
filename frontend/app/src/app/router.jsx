import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Register from '../pages/Register';
import ProtectedRoute from '../auth/ProtectedRoute';
import Dashboard from '../features/dashboard/pages/Dashboard';
import CompanyList from '../features/companies/pages/CompanyList';
import CompanyView from '../features/companies/pages/CompanyView';
import CompanyEdit from '../features/companies/pages/CompanyEdit';
import CompanyCreate from '../features/companies/pages/CompanyCreate';
import DepartmentList from '../features/departments/pages/DepartmentList';
import DepartmentView from '../features/departments/pages/DepartmentView';
import DepartmentEdit from '../features/departments/pages/DepartmentEdit';
import DepartmentCreate from '../features/departments/pages/DepartmentCreate';
import EmployeeList from '../features/employees/pages/EmployeeList';
import EmployeeView from '../features/employees/pages/EmployeeView';
import EmployeeEdit from '../features/employees/pages/EmployeeEdit';
import EmployeeCreate from '../features/employees/pages/EmployeeCreate';
import EmployeeReport from '../features/employees/pages/EmployeeReport';
import UserAccountView from '../features/users/pages/UserAccountView';
import UserAccountEdit from '../features/users/pages/UserAccountEdit';
import AppLayout from '../components/layout/AppLayout';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        
        {/* Companies Routes */}
        <Route path="companies" element={<CompanyList />} />
        <Route path="companies/create" element={<CompanyCreate />} />
        <Route path="companies/:id" element={<CompanyView />} />
        <Route path="companies/:id/edit" element={<CompanyEdit />} />
        
        {/* Departments Routes */}
        <Route path="departments" element={<DepartmentList />} />
        <Route path="departments/create" element={<DepartmentCreate />} />
        <Route path="departments/:id" element={<DepartmentView />} />
        <Route path="departments/:id/edit" element={<DepartmentEdit />} />
        
        {/* Employees Routes */}
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/create" element={<EmployeeCreate />} />
        <Route path="employees/:id" element={<EmployeeView />} />
        <Route path="employees/:id/edit" element={<EmployeeEdit />} />
        <Route path="employees/report" element={<EmployeeReport />} />
        
        {/* User Account Routes */}
        <Route path="account" element={<UserAccountView />} />
        <Route path="account/edit" element={<UserAccountEdit />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
