import { Validation } from '@config/interfaces';
import { FooterButton, ReactDropZone, SelectLabel } from '@shared/forms';
import Spinner from '@shared/spinner/hashLoader';
import React, { memo, useState } from 'react';
import { useForm } from 'react-hook-form';

const a =
  'bg-purplee-600 text-white hover:bg-purplee-500 focus:outline-none focus:border-purplee-700';
const i = 'cursor-not-allowed bg-grayy-500 text-white';
const btnClass =
  'inline-flex justify-center rounded-md border border-transparent px-4 py-1.5 text-base leading-6 font-medium shadow-sm focus:shadow-outline-purplee transition ease-in-out duration-150 sm:text-sm sm:leading-5';
const validations: Validation = {
  name: {},
  designation: { required: 'Enter your Designation' },
  customers: { required: 'Select Customer' },
  fileName: { required: 'Please Upload' }
};
type Step1Props = {
  onClick: (data: any) => void;
  isPreparing: boolean;
  getDocument: (customerId: string) => void;
  customers?: any[] | undefined;
};
const Step1: React.FC<Step1Props> = (props) => {
  const [active, setactive] = useState(false);
  const { onClick, isPreparing, customers, getDocument } = props;
  const { handleSubmit, errors, getValues, clearErrors, control, reset, setValue } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = (data: any) => {
    onClick(data);
  };
  const change = () => {
    if (getValues('customer')) {
      setactive(true);
    } else {
      setactive(false);
    }
  };
  const onUpload = (event: any) => {
    console.log(event);
  };
  const onError = (event: any) => {
    console.log(event);
  };
  const download = (event: any) => {
    event.preventDefault();
    if (getValues('customer')) {
      setactive(true);
      clearErrors('fileName');
      getDocument(getValues('customer'));
    }
  };
  const ImageDropZoneProps = {
    onError,
    control,
    errors,
    clearErrors,
    setValue,
    name: 'fileName',
    rules: validations.fileName,
    onUpload,
    label: 'Upload Leads',
    constraint: 'xslx upto 10mb',
    accept: '.xlsx'
  };
  const FooterButtonProps = {
    btn1Name: 'Validate',
    btn2Name: 'Clear',
    btn1Function: handleSubmit(onSubmit),
    btn2function: reset
  };
  return (
    <>
      <div className="mt-8 md:mt-0 md:col-span-2">
        <form>
          <div className="sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <SelectLabel
                    control={control}
                    options={customers}
                    setValue={setValue}
                    onChange={change}
                    labelClass="block font-medium leading-5 text-grayy-600 text-sm mb-2"
                    errors={errors}
                    name="customer"
                    rules={validations.customers}
                    label="Select Customer"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 border border-gray-300 rounded-md p-4">
                  <span className="block text-md font-medium leading-5 text-grayy-700 text-lg">
                    Download Sample
                  </span>
                  <span className="mt-4 block text-sm font-normal leading-5 text-gray-500">
                    Please use below link to download the sample for this format.
                  </span>
                  {isPreparing ? (
                    <div className="flex items-center justify-center mt-8">
                      <Spinner />
                    </div>
                  ) : (
                    <button onClick={download} className="mt-8 flex rounded-md shadow-sm sm:w-auto">
                      <span className={active ? `${btnClass} ${a}` : `${btnClass} ${i}`}>
                        Download
                      </span>
                    </button>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <ReactDropZone {...ImageDropZoneProps} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <FooterButton {...FooterButtonProps} />
    </>
  );
};

export default memo(Step1);
