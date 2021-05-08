import { FC, memo } from 'react';
import { ErrorLabel } from './errorLabel';
import { Label } from './label';
import { ShowLabel } from './showLabel';

export type TextAreaLabelProps = {
  name: string | undefined;
  rows?: number;
  cols?: number;
  label?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: any;
  onBlur?: any;
  register?: any;
  textAreaClass?: string;
  labelClass?: string;
  errors?: any;
  placeHolder?: string;
  readOnly?: boolean;
  camelCase?: boolean;
  disabled?: boolean;
  required?: boolean;
  displayOnly?: boolean;
  upperCase?: boolean;
};
const inputClassName =
  'mt-2 form-input block w-full py-2 text-gray-700 px-3 border border-gray-300 rounded-md shadow-sm hover:border-blue-400 focus:shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5';

const TextAreaLabel: FC<TextAreaLabelProps> = (props) => {
  const { textAreaClass, errors, name, labelClass, defaultValue, register, displayOnly } = props;
  const {
    label,
    upperCase,
    camelCase,
    required,
    disabled,
    readOnly,
    placeHolder,
    rows,
    cols,
    onBlur,
    onChange
  } = props;
  const LabelProps = { label, className: labelClass, camelCase, upperCase, required };
  const ErrorLAbelProps = { errors, name };
  const textAreaValue = (
    <>
      <textarea
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        cols={cols}
        onBlur={onBlur}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeHolder}
        ref={register}
        name={name}
        id={name}
        className={textAreaClass ? textAreaClass : inputClassName}
      />
      <ErrorLabel {...ErrorLAbelProps} />
    </>
  );
  return (
    <>
      {label && <Label {...LabelProps} />}
      {displayOnly ? <ShowLabel defaultValue={defaultValue} /> : textAreaValue}
    </>
  );
};

const WrappedTextAreaLabel = memo(TextAreaLabel);
export { WrappedTextAreaLabel as TextAreaLabel };
