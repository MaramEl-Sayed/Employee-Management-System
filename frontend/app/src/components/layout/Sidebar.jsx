import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-4">
      <nav className="space-y-3">
        <NavLink to="/" className="block hover:text-blue-400">Dashboard</NavLink>
        <NavLink to="/companies" className="block hover:text-blue-400">Companies</NavLink>
        <NavLink to="/departments" className="block hover:text-blue-400">Departments</NavLink>
        <NavLink to="/employees" className="block hover:text-blue-400">Employees</NavLink>
        <NavLink to="/employees/report" className="block hover:text-blue-400">Employee Report</NavLink>
        <NavLink to="/account" className="block hover:text-blue-400">My Account</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
