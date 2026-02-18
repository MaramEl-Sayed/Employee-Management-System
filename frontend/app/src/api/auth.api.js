import api from './axios';


export const registerUser = async (data) => {
  const res = await api.post("auth/register/", data);
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await api.post("auth/login/", { email, password });
  return res.data;
};