import { SET_JOBS, SET_JOBS_FILTER } from "@/redux/contants/jobsContants";

const initialState = {
  jobList: [],
  filtersJobs: [],
};

export const jobsReducer = (state = initialState, action) => {
  console.log("actionactionaction :>> ", action);
  switch (action.type) {
    case SET_JOBS:
      return { ...state, jobList: action.payload };
    case SET_JOBS_FILTER:
      return { ...state, filtersJobs: action.payload };
    default:
      return state;
  }
};
