import { FC, memo } from 'react';
import * as Feather from 'react-feather';

type ModalHeaderProps = {
  title: string;
  upperCase?: boolean;
  onClose: any;
};
const ModalHeader: FC<ModalHeaderProps> = (props) => {
  const { title, onClose, upperCase = false } = props;
  const close = (event: any) => {
    event?.preventDefault();
    onClose();
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="sm:flex sm:items-start pl-6">
          <div className="text-center sm:text-left">
            <h3 className="text-lg leading-6 font-semibold text-gray-700" id="modal-headline">
              {upperCase ? title && title.toUpperCase() : title}
            </h3>
          </div>
        </div>
        <div className="hidden sm:block relative top-0 right-0 pt-4 pr-4 sm:p-4">
          <button
            onClick={close}
            type="button"
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition ease-in-out duration-150"
            aria-label="Close"
          >
            <Feather.X />
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};

const WrappedModalHeader = memo(ModalHeader);
export { WrappedModalHeader as ModalHeader };
