import { Link } from "react-router-dom";

// Accepting status and message as props to handle dynamic error content
function Error({ status, message }: { status: number; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-center">
      <span className="text-9xl mb-8 animate-scalePulse">☠️</span>
      <h1 className="text-6xl font-bold text-rose-500">
        Uh Oh, {status}
      </h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        {message}
      </h2>
      <p className="mt-2 text-gray-600">
        Please check the URL that you are trying to access.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default Error;
