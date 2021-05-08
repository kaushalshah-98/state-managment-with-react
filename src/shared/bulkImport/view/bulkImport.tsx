import { FC, memo } from 'react';
import BulkImportState from '../controller/bulkImport';
import Header from './header';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

type BulkImportProps = {
  closeModal: () => void;
  customers?: any[] | undefined;
};

const BulkImport: FC<BulkImportProps> = (props) => {
  const {
    getDocument,
    startValidating,
    startImporting,
    setActive,
    errorMessage,
    serverErrors,
    activeState,
    isPreparing,
    loading,
    totalRecords,
    Validationerrors,
    importComplete,
    ValidationComplete,
    errorsArray,
    resetState
  } = BulkImportState(props);

  const { closeModal, customers } = props;
  const Step1Button = (data: any) => {
    setActive('second');
    startValidating(data);
  };
  const Revert = () => {
    resetState();
    setActive('first');
  };
  const ImportFile = () => {
    setActive('third');
    startImporting();
  };
  const onClose = (event: any) => {
    event?.preventDefault();
    closeModal();
  };
  const HeaderProps = { onClose, activeState, title: 'Import Tools' };
  const Step1Props = {
    onClick: Step1Button,
    isPreparing,
    getDocument,
    customers
  };
  const Step2Props = {
    ImportFile,
    loading,
    cancel: Revert,
    errorMessage,
    serverErrors,
    Validationerrors,
    ValidationComplete,
    errorsArray
  };
  const Step3Props = { totalRecords, importComplete, cancel: Revert, close: closeModal };

  return (
    <>
      <Header {...HeaderProps} />
      {activeState === 'first' && <Step1 {...Step1Props} />}
      {activeState === 'second' && <Step2 {...Step2Props} />}
      {activeState === 'third' && <Step3 {...Step3Props} />}
    </>
  );
};

export default memo(BulkImport);
