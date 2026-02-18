import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployee, updateEmployee } from "../../../api/employees.api";
import { getCompanies } from "../../../api/companies.api";
import { getDepartmentsByCompany } from "../../../api/departments.api";
import { useState, useEffect } from "react";

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [companyId, setCompanyId] = useState(null);

  const { data: employee, isLoading } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployee(id),
  });

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const { data: departments } = useQuery({
    queryKey: ["departments", companyId],
    queryFn: () => getDepartmentsByCompany(companyId),
    enabled: !!companyId,
  });

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm();

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        email: employee.email,
        mobile: employee.mobile,
        address: employee.address,
        designation: employee.designation,
        company: employee.company,
        department: employee.department,
        status: employee.status,
        hired_on: employee.hired_on || "",
      });
      setCompanyId(employee.company);
    }
  }, [employee, reset, setValue]);

  const watchedCompany = watch("company");
  useEffect(() => {
    if (watchedCompany && watchedCompany !== companyId) {
      setCompanyId(watchedCompany);
      setValue("department", "");
    }
  }, [watchedCompany, companyId, setValue]);

  const updateMutation = useMutation({
    mutationFn: (data) => updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      queryClient.invalidateQueries(["employee", id]);
      navigate(`/employees/${id}`);
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateMutation.mutateAsync(data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update employee");
    }
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^\+?\d{9,15}$/;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Employee</h1>
        <button
          onClick={() => navigate(`/employees/${id}`)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Name *</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email *</label>
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

        <div>
          <label className="block text-sm font-semibold mb-1">Mobile Number *</label>
          <input
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: { value: mobileRegex, message: "Invalid mobile number format" }
            })}
            className="w-full border p-2 rounded"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Address *</label>
          <textarea
            {...register("address", { required: "Address is required" })}
            className="w-full border p-2 rounded"
            rows="3"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Designation *</label>
          <input
            {...register("designation", { required: "Designation is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Company *</label>
          <select
            {...register("company", { required: "Company is required" })}
            className="w-full border p-2 rounded"
            onChange={(e) => setCompanyId(e.target.value)}
          >
            <option value="">Select Company</option>
            {companies?.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Department *</label>
          <select
            {...register("department", { required: "Department is required" })}
            className="w-full border p-2 rounded"
            disabled={!companyId}
          >
            <option value="">Select Department</option>
            {departments?.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Status *</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="APPLICATION_RECEIVED">Application Received</option>
            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
            <option value="HIRED">Hired</option>
            <option value="NOT_ACCEPTED">Not Accepted</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Hired On</label>
          <input
            type="date"
            {...register("hired_on")}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update Employee"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/employees/${id}`)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEdit;
