import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployeeStatus } from "../../../api/employees.api";

const transitions = {
  APPLICATION_RECEIVED: ["INTERVIEW_SCHEDULED", "NOT_ACCEPTED"],
  INTERVIEW_SCHEDULED: ["HIRED", "NOT_ACCEPTED"],
  HIRED: [],
  NOT_ACCEPTED: [],
};

const statusLabels = {
  APPLICATION_RECEIVED: "Schedule Interview",
  INTERVIEW_SCHEDULED: "Hire",
  HIRED: "Hired",
  NOT_ACCEPTED: "Not Accepted",
};

const EmployeeActions = ({ employee }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateEmployeeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
    },
  });

  const allowedTransitions = transitions[employee.status] || [];

  if (allowedTransitions.length === 0) {
    return <span className="text-gray-500 text-sm">No actions available</span>;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {allowedTransitions.map(nextStatus => (
        <button
          key={nextStatus}
          onClick={() => {
            const updateData = { id: employee.id, status: nextStatus };
            if (nextStatus === "HIRED" && !employee.hired_on) {
              updateData.hired_on = new Date().toISOString().split('T')[0];
            }
            mutation.mutate(updateData);
          }}
          className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {statusLabels[nextStatus] || nextStatus.replace('_', ' ')}
        </button>
      ))}
    </div>
  );
};

export default EmployeeActions;
