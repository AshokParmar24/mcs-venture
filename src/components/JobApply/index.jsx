"use client";

import { set, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineFilePdf,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

const JobApply = () => {
  const router = useRouter();
  const { id } = router.query;
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      file: file,
      jobApplyId: id,
    };
    console.log("filedffffffff", file);
    if (!file) {
      setErr(true);
    } else {
      const applyJob = JSON.parse(localStorage.getItem("applyJob")) || [];
      const newApply = [...applyJob, payload];
      localStorage.setItem("applyJob", JSON.stringify(newApply));
      reset();
      setFile(null);
      router.push("/");
    }
  };

  useEffect(() => {
    if (file) {
      setErr(false);
    }
  }, [file]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Apply for this Job
        </h2>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-gray-500 hover:text-gray-700  hover:text-gray-300 cursor-pointer bg-gray-100 rounded-full h-10 w-10 flex justify-center"
          title="Go back"
        >
          <AiOutlineArrowLeft size={24} className="mt-2" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        {file ? (
          <div className="relative w-full flex flex-col items-center gap-2 border rounded-md p-3">
            <button
              onClick={() => setFile(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              title="Remove file"
            >
              <AiOutlineClose size={18} />
            </button>

            <AiOutlineFilePdf className="text-red-500 text-2xl w-16 h-16 object-contain" />

            <span className="text-sm text-gray-700 text-center break-all">
              {file.name}
            </span>
          </div>
        ) : (
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className={`w-full px-3 py-2 rounded h-30 p-2 
                        ${
                          err
                            ? "border border-red-500"
                            : "border border-gray-300"
                        }`}
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (!selectedFile) return;

                const reader = new FileReader();
                reader.onloadend = () => {
                  setFile({
                    name: selectedFile.name,
                    type: selectedFile.type,
                    base64: reader.result,
                  });
                };
                reader.readAsDataURL(selectedFile);
              }}
            />

            <div className="flex justify-center items-center mt-4 absolute top-2 left-45">
              {!file && (
                <div className="flex flex-col items-center">
                  <FiUpload className="text-gray-400 w-12 h-12 opacity-50" />

                  <span className="text-sm text-gray-500 mt-2 cursur-pointer">
                    No resume uploaded
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Cover Letter
          </label>
          <textarea
            {...register("coverLetter", {
              required: "Cover letter is required",
            })}
            className="w-full border px-3 py-2 rounded h-32"
          />
          {errors.coverLetter && (
            <p className="text-red-500 text-sm mt-1">
              {errors.coverLetter.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobApply;
