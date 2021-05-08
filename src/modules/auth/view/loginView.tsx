import { Validation } from '@config/interfaces';
import { Button, InputLabel } from '@shared/forms';
import * as React from 'react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { apiActions } from '../helper/staticData';

type Props = {
  isLoading?: boolean;
  handleSave: (action: string, data: any) => void;
};
const validations: Validation = {
  email: { required: 'Enter email' },
  password: { required: 'Enter your Password' }
};
const Login: FC<Props> = (props) => {
  const { handleSave, isLoading } = props;
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => {
    handleSave(apiActions.LOGIN, data);
  };
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div>
            <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900 font-family-Poppins ">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-12">
            <div>
              <form>
                <div className="mt-6">
                  <InputLabel
                    errors={errors}
                    labelClass="block text-sm font-medium leading-5 text-gray-700 mb-1"
                    name="email"
                    register={register(validations.email)}
                    label="Email address"
                    inputClass="form-input block w-full hover:border-purplee-400 py-2 focus:shadow-sm px-3 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:shadow-outline-purplee focus:border-purplee-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div className="mt-6">
                  <div className="mt-2 flex rounded-md shadow-sm">
                    <div className="relative flex-grow focus-within:z-10">
                      <InputLabel
                        label="Password"
                        errors={errors}
                        labelClass="block text-sm font-medium leading-5 text-gray-700 mb-1"
                        type="password"
                        register={register(validations.password)}
                        name="password"
                        inputClass="form-input block w-full hover:border-purplee-400 py-2 focus:shadow-sm px-3 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:shadow-outline-purplee focus:border-purplee-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm leading-5">
                    <a
                      href="#"
                      className="font-medium text-purplee-600 hover:text-purplee-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <Button
                      name={'Sign in'}
                      loading={isLoading}
                      functionName={handleSubmit(onSubmit)}
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purplee-500 hover:bg-purplee-600 focus:outline-none focus:border-purplee-600 focus:shadow-outline-purplee active:bg-purplee-600 transition duration-150 ease-in-out"
                    />
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center lg:flex-none">
        <img className="h-4/5 w-3/5" src={'assets/img/tdms/loginScreen2.png'} alt="aa" />
      </div>
    </div>
  );
};

export default Login;
