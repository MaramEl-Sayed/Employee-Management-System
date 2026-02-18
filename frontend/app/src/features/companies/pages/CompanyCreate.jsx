import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../../../api/companies.api";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const createMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["companies"]);
      navigate(`/companies/${data.id}`);
    },
  });

  const onSubmit = async (data) => {
    try {
      await createMutation.mutateAsync(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          Object.values(error.response?.data || {}).flat().join(", ") ||
                          "Failed to create company";
      alert(errorMessage);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create Company</h1>
        <button
          onClick={() => navigate("/companies")}
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
            placeholder="Enter company name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Creating..." : "Create Company"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/companies")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyCreate;
