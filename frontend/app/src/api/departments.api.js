import api from "./axios";

export const getDepartmentsByCompany = async (companyId) => {
  const res = await api.get(`departments/?company=${companyId}`);
  return res.data;
};