import axiosInstance from "./axios";

export const getJobsList = (payload) => {
  return axiosInstance.get("jobs", payload);
};
