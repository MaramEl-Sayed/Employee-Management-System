import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../../../api/companies.api";
import { getDepartmentsByCompany } from "../../../api/departments.api";
import { createEmployee } from "../../../api/employees.api";
import { useState } from "react";

const EmployeeCreate = () => {
  const { register, handleSubmit, watch } = useForm();
  const [companyId, setCompanyId] = useState(null);

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const { data: departments } = useQuery({
    queryKey: ["departments", companyId],
    queryFn: () => getDepartmentsByCompany(companyId),
    enabled: !!companyId,
  });

  const onSubmit = async (data) => {
    await createEmployee(data);
    alert("Employee created");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
      <input {...register("name")} placeholder="Name" className="input" />
      <input {...register("email")} placeholder="Email" />
      
      <select
        {...register("company")}
        onChange={(e) => setCompanyId(e.target.value)}
      >
        <option>Select Company</option>
        {companies?.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select {...register("department")}>
        <option>Select Department</option>
        {departments?.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
};

export default EmployeeCreate;
