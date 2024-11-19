interface PropType {
  legend: string;
  firstOption: string;
  secondOption: string;
  id: string;
  name: string;
  firstInputChecked: boolean;
  secondInputChecked: boolean;
}

function TwoRadioInputs({
  legend,
  firstOption,
  secondOption,
  id,
  name,
  firstInputChecked,
  secondInputChecked,
}: PropType) {
  return (
    <fieldset className="flex items-center gap-4">
      <div>
        <legend className="text-lg font-medium inline-block">{legend}:</legend>
      </div>
      <label className="flex items-center">
        <input
          type="radio"
          id={id + firstOption}
          name={name}
          defaultChecked={firstInputChecked}
          value="yes"
          className="cursor-pointer h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
        />
        <span className="ml-2">{firstOption}</span>
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          id={id + secondOption}
          name={name}
          defaultChecked={secondInputChecked}
          value="no"
          className="cursor-pointer h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
        />
        <span className="ml-2">{secondOption}</span>
      </label>
    </fieldset>
  );
}

export default TwoRadioInputs;
