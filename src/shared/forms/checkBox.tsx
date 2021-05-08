import { FC, memo } from 'react';
import { ErrorLabel } from './errorLabel';
import { Label } from './label';
import { ShowLabel } from './showLabel';

export type TextAreaLabelProps = {
  name: string | undefined;
  label?: string | undefined;
  defaultValue?: boolean | undefined;
  onChange?: any;
  register?: any;
  checkClass?: string;
  labelClass?: string;
  errors?: any;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  displayOnly?: boolean;
  upperCase?: boolean;
  camelCase?: boolean;
};
const checkClassName =
  'form-checkbox h-5 w-5 text-blue-500 transition duration-150 ease-in-out bg-gray-200';

const CheckLabel: FC<TextAreaLabelProps> = (props) => {
  const { checkClass, errors, name, labelClass, defaultValue, register, displayOnly } = props;
  const { label, upperCase, camelCase, required, disabled, readOnly, onChange } = props;
  const LabelProps = { label, className: labelClass, upperCase, camelCase, required };
  const ErrorLAbelProps = { errors, name };

  const changed = (event: any) => {
    if (onChange) {
      onChange(event);
    }
  };
  const checkValue = (
    <>
      <input
        type="checkbox"
        disabled={disabled}
        defaultChecked={defaultValue}
        readOnly={readOnly}
        // defaultValue={defaultValue}
        onChange={changed}
        ref={register}
        name={name}
        id={name}
        className={checkClass ? checkClass : checkClassName}
      />
      <ErrorLabel {...ErrorLAbelProps} />
    </>
  );
  return (
    <>
      {label && <Label {...LabelProps} />}
      {displayOnly ? (
        <ShowLabel defaultValue={defaultValue && defaultValue.toString()} />
      ) : (
        checkValue
      )}
    </>
  );
};

const WrappedCheckLabel = memo(CheckLabel);
export { WrappedCheckLabel as CheckLabel };
