import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCompanies, deleteCompany } from "../../../api/companies.api";

const CompanyList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
    },
  });

  if (isLoading) return <p className="p-6">Loading companies...</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load companies</p>;

  // Data should already be an array from the API function
  const companies = Array.isArray(data) ? data : [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Companies</h1>
        <button
          onClick={() => navigate("/companies/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Company
        </button>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3">Departments</th>
            <th className="p-3">Employees</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {companies.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-6 text-center text-gray-500">
                No companies found
              </td>
            </tr>
          ) : (
            companies.map((company) => (
            <tr key={company.id} className="border-t">
              <td className="p-3">{company.name}</td>
              <td className="p-3 text-center">
                {company.departments_count || 0}
              </td>
              <td className="p-3 text-center">
                {company.employees_count || 0}
              </td>
              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => navigate(`/companies/${company.id}`)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/companies/${company.id}/edit`)}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this company?")) {
                      deleteMutation.mutate(company.id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
