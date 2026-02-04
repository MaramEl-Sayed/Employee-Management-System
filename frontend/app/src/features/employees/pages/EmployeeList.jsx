import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../../../api/employees.api";
import EmployeeActions from "../components/EmployeeActions";

const statusColors = {
  APPLICATION: "bg-gray-400",
  INTERVIEW: "bg-blue-500",
  HIRED: "bg-green-500",
  REJECTED: "bg-red-500",
};

const EmployeeList = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["employees", page],
    queryFn: () => getEmployees(page),
  });
  const [search, setSearch] = useState("");

  if (isLoading) return <p className="p-6">Loading employees...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <input
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-3"
      />

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(emp => (
            <tr key={emp.id} className="border-t">
              <td className="p-3">{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.company_name}</td>
              <td>{emp.department_name}</td>
              <td>
                <span className={`text-white px-2 py-1 rounded text-sm ${statusColors[emp.status]}`}>
                  {emp.status}
                </span>
              </td>
              <td><EmployeeActions employee={emp} /></td>

            </tr>
          ))}
        </tbody>
      </table>
         <div className="flex gap-3 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            disabled={!data?.next}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>

    </div>
  );
};

export default EmployeeList;
