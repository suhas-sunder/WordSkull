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

      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          id={id + firstOption}
          name={name}
          defaultChecked={firstInputChecked}
          value="yes"
          className="appearance-none cursor-pointer w-4 h-4 rounded-full border-2 border-orange-400 bg-white checked:bg-orange-500 checked:border-orange-200 focus:outline-none relative"
        />
        <span className="ml-2">{firstOption}</span>
      </label>

      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          id={id + secondOption}
          name={name}
          defaultChecked={secondInputChecked}
          value="no"
          className="appearance-none cursor-pointer w-4 h-4 rounded-full border-2 border-orange-400 bg-white checked:bg-orange-500 checked:border-orange-200 focus:outline-none relative"
        />
        <span className="ml-2">{secondOption}</span>
      </label>
    </fieldset>
  );
}

export default TwoRadioInputs;
