import api from "./axios";

export const getEmployees = async (page = 1, search = '') => {
  const params = new URLSearchParams();
  if (page) params.append('page', page);
  if (search) params.append('search', search);
  
  const res = await api.get(`employees/?${params.toString()}`);
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
export const getEmployee = async (id) => {
  const res = await api.get(`employees/${id}/`);
  return res.data;
};

export const updateEmployee = async (id, data) => {
  const res = await api.patch(`employees/${id}/`, data);
  return res.data;
};

export const deleteEmployee = async (id) => {
  await api.delete(`employees/${id}/`);
};
