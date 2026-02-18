import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getDepartments, deleteDepartment } from "../../../api/departments.api";

const DepartmentList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
    },
  });

  if (isLoading) return <p className="p-6">Loading departments...</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load departments</p>;

  // Data should already be an array from the API function, but ensure it is
  const departments = Array.isArray(data) ? data : [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Departments</h1>
        <button
          onClick={() => navigate("/departments/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Department
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Employees</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No departments found
                </td>
              </tr>
            ) : (
              departments.map(dep => (
                <tr key={dep.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{dep.name}</td>
                  <td className="p-3">{dep.company_name || dep.company || 'N/A'}</td>
                  <td className="p-3">{dep.employees_count || 0}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/departments/${dep.id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/departments/${dep.id}/edit`)}
                        className="text-yellow-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this department?")) {
                            deleteMutation.mutate(dep.id);
                          }
                        }}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentList;
