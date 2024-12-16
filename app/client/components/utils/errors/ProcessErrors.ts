import { AxiosError } from "axios";

interface PropType {
  error: unknown;
  customError?: string;
  status: number;
}

export type ActionDataMsgErr = {
  error?: string;
  message?: string;
};

//Process errors thrown in try/catch blocks, etc. to return an appropriate JSON response
export default function ProcessErrors({
  error,
  customError,
  status,
}: PropType) {
  const handleErrorType = (error: Error) => {
    return error.message.includes("500")
      ? "Internal Server Error"
      : "An error occurred";
  };

  // Axios-specific error (e.g., status 4xx or 5xx)
  if (error instanceof AxiosError) {
    const errorMessage =
      error.response?.data?.message || "API Error: Unknown issue";
    const errorStatus = error.response?.status || 500;

    return new Response(
      JSON.stringify({
        error: `${handleErrorType(error)}: ${errorMessage}`,
      }),
      {
        status: errorStatus,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else if (error instanceof Error) {
    // Standard Error (e.g., JavaScript error)
    return new Response(
      JSON.stringify({
        error: `${
          // If the error message has a colon, it already has the error type included so no need to add it
          error.message.includes(":") ? "" : handleErrorType(error)
        }: ${error?.message}`,
      }),
      {
        status: status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    // Unknown error type (e.g., not an instance of Error or AxiosError) where I might send in a custom error.
    return new Response(
      JSON.stringify({
        error: customError ? customError : "An unknown error occurred.",
      }),
      {
        status: status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
