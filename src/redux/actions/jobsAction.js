import { SET_JOBS, SET_JOBS_FILTER } from "../contants/jobsContants";

 
export const jobsListUpdate = (data) => {
    console.log('object :>> ', data);
  return { type: SET_JOBS, payload: data };
};

export const jobsListFilter = (data) => {
  return { type: SET_JOBS_FILTER, payload: data };
};
