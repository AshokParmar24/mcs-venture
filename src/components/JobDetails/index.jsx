import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getJobsDetails } from "@/services/api";
import Link from "next/link";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaBuilding,
  FaLayerGroup,
  FaArrowLeft,
} from "react-icons/fa";
import Head from "next/head";

const JobDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchJob = async () => {
    setLoading(true);
    try {
      const data = await getJobsDetails(id);
      console.log("datatatttt", data);
      if (data?.status == "200") {
        setJob(data?.data);
      }
    } catch (err) {
      console.log("eror", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);
  console.log("jobjobjobjobjob :>> ", job);
  return (
    <>
      {job && (
        <Head>
          <title>
            {job.jobTitle} at {job.companyName} | Job Board
          </title>
          <meta name="description" content={job.description?.slice(0, 160)} />
          <meta
            property="og:title"
            content={`${job.jobTitle} at ${job.companyName}`}
          />
          <meta
            property="og:description"
            content={job.description?.slice(0, 160)}
          />
        </Head>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : job !== null && job !== undefined ? (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-10">
          <div className="flex items-center gap-4 mb-6 flex-wrap ">
            {job.avatar ? (
              <img
                src={job.avatar}
                alt="Company Logo"
                className="w-30 h-30 object-cover rounded-lg"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <FaBuilding className="text-gray-500 text-xl" />
              </div>
            )}

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {job.jobTitle}
              </h1>
              <div className="flex items-center text-gray-600 gap-2 mt-1">
                <FaBriefcase className="text-blue-600" />
                <span>{job.companyName}</span>
              </div>
              <div className="flex items-center text-gray-500 gap-2">
                <FaMapMarkerAlt className="text-blue-600" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-500 gap-2">
                <FaLayerGroup className="text-blue-600" />
                <span>{job.jobArea || "General"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1"></div>
          </div>
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

          <h2 className="text-xl font-semibold mt-6 mb-2">Job Description</h2>
          <p className="text-gray-700">
            {job.description || "No description available."}
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Requirements</h2>
          {job.requirement ? (
            <ul className="list-disc list-inside text-gray-700">
              {job.requirement}
            </ul>
          ) : (
            <p className="text-gray-500">No requirements listed.</p>
          )}
          <div className="flex gap-3 mt-6 items-center">
            <Link href={`/job/${job.id}`}>
              <button className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                Apply Now
              </button>
            </Link>

            <Link href="/">
              <button className=" flex gap-2 bg-gray-600  cursor-pointer items-center text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                <FaArrowLeft />
                <span>Back</span>
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-grey-500 mt-10">Job not found.</p>
      )}
    </>
  );
};

export default JobDetail;
