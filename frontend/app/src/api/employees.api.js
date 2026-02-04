import api from "./axios";

export const getEmployees = async ({ page, search }) => {
  const res = await api.get(
    `employees/?page=${page}&search=${search}`
  );
  return res.data;
};

export const createEmployee = async (data) => {
  const res = await api.post("employees/", data);
  return res.data;
};

export const updateEmployeeStatus = async ({ id, status }) => {
  const res = await api.patch(`employees/${id}/`, { status });
  return res.data;
};
export const getEmployee = (id) => api.get(`employees/${id}/`);
export const deleteEmployee = (id) => api.delete(`employees/${id}/`);
