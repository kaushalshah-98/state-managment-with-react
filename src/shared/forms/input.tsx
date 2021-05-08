import { FC, memo, useState } from 'react';
import * as FeatherIcon from 'react-feather';
import { ErrorLabel } from './errorLabel';
import { Label } from './label';
import { ShowLabel } from './showLabel';

export type InputLabelProps = {
  name?: string;
  type?: string;
  label?: string;
  children?: any;
  defaultValue?: string | undefined;
  register?: any;
  onKeyUp?: any;
  inputClass?: string;
  displayClass?: string;
  labelClass?: string;
  errors?: any;
  placeHolder?: string;
  onChange?: any;
  readOnly?: boolean;
  disabled?: boolean;
  onBlur?: any;
  required?: boolean;
  displayOnly?: boolean;
  upperCase?: boolean;
  camelCase?: boolean;
};
const inputClassName =
  'mt-2 form-input block w-full py-2.5 text-gray-700 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-redd hover:border-purplee-400 focus:border-purplee-400 focus:shadow-sm transition duration-150 ease-in-out sm:text-sm sm:leading-5';

const InputLabel: FC<InputLabelProps> = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    inputClass,
    errors,
    onBlur,
    name,
    labelClass,
    onKeyUp,
    defaultValue,
    displayClass,
    onChange,
    register,
    label,
    upperCase,
    camelCase,
    required,
    disabled,
    readOnly,
    placeHolder,
    type,
    children,
    displayOnly
  } = props;

  const LabelProps = { label, className: labelClass, upperCase, camelCase, required };
  const ErrorLAbelProps = { errors, name };

  const icon = passwordVisible ? (
    <FeatherIcon.Eye
      className="absolute p-1.5 hover:bg-purplee-200 mt-1 rounded-full cursor-pointer right-3 text-grayy-700"
      onClick={() => setPasswordVisible((e) => !e)}
      size={30}
    />
  ) : (
    <FeatherIcon.EyeOff
      className="absolute p-1.5 hover:bg-purplee-200 mt-1 rounded-full cursor-pointer right-3 text-grayy-700"
      onClick={() => setPasswordVisible((e) => !e)}
      size={30}
    />
  );
  const inputValue = (
    <>
      {type === 'password' && icon}
      <input
        autoComplete="off"
        type={type === 'password' ? (passwordVisible ? 'text' : 'password') : type || 'text'}
        disabled={disabled}
        onKeyUp={onKeyUp}
        readOnly={readOnly}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeHolder}
        ref={register}
        name={name}
        // id={name}
        className={inputClass ? inputClass : inputClassName}
      />
      <ErrorLabel {...ErrorLAbelProps} />
    </>
  );
  return (
    <>
      {children ? (
        <div className="relative border-none">
          {label && <Label {...LabelProps} />}
          {displayOnly ? (
            <ShowLabel defaultValue={defaultValue} displayClass={displayClass} />
          ) : (
            inputValue
          )}
          <div className="pointer-events-none absolute inset-y-12 right-0 flex items-center px-2 text-gray-700">
            {children}
          </div>
        </div>
      ) : (
        <>
          {label && <Label {...LabelProps} />}
          {displayOnly ? (
            <ShowLabel defaultValue={defaultValue} displayClass={displayClass} />
          ) : (
            inputValue
          )}
        </>
      )}
    </>
  );
};

const WrappedInputLabel = memo(InputLabel);
export { WrappedInputLabel as InputLabel };
