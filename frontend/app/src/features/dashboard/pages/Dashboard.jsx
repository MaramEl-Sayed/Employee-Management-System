import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../../../api/dashboard.api";

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
  });

  if (isLoading) return <p className="p-6">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load dashboard</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardCard title="Companies" value={data.companies} />
        <DashboardCard title="Departments" value={data.departments} />
        <DashboardCard title="Total Employees" value={data.employees} />
        <DashboardCard title="Hired Employees" value={data.hired_employees} />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div className="bg-white rounded shadow p-6">
    <p className="text-gray-500">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
