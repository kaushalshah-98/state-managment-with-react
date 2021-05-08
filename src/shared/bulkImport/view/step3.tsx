import { FooterButton } from '@shared/forms';
import Spinner from '@shared/spinner/hashLoader';

type Step3Props = {
  totalRecords: number;
  importComplete: boolean;
  cancel: () => void;
  close: () => void;
};
const step3: React.FC<Step3Props> = (props) => {
  const { cancel, close, importComplete, totalRecords } = props;
  let processText: string;
  if (importComplete) {
    processText = 'Data in file is being uploaded Successfully';
  } else {
    processText = 'Data in file is being uploaded please wait...';
  }
  const FooterButtonProps = {
    btn2Name: importComplete ? 'Close' : 'Cancel',
    btn2function: importComplete ? close : cancel
  };

  return (
    <>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form>
          <div className="overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <h1 className=" w-full text-xl font-semibold leading-6 text-black-600" id="headline">
                Processing
              </h1>
              <h1 className="mt-5 w-full text-sm leading-6 text-gray-600" id="headline">
                {processText}
              </h1>
              {importComplete || (
                <div className="flex items-center justify-center mt-8">
                  <Spinner />
                </div>
              )}
              {importComplete && (
                <div className="flex-1 flex flex-col justify-center py-8 px-2 sm:px-5 lg:flex-none lg:px-2 xl:px-0">
                  <div className="lg:justify-start">
                    <div
                      className="bg-purplee-50   justify-start border-purplee-500 text-purplee-700 px-6 py-4"
                      role="alert"
                    >
                      <p className="font-medium flex ">
                        <img className="h-5 mr-2" src="/img/bulkImport/Tick1.png" />
                        Data successfully imported
                      </p>
                      <p className="text-sm ml-3">{totalRecords} Leads successfully imported</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      <FooterButton {...FooterButtonProps} />
    </>
  );
};
export default step3;
