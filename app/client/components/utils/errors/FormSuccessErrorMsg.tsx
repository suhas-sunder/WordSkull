interface PropType {
  actionData: { error?: string; message?: string };
}

function FormSuccessErrorMsg({ actionData }: PropType) {
  return (
    <div
      className={`${
        actionData?.error || actionData?.message ? "flex" : "hidden"
      } justify-center items-center w-full mb-1 text-lg`}
    >
      {actionData?.error && (
        <div className="text-rose-600">🪦 {actionData.error}</div>
      )}

      {actionData?.message && (
        <div className="text-green-600">🎉 {actionData.message} 🎊</div>
      )}
    </div>
  );
}

export default FormSuccessErrorMsg;
