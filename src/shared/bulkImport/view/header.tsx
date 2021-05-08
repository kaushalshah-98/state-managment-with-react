import { ModalHeader } from '@shared/modals';
import { memo } from 'react';

type HeaderProps = {
  activeState: string;
  title: string;
  onClose: any;
};
const Header: React.FC<HeaderProps> = (props) => {
  const { activeState, onClose, title } = props;
  const active2 = '/assets/img/bulkImport/activeStep2.png';
  const inactive2 = '/assets/img/bulkImport/Step2.png';
  const active3 = '/assets/img/bulkImport/activeStep3.png';
  const inactive3 = '/assets/img/bulkImport/Step3.png';

  return (
    <>
      <ModalHeader title={title} onClose={onClose} />
      <div className="flex items-center mx-14 mt-8">
        <img src="/assets/img/bulkImport/activeStep1.png" />
        <img src="/assets/img/bulkImport/Line11.png" className="w-36" />
        <img src={activeState === 'second' || activeState === 'third' ? active2 : inactive2} />
        <img src="/assets/img/bulkImport/Line11.png" className="w-36" />
        <img src={activeState === 'third' ? active3 : inactive3} />
      </div>
      <div className="flex justify-center items-center mt-2 mb-4">
        <span className="mr-24 -ml-6 text-gray-800 text-sm">Choose Format</span>
        <span
          className={`${
            activeState === 'second' || activeState === 'third' ? 'text-gray-800' : 'text-black-100'
          } mr-24 text-sm`}
        >
          Validation
        </span>
        <span className={`${activeState === 'third' ? 'text-gray-800' : 'text-black-100'} text-sm`}>
          Processing
        </span>
      </div>
    </>
  );
};

export default memo(Header);
