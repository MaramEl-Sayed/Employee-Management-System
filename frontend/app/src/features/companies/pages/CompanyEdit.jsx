import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCompany, updateCompany } from "../../../api/companies.api";
import { useEffect } from "react";

const CompanyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: company, isLoading } = useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompany(id),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
      });
    }
  }, [company, reset]);

  const updateMutation = useMutation({
    mutationFn: (data) => updateCompany(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
      queryClient.invalidateQueries(["company", id]);
      navigate(`/companies/${id}`);
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateMutation.mutateAsync(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          Object.values(error.response?.data || {}).flat().join(", ") ||
                          "Failed to update company";
      alert(errorMessage);
    }
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Company</h1>
        <button
          onClick={() => navigate(`/companies/${id}`)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Company Name *</label>
          <input
            {...register("name", { required: "Company name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update Company"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/companies/${id}`)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyEdit;
