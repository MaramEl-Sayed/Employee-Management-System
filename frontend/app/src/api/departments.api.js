import api from "./axios";

export const getDepartments = async () => {
  const res = await api.get("departments/");
  // Handle paginated response (always returns {results: [...], count, next, previous})
  // or direct array response
  if (Array.isArray(res.data)) {
    return res.data;
  }
  // Paginated response
  return res.data?.results || [];
};

export const getDepartmentsByCompany = async (companyId) => {
  const res = await api.get(`departments/?company=${companyId}`);
  // Handle paginated response (always returns {results: [...], count, next, previous})
  // or direct array response
  return Array.isArray(res.data) ? res.data : (res.data.results || []);
};

export const getDepartment = async (id) => {
  const res = await api.get(`departments/${id}/`);
  return res.data;
};

export const createDepartment = async (data) => {
  const res = await api.post("departments/", data);
  return res.data;
};

export const updateDepartment = async (id, data) => {
  const res = await api.patch(`departments/${id}/`, data);
  return res.data;
};

export const deleteDepartment = async (id) => {
  await api.delete(`departments/${id}/`);
};