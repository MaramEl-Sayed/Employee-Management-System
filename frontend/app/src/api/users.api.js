import api from "./axios";

export const getCurrentUser = async () => {
  const res = await api.get("auth/me/");
  return res.data;
};

export const updateCurrentUser = async (data) => {
  const res = await api.patch("auth/me/", data);
  return res.data;
};
