import { FC, memo, useEffect, useState } from 'react';
import { capitalize } from '@utils';
// import { ErrorLabel } from './errorLabel';
// import { Label } from './label';
import { ShowLabel } from './showLabel';

export type RadioLabelProps = {
  name: string | undefined;
  value?: string;
  label?: string;
  onClick?: any;
  defaultValue?: string | boolean | undefined;
  displayOnly?: boolean;
  setValue: any;
  onChange?: any;
  required?: boolean;
  register?: any;
  inputClass?: string;
  labelClass?: string;
  display?: boolean;
  disabled?: boolean;
  errors?: any;
  placeHolder?: string;
  upperCase?: boolean;
  camelCase?: boolean;

  checked?: any;
};
const inputClassName =
  'mt-2 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-400 focus:shadow-sm transition duration-150 ease-in-out sm:text-sm sm:leading-5';

const RadioLabel: FC<RadioLabelProps> = (props) => {
  const [state, setstate] = useState(true);
  const { checked, defaultValue, inputClass, displayOnly, disabled, label } = props;
  const { placeHolder, register, upperCase, camelCase, name, labelClass } = props;
  const { setValue, display, value, onClick, onChange } = props;

  useEffect(() => {
    if (state && defaultValue !== undefined && defaultValue !== '' && defaultValue !== null) {
      setstate(false);
      setValue(name, defaultValue?.toString());
    }
  }, [defaultValue]);

  return (
    <>
      {!displayOnly ? (
        <>
          <input
            type="radio"
            onChange={onChange}
            disabled={disabled}
            onClick={onClick}
            defaultChecked={checked}
            value={value}
            placeholder={placeHolder}
            ref={register}
            name={name}
            id={name}
            className={inputClass ? inputClass : inputClassName}
          />
          {label && (
            <label htmlFor={name} className="ml-3">
              <span
                className={
                  labelClass ? labelClass : 'block text-sm leading-5 font-medium text-gray-700'
                }
              >
                {upperCase ? label.toUpperCase() : camelCase ? capitalize(label) : label}
              </span>
            </label>
          )}
        </>
      ) : (
        <div className="-mt-4 -mb-5">
          {display && <ShowLabel defaultValue={defaultValue ? 'Yes' : 'No'} />}
        </div>
      )}
    </>
  );
};

const WrappedRadioLabel = memo(RadioLabel);
export { WrappedRadioLabel as RadioLabel };
