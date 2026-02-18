import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getDepartment, deleteDepartment } from "../../../api/departments.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DepartmentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: department, isLoading, error } = useQuery({
    queryKey: ["department", id],
    queryFn: () => getDepartment(id),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
      navigate("/departments");
    },
  });

  if (isLoading) return <p className="p-6">Loading department...</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load department</p>;
  if (!department) return <p className="p-6">Department not found</p>;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this department? This may affect related employees.")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Department Details</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/departments/${id}/edit`)}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Edit
          </button>
          <button
            onClick={() => navigate("/departments")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-600">Department Name</label>
            <p className="text-lg">{department.name}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Company</label>
            <p className="text-lg">{department.company_name || department.company}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Number of Employees</label>
            <p className="text-lg">{department.employees_count || 0}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Department
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentView;
