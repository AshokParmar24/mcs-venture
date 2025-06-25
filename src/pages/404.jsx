import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
