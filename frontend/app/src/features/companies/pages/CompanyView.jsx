import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCompany, deleteCompany } from "../../../api/companies.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const CompanyView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: company, isLoading, error } = useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompany(id),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
      navigate("/companies");
    },
  });

  if (isLoading) return <p className="p-6">Loading company...</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load company</p>;
  if (!company) return <p className="p-6">Company not found</p>;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this company? This may affect related departments and employees.")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Company Details</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/companies/${id}/edit`)}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Edit
          </button>
          <button
            onClick={() => navigate("/companies")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-600">Company Name</label>
            <p className="text-lg">{company.name}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Number of Departments</label>
            <p className="text-lg">{company.departments_count || 0}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Number of Employees</label>
            <p className="text-lg">{company.employees_count || 0}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Created At</label>
            <p className="text-lg">
              {company.created_at ? new Date(company.created_at).toLocaleDateString() : "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyView;
