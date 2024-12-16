import { Fragment, useMemo } from "react";
import IndieGameLinksData from "../data/IndieGameLinks";
import IndieSocialLinks from "../data/IndieSocialLinks";
import IndieDonationLinks from "../data/IndieDonationLinks";
import TextInput from "./TextInput";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";
import { Form } from "@remix-run/react";
import { ActionDataMsgErr } from "../utils/errors/ProcessErrors";
import FormSuccessErrorMsg from "../utils/errors/FormSuccessErrorMsg";

interface PropType {
  data: Record<string, unknown>;
  actionData: ActionDataMsgErr;
}

function IndieGameLinksForm({ data, actionData }: PropType) {
  const linkData = useMemo(() => IndieGameLinksData(), []);
  const socialsData = useMemo(() => IndieSocialLinks(), []);
  const donoData = useMemo(() => IndieDonationLinks(), []);

  return (
    <Form
      method="post"
      className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
    >
      <input
        type="text"
        id="placeholder-indie-game-links"
        name="placeholder-indie-game-links"
        className="hidden"
      />
      <div className="flex flex-col gap-5 text-lg">
        <h3 className="whitespace-nowrap font-lora w-full justify-center items-center text-center">
          Links To Your Game (Optional)
        </h3>
        {linkData.map((link) => (
          <Fragment key={link.key}>
            <TextInput
              id={link.id}
              name={link.name}
              value={(data?.[`${link.name}Url`] as string) || undefined}
              label={link.label}
              maxLength={255}
              placeholder={link.placeholder}
            />
          </Fragment>
        ))}
      </div>
      <div className="flex flex-col gap-5 text-lg">
        <h3 className="whitespace-nowrap font-lora w-full justify-center items-center text-center">
          Social Media Links (Optional - 255 chars max)
        </h3>
        {socialsData.map((link) => (
          <Fragment key={link.key}>
            <TextInput
              id={link.id}
              name={link.name}
              label={link.label}
              value={(data?.[`${link.name}Url`] as string) || undefined}
              maxLength={255}
              placeholder={link.placeholder}
            />
          </Fragment>
        ))}
      </div>
      <div className="flex flex-col gap-5 text-lg">
        <h3 className="whitespace-nowrap font-lora w-full justify-center items-center text-center">
          Support/Donation Links (Optional)
        </h3>
        {donoData.map((link) => (
          <Fragment key={link.key}>
            <TextInput
              id={link.id}
              name={link.name}
              label={link.label}
              value={(data?.[`${link.name}Url`] as string) || undefined}
              maxLength={255}
              placeholder={link.placeholder}
            />
          </Fragment>
        ))}
      </div>
      <IndieTOSCheckbox id="indie-terms-two" />
      <FormSuccessErrorMsg actionData={actionData} />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGameLinksForm;
