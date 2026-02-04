import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../../../api/departments.api";

const DepartmentList = () => {
  const { data } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <ul className="bg-white rounded shadow">
        {data?.map(dep => (
          <li key={dep.id} className="p-3 border-b">
            {dep.name} — {dep.company_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
