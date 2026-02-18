import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployee, deleteEmployee } from "../../../api/employees.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EmployeeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: employee, isLoading, error } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployee(id),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      navigate("/employees");
    },
  });

  if (isLoading) return <p className="p-6">Loading employee...</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load employee</p>;
  if (!employee) return <p className="p-6">Employee not found</p>;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Details</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/employees/${id}/edit`)}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Edit
          </button>
          <button
            onClick={() => navigate("/employees")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-600">Name</label>
            <p className="text-lg">{employee.name}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <p className="text-lg">{employee.email}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Mobile Number</label>
            <p className="text-lg">{employee.mobile || "N/A"}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Designation</label>
            <p className="text-lg">{employee.designation}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Company</label>
            <p className="text-lg">{employee.company_name || employee.company}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Department</label>
            <p className="text-lg">{employee.department_name || employee.department}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Status</label>
            <p className="text-lg">
              <span className={`px-3 py-1 rounded text-sm text-white ${
                employee.status === 'HIRED' ? 'bg-green-500' :
                employee.status === 'NOT_ACCEPTED' ? 'bg-red-500' :
                employee.status === 'INTERVIEW_SCHEDULED' ? 'bg-blue-500' :
                'bg-gray-400'
              }`}>
                {employee.status?.replace(/_/g, ' ') || 'N/A'}
              </span>
            </p>
          </div>

          {employee.hired_on && (
            <div>
              <label className="text-sm font-semibold text-gray-600">Hired On</label>
              <p className="text-lg">{new Date(employee.hired_on).toLocaleDateString()}</p>
            </div>
          )}

          {employee.days_employed > 0 && (
            <div>
              <label className="text-sm font-semibold text-gray-600">Days Employed</label>
              <p className="text-lg">{employee.days_employed} days</p>
            </div>
          )}

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Address</label>
            <p className="text-lg">{employee.address || "N/A"}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
