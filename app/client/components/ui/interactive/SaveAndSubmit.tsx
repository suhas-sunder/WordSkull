function SaveAndSubmit() {
  return (
    <div className="flex gap-5 mx-auto font-lato mb-8">
      {/* <button
        type="submit"
        className="flex justify-center w-[10em] items-center rounded-md bg-skull-dark-brown text-white px-4 py-2  hover:bg-skull-brown"
      >
        Save Draft
      </button> */}
      <button
        type="submit"
        className="flex justify-center items-center rounded-md text-white px-4 py-2 w-[10em] hover:bg-amber-600 bg-pumpkin-orange "
      >
        Submit
      </button>
    </div>
  );
}

export default SaveAndSubmit;
