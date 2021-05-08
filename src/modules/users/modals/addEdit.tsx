import { Validation } from '@config/interfaces';
import { IUser } from '@models';
import { FooterButton, InputLabel } from '@shared/forms';
import { ModalHeader } from '@shared/modals';
// import SpinnerContainer from '@shared/spinner/container';
import Spinner from '@shared/spinner/hashLoader';
import * as React from 'react';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiActions, USER_KEY_PAIR } from '../helper/staticData';

type UserModalProps = {
  userData: IUser | undefined;
  handleSave: (action: string, data: IUser) => void;
  isLoading: boolean;
  closeModal: () => void;
  title: string;
};
const validations: Validation = {
  firstName: { required: 'Enter First Name' },
  lastName: { required: 'Enter Last name' },
  mobile: {
    pattern: {
      value: /^[0-9+]\d{9,12}$/i,
      message: 'Enter 10 digit Mobile number'
    }
  },
  password: {
    required: 'Enter Password',
    pattern: {
      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/i,
      message: 'Enter a valid password'
    }
  },
  email: {
    required: 'Enter e-mail',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Enter a valid e-mail address'
    }
  }
};
const arr = [
  {
    name: USER_KEY_PAIR.FIRST_NAME.key,
    label: USER_KEY_PAIR.FIRST_NAME.label,
    required: true
  },
  {
    name: USER_KEY_PAIR.LAST_NAME.key,
    label: USER_KEY_PAIR.LAST_NAME.label,
    required: true
  },
  {
    name: USER_KEY_PAIR.MOBILE.key,
    label: USER_KEY_PAIR.MOBILE.label,
    required: false
  },
  {
    name: USER_KEY_PAIR.EMAIL.key,
    label: USER_KEY_PAIR.EMAIL.label,
    required: true
  }
];
const AddEditModal: React.FC<UserModalProps> = (props) => {
  const { userData, isLoading, handleSave, closeModal, title } = props;
  const [data, setdata]: [IUser | undefined, any] = useState();
  const { errors, register, handleSubmit } = useForm();
  let mode: string;
  if (title.toLocaleLowerCase().includes('edit')) {
    mode = 'edit';
  } else {
    mode = 'add';
  }
  const onSubmit = (user: IUser) => {
    setdata(user);
    if (mode === 'edit') {
      handleSave(apiActions.EDIT, user);
    } else {
      handleSave(apiActions.CREATE, user);
    }
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
      <ModalHeader title={title} onClose={closeModal} />
      {/* <SpinnerContainer tip={'Saving...'} delay={0} loading={isLoading}> */}
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            {mode === 'edit' && !userData?.firstName ? (
              <div className="p-20">
                <Spinner tip={'Loading User ..'} />
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-6">
                {arr.map((item, index) => {
                  return (
                    <div className="col-span-6 sm:col-span-3" key={index}>
                      <InputLabel
                        camelCase={true}
                        label={item.label}
                        errors={errors}
                        required={item.required}
                        name={item.name}
                        register={register(validations[item.name])}
                        defaultValue={
                          data ? data[item.name] : userData ? userData[item.name] : null
                        }
                      />
                    </div>
                  );
                })}
                {mode === 'add' && (
                  <div className="col-span-6 sm:col-span-5">
                    <div className="relative flex-grow focus-within:z-10">
                      <InputLabel
                        errors={errors}
                        type="password"
                        labelClass="block text-sm font-medium leading-5 text-gray-500 mb-2"
                        name="password"
                        inputClass="form-input hover:border-purplee-400 block w-full py-2 px-3 border border-gray-300 focus:shadow-sm rounded-l-md shadow-sm focus:outline-none focus:shadow-outline-redd focus:border-purplee-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        register={register(validations.password)}
                        label="Password"
                      />
                    </div>
                  </div>
                )}
                <div className="col-span-6 sm:col-span-1" />
              </div>
            )}
          </div>
        </div>
        <FooterButton {...FooterButtonProps} />
      </div>
      {/* </SpinnerContainer> */}
    </>
  );
};

export default memo(AddEditModal);
