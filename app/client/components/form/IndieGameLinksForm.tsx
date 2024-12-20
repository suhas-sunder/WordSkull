import { Fragment } from "react";
import TextInput from "./TextInput";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";
import { Form } from "@remix-run/react";
import { ActionDataMsgErr } from "../utils/errors/ProcessErrors";
import FormSuccessErrorMsg from "../utils/errors/FormSuccessErrorMsg";

interface PropType {
  data: Record<string, unknown>;
  actionData: ActionDataMsgErr;
  trackFormSubmitted: string;
  setTrackFormSubmitted: React.Dispatch<React.SetStateAction<string>>;
  formName: string;
  linkData: { [key: string]: string }[];
  formTitle: string;
}

function IndieGameLinksForm({
  data,
  actionData,
  trackFormSubmitted,
  setTrackFormSubmitted,
  formName,
  linkData,
  formTitle,
}: PropType) {
  return (
    <Form
      method="post"
      onSubmit={() => setTrackFormSubmitted(formName)}
      className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
    >
      <input
        type="text"
        id={`placeholder-indie-${formName}`}
        name={`placeholder-indie-${formName}`}
        className="hidden"
      />
      <div className="flex flex-col gap-5 text-lg">
        <h3 className="whitespace-nowrap font-lora w-full justify-center items-center text-center">
          {formTitle} (Optional)
        </h3>
        {linkData.map((link) => (
          <Fragment key={link.key}>
            <TextInput
              id={link.id}
              name={link.name}
              value={(data[`${link.name}`] as string) || undefined}
              label={link.label}
              maxLength={255}
              placeholder={link.placeholder}
            />
          </Fragment>
        ))}
      </div>
      <IndieTOSCheckbox id={`indie-terms-two-${formName}`} />
      {trackFormSubmitted === formName && (
        <FormSuccessErrorMsg actionData={actionData} />
      )}
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGameLinksForm;
