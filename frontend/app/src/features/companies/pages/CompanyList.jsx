import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCompanies, deleteCompany } from "../../../api/companies.api";

const CompanyList = () => {
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Companies</h1>

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
          {data.map((company) => (
            <tr key={company.id} className="border-t">
              <td className="p-3">{company.name}</td>
              <td className="p-3 text-center">
                {company.number_of_departments}
              </td>
              <td className="p-3 text-center">
                {company.number_of_employees}
              </td>
              <td className="p-3 text-center space-x-2">
                <button className="text-blue-600">View</button>
                <button className="text-yellow-600">Edit</button>
                <button
                  className="text-red-600"
                  onClick={() => deleteMutation.mutate(company.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
