"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getJobsList } from "../../services/api";
import { jobsListFilter, jobsListUpdate } from "@/redux/actions/jobsAction";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectTag, setSelectTag] = useState("");
  const [applyId, setApplyId] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const { jobList, filtersJobs } = useSelector(
    (state) => state?.jobsReducer || []
  );
  console.log("jobsListjobListjobList :>> ", jobList);

  console.log("applyId :>> ", applyId);

  const fetchJobsList = async () => {
    setLoading(true);
    try {
      const data = await getJobsList();
      console.log("data", data);
      if (data?.status == "200") {
        dispatch(jobsListUpdate(data?.data));
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobsList();
    const applyJob = JSON.parse(localStorage.getItem("applyJob")) || [];
    const ids = applyJob.map((v) => v.jobApplyId);
    setApplyId(ids);
  }, []);

  useEffect(() => {
    const filtered = jobList?.filter((job) => {
      const titleMatch = job?.jobTitle
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const tagMatch = selectTag ? job?.tags?.includes(selectTag) : true;
      return titleMatch && tagMatch;
    });

    dispatch(jobsListFilter(filtered));
  }, [search, selectTag, jobList]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Job Board</h1>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <input
              type="text"
              placeholder="Search by job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-md w-full sm:w-64"
            />

            <select
              value={selectTag}
              onChange={(e) => setSelectTag(e.target.value)}
              className="border px-4 py-2 rounded-md w-full sm:w-48"
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
              <option value="Fresher">Fresher</option>
            </select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(filtersJobs) && filtersJobs.length > 0 ? (
              filtersJobs?.map((job) => (
                <Link href={`/job/details/${job.id}`}>
                  <div
                    key={job.id}
                    className="bg-white p-6 rounded-2xl h-full shadow hover:shadow-lg transition cursor-pointer"
                  >
                    <h2 className="text-xl font-semibold text-gray-800">
                      {job?.jobTitle}
                    </h2>
                    <p className="text-sm text-gray-500">{job?.companyName}</p>
                    <p className="text-sm text-gray-500 mb-3">
                      {job?.location}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => router.push(`/job/${job.id}`)}
                      disabled={applyId.includes(job.id)}
                      className={`text-white text-sm px-4 py-2 rounded-full transition ${
                        applyId.includes(job.id)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      }`}
                    >
                      {applyId.includes(job.id) ? "Applied" : "Apply"}
                    </button>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">No jobs found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
