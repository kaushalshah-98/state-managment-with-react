import { Validation } from '@config/interfaces';
import { FooterButton, InputLabel } from '@shared/forms';
import { ModalHeader } from '@shared/modals';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { apiActions } from '../helper/staticData';

type ResetModalProps = {
  formData?: any;
  handleSave: (acion: string, data: any) => void;
  isLoading?: boolean;
  closeModal: () => void;
  title?: string;
};

const ResetPassword: React.FC<ResetModalProps> = (props) => {
  const { closeModal, handleSave, isLoading } = props;
  const { register, handleSubmit, errors, watch } = useForm();

  const validations: Validation = {
    currentPassword: {
      required: 'Enter Current Password'
    },
    password: {
      required: 'Enter Password',
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/i,
        message: 'Enter a valid password'
      },
      validate: (value) =>
        value !== watch('currentPassword') || 'Current Password and New Password cannot be same'
    },
    confirm_password: {
      required: 'Re Enter Password',
      validate: (value) => value === watch('password') || 'Passwords Do not Match'
    }
  };
  const onSubmit = (data: any) => {
    handleSave(apiActions.SET_PASSWORD, data);
  };
  const FooterButtonProps = {
    loading: isLoading,
    btn1Name: 'Save',
    btn2Name: 'Cancel',
    btn1Function: handleSubmit(onSubmit),
    btn2function: closeModal
  };
  return (
    <>
      <ModalHeader title={'Reset Password'} onClose={closeModal} />
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form>
          <div className="overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <div className="col-span-6 sm:col-span-5">
                    <div className="relative flex-grow focus-within:z-10">
                      <InputLabel
                        errors={errors}
                        type="password"
                        labelClass="block text-sm font-medium leading-5 text-gray-500 mb-2"
                        name="currentPassword"
                        inputClass="form-input hover:border-purplee-400 block w-full py-2 px-3 border border-gray-300 focus:shadow-sm rounded-l-md shadow-sm focus:outline-none focus:shadow-outline-purplee focus:border-purplee-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        register={register(validations.currentPassword)}
                        label="Current Password"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <div className="col-span-6 sm:col-span-5">
                    <div className="relative flex-grow focus-within:z-10">
                      <InputLabel
                        errors={errors}
                        type="password"
                        labelClass="block text-sm font-medium leading-5 text-gray-500 mb-2"
                        name="password"
                        inputClass="form-input hover:border-purplee-400 block w-full py-2 px-3 border border-gray-300 focus:shadow-sm rounded-l-md shadow-sm focus:outline-none focus:shadow-outline-purplee focus:border-purplee-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        register={register(validations.password)}
                        label="New Password"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <div className="relative flex-grow focus-within:z-10">
                    <InputLabel
                      errors={errors}
                      type="password"
                      labelClass="block text-sm font-medium leading-5 text-gray-500 mb-2"
                      name="confirmPassword"
                      inputClass="form-input hover:border-purplee-400 block w-full py-2 px-3  border border-gray-300 focus:shadow-sm rounded-l-md shadow-sm focus:outline-none focus:shadow-outline-purplee focus:border-purplee-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      register={register(validations.confirm_password)}
                      label="Re-Enter New Password"
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-1" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <FooterButton {...FooterButtonProps} />
    </>
  );
};

export default ResetPassword;
