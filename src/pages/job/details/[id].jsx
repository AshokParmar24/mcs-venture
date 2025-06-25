import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getJobsDetails } from "@/services/api";
import Link from "next/link";
import { FaBriefcase, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

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
      if (data?.status === "200") {
        setJob(data?.data);
      }
    } catch (err) {
      console.error("Failed to load job details", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : job !== null && job !== undefined ? (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-10">
          <div className="flex items-center gap-4 mb-6">
            {job.logo ? (
              <img
                src={job.logo}
                alt="Company Logo"
                className="w-16 h-16 object-cover rounded-lg"
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
                <FaBriefcase />
                <span>{job.companyName}</span>
              </div>
              <div className="flex items-center text-gray-500 gap-2">
                <FaMapMarkerAlt />
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-2">Job Description</h2>
          <p className="text-gray-700">
            {job.description || "No description available."}
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Requirements</h2>
          {Array.isArray(job.requirement) ? (
            <ul className="list-disc list-inside text-gray-700">
              {job.requirement.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No requirements listed.</p>
          )}

          <Link href={`/apply/${job.id}`} className="inline-block mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
              Apply Now
            </button>
          </Link>

          <div className="mt-4">
            <Link href="/">
              <span className="text-blue-500 underline cursor-pointer">
                ← Back to Jobs
              </span>
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
