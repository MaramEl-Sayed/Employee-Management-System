import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../api/users.api";

const UserAccountView = () => {
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  if (isLoading) return <p className="p-6">Loading account...</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load account</p>;
  if (!user) return <p className="p-6">User not found</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Account</h1>
        <button
          onClick={() => navigate("/account/edit")}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Edit Account
        </button>
      </div>

      <div className="bg-white shadow rounded p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-600">Username</label>
            <p className="text-lg">{user.username}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Email Address</label>
            <p className="text-lg">{user.email}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Role</label>
            <p className="text-lg">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                {user.role}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountView;
