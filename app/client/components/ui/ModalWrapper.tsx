import Icon from "../utils/other/Icon";

interface PropType {
  setShowModal: (value: boolean) => void;
  children: JSX.Element;
  customClass?: string;
}

//Creates a modal that wraps the children passed in
function ModalWrapper({ setShowModal, children, customClass }: PropType) {
  return (
    <>
      <div
        className={`absolute font-roboto overflow-auto left-1/2 -translate-x-1/2 z-[50] items-center flex -translate-y-1/2 bg-white max-w-[44em] w-full min-h-[20em] rounded-lg flex-col gap-7 ${customClass}`}
      >
        <button
          data-testid="close-modal"
          onClick={() => setShowModal(false)}
          className="flex absolute top-[0.8em] right-[0.8em] z-[60]"
        >
          <Icon icon="close" />
        </button>
        {children}
      </div>
      <button
        data-testid="modal-background"
        onClick={() => setShowModal(false)}
        className="fixed inset-0 h-full w-full flex bg-skull-brown bg-opacity-10 z-30 justify-center"
      ></button>
    </>
  );
}

export default ModalWrapper;
