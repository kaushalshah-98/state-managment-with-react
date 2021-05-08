import { FooterButton } from '@shared/forms';
import Spinner from '@shared/spinner/hashLoader';

type ErrorsProps = {
  errorsArray: any[];
  errorMessage: string;
};
const Errors: React.FC<ErrorsProps> = (props) => {
  const { errorsArray, errorMessage } = props;
  const totalErrors = errorsArray?.length;
  return (
    <div className="flex-1 flex flex-col justify-center py-8 px-2 sm:px-5 lg:flex-none lg:px-2 xl:px-0">
      <div className="lg:justify-start">
        <div
          className="bg-red-50   justify-start border-red-500 text-red-700 px-6 py-4"
          role="alert"
        >
          <p className="font-medium flex mb-4 -ml-2">
            <img className="h-5 mr-2 " src="/img/bulkImport/Cross1.png" />
            {errorMessage || `There are ${totalErrors} errors in the submitted file`}
          </p>
          {errorsArray?.map((item, index) => {
            return (
              <ul className="list-disc ml-8" key={index}>
                <li className="text-sm">
                  <b>{item?.column}</b> : {item?.error} in row {item?.row}
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const Complete = (props: any) => {
  return (
    <div className="flex-1 flex flex-col justify-center py-8 px-2 sm:px-5 lg:flex-none lg:px-2 xl:px-0">
      <div className="lg:justify-start">
        <div
          className="bg-purplee-50 justify-start border-purplee-500 text-purplee-700 px-6 py-4"
          role="alert"
        >
          <p className="font-medium flex ">
            <img className="h-5 mr-2" src="/img/bulkImport/Tick1.png" />
            Your file is ready to import
          </p>
        </div>
      </div>
    </div>
  );
};
type Step2Props = {
  loading: boolean;
  errorMessage: string;
  Validationerrors: boolean;
  serverErrors: boolean;
  ValidationComplete: boolean;
  errorsArray: any[];
  cancel: () => void;
  ImportFile: () => void;
};
const Step2: React.FC<Step2Props> = (props) => {
  const {
    loading,
    Validationerrors,
    serverErrors,
    ValidationComplete,
    errorMessage,
    errorsArray,
    cancel,
    ImportFile
  } = props;
  let processText: string;
  let imageUrl = '';

  if (Validationerrors) {
    imageUrl = '/img/bulkImport/Cross.png';
    processText = 'The File is Processed with Errors';
  } else if (ValidationComplete) {
    imageUrl = '/img/bulkImport/Tick.png';
    processText = 'Process has been completed successfully';
  } else if (serverErrors) {
    imageUrl = '/img/bulkImport/Cross.png';
    processText = errorMessage;
  } else {
    processText = 'The file is being processed please wait...';
  }

  const FooterButtonProps = loading
    ? { btn2Name: 'Cancel', btn2function: cancel }
    : {
        btn1Name: ValidationComplete ? 'Import' : 'Upload Again',
        btn2Name: 'Cancel',
        btn1Function: ValidationComplete ? ImportFile : cancel,
        btn2function: cancel
      };
  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form>
        <div className="overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <h1 className=" w-full text-lg font-semibold leading-6 text-black-600" id="headline">
              Validation
            </h1>
            <h1 className="mt-5 w-full text-sm leading-6 text-gray-600" id="headline">
              {processText}
            </h1>
            {(Validationerrors || ValidationComplete || serverErrors) && (
              <div className="flex items-center justify-center mt-8">
                <img src={imageUrl} />
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center mt-8">
                <Spinner />
              </div>
            )}
            {Validationerrors && <Errors errorMessage={errorMessage} errorsArray={errorsArray} />}
            {ValidationComplete && <Complete />}
            <div className="col-span-6 sm:col-span-1" />
          </div>
        </div>
      </form>
      <FooterButton {...FooterButtonProps} />
    </div>
  );
};

export default Step2;
