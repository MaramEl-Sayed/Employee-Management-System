import api from "./axios";

export const getCompanies = async () => {
  const res = await api.get("companies/");
  // Handle paginated response (always returns {results: [...], count, next, previous})
  // or direct array response
  if (Array.isArray(res.data)) {
    return res.data;
  }
  // Paginated response
  return res.data?.results || [];
};

export const getCompany = async (id) => {
  const res = await api.get(`companies/${id}/`);
  return res.data;
};

export const createCompany = async (data) => {
  const res = await api.post("companies/", data);
  return res.data;
};

export const updateCompany = async (id, data) => {
  const res = await api.patch(`companies/${id}/`, data);
  return res.data;
};

export const deleteCompany = async (id) => {
  await api.delete(`companies/${id}/`);
};

