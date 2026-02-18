import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../../../api/employees.api";
import { useState } from "react";

const EmployeeReport = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["employees-report", page, search],
    queryFn: () => getEmployees(page, search),
  });

  if (isLoading) return <p className="p-6">Loading report...</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load report</p>;

  // Handle both paginated and non-paginated responses, then filter only hired employees
  const allEmployees = Array.isArray(data) ? data : (data?.results || []);
  const employees = allEmployees.filter(
    emp => emp.status === "HIRED"
  );

  const hasNext = data?.next !== null && data?.next !== undefined;
  const hasPrevious = data?.previous !== null && data?.previous !== undefined;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Report - Hired Employees</h1>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print Report
        </button>
      </div>

      <div className="mb-4">
        <input
          placeholder="Search employee..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded w-full max-w-md"
        />
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Employee Name</th>
              <th className="p-3 text-left">Email Address</th>
              <th className="p-3 text-left">Mobile Number</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Hired On</th>
              <th className="p-3 text-left">Days Employed</th>
              <th className="p-3 text-left">Company Name</th>
              <th className="p-3 text-left">Department Name</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No hired employees found
                </td>
              </tr>
            ) : (
              employees.map(emp => (
                <tr key={emp.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.email}</td>
                  <td className="p-3">{emp.mobile || "N/A"}</td>
                  <td className="p-3">{emp.designation}</td>
                  <td className="p-3">
                    {emp.hired_on ? new Date(emp.hired_on).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="p-3">{emp.days_employed || 0} days</td>
                  <td className="p-3">{emp.company_name || "N/A"}</td>
                  <td className="p-3">{emp.department_name || "N/A"}</td>
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

      <div className="mt-4 text-sm text-gray-600">
        Total Hired Employees: {employees.length}
      </div>
    </div>
  );
};

export default EmployeeReport;
