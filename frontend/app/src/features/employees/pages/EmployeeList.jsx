import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../../../api/employees.api";
import EmployeeActions from "../components/EmployeeActions";
import { useNavigate } from "react-router-dom";

const statusColors = {
  APPLICATION: "bg-gray-400",
  INTERVIEW: "bg-blue-500",
  HIRED: "bg-green-500",
  REJECTED: "bg-red-500",
};

const EmployeeList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["employees", page, search],
    queryFn: () => getEmployees(page, search),
  });

  if (isLoading) return <p className="p-6">Loading employees...</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load employees</p>;

  // Handle paginated response for employees (getEmployees returns full paginated object)
  const employees = Array.isArray(data) ? data : (data?.results || []);
  const hasNext = data?.next !== null && data?.next !== undefined;
  const hasPrevious = data?.previous !== null && data?.previous !== undefined;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button
          onClick={() => navigate("/employees/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Employee
        </button>
      </div>
      
      <input
        placeholder="Search employee..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border p-2 mb-3 rounded w-full max-w-md"
      />

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map(emp => (
                <tr key={emp.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.company_name || 'N/A'}</td>
                  <td className="p-3">{emp.department_name || 'N/A'}</td>
                  <td className="p-3">
                    <span className={`text-white px-2 py-1 rounded text-sm ${
                      emp.status === 'HIRED' ? 'bg-green-500' :
                      emp.status === 'NOT_ACCEPTED' ? 'bg-red-500' :
                      emp.status === 'INTERVIEW_SCHEDULED' ? 'bg-blue-500' :
                      'bg-gray-400'
                    }`}>
                      {emp.status?.replace('_', ' ') || 'N/A'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/employees/${emp.id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/employees/${emp.id}/edit`)}
                        className="text-yellow-600 hover:underline"
                      >
                        Edit
                      </button>
                      <EmployeeActions employee={emp} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex gap-3 mt-4 items-center">
        <button
          disabled={!hasPrevious}
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={!hasNext}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
