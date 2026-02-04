import { useAuth } from "../../auth/useAuth";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between">
      <h1 className="font-bold">Employee Management System</h1>
      <button
        onClick={logout}
        className="text-red-600 font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
