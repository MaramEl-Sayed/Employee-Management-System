import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateCurrentUser } from "../../../api/users.api";
import { useEffect } from "react";

const UserAccountEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
      });
    }
  }, [user, reset]);

  const updateMutation = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["current-user"]);
      navigate("/account");
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateMutation.mutateAsync(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          Object.values(error.response?.data || {}).flat().join(", ") ||
                          "Failed to update account";
      alert(errorMessage);
    }
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Account</h1>
        <button
          onClick={() => navigate("/account")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Username *</label>
          <input
            {...register("username", { required: "Username is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email Address *</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: emailRegex, message: "Invalid email format" }
            })}
            className="w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update Account"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/account")}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAccountEdit;
