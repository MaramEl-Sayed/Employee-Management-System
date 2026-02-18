import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getDepartment, updateDepartment } from "../../../api/departments.api";
import { getCompanies } from "../../../api/companies.api";
import { useEffect } from "react";

const DepartmentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: department, isLoading } = useQuery({
    queryKey: ["department", id],
    queryFn: () => getDepartment(id),
  });

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (department) {
      reset({
        name: department.name,
        company: department.company,
      });
    }
  }, [department, reset]);

  const updateMutation = useMutation({
    mutationFn: (data) => updateDepartment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
      queryClient.invalidateQueries(["department", id]);
      navigate(`/departments/${id}`);
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateMutation.mutateAsync(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          Object.values(error.response?.data || {}).flat().join(", ") ||
                          "Failed to update department";
      alert(errorMessage);
    }
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Department</h1>
        <button
          onClick={() => navigate(`/departments/${id}`)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Department Name *</label>
          <input
            {...register("name", { required: "Department name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Company *</label>
          <select
            {...register("company", { required: "Company is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Company</option>
            {companies?.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update Department"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/departments/${id}`)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentEdit;
