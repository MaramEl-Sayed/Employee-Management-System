import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployeeStatus } from "../../../api/employees.api";

const transitions = {
  APPLICATION: ["INTERVIEW", "REJECTED"],
  INTERVIEW: ["HIRED", "REJECTED"],
  HIRED: [],
  REJECTED: [],
};

const EmployeeActions = ({ employee }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateEmployeeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
    },
  });

  return (
    <div className="flex gap-2">
      {transitions[employee.status].map(next => (
        <button
          key={next}
          onClick={() =>
            mutation.mutate({ id: employee.id, status: next })
          }
          className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
        >
          {next}
        </button>
      ))}
    </div>
  );
};

export default EmployeeActions;
