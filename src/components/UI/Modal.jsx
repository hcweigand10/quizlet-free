import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ options, className, children }) => {
  const { visible, setVisible, title, locked = false } = options;

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => locked ? null : setVisible(false)}
      >
        {/* Modal background */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-md transition-opacity" />
        </Transition.Child>

        {/* Modal body */}
        <div className="flex min-h-full items-center justify-center p-6 sm:p-0 fixed inset-0 z-10">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative rounded-lg shadow-xl text-left transition-all sm:my-8 sm:w-full sm:max-w-lg bg-white p-5">
              <div className="gap-2 flex flex-col w-full">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >
                  {title || "Modal Title"}
                </Dialog.Title>
              </div>

              {children && <div className={className}>{children}</div>}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
