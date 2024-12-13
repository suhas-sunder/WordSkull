interface PropType {
  error: unknown;
  customError?: string;
  status: number;
}

function ProcessTryCatchErrors({ error, customError, status }: PropType) {
  if (error instanceof Error) {
    return new Response(
      JSON.stringify({ error: `An error occurred: ${error.message}` }),
      {
        status: status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

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

export default ProcessTryCatchErrors;
