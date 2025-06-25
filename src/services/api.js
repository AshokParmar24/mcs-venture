import axiosInstance from "./axios";

export const getJobsList = (payload) => {
  return axiosInstance.get("jobs", payload);
};

export const getJobsDetails = (id, payload) => {
  return axiosInstance.get(`jobs/${id}`, payload);
};
