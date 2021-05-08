import { FC } from 'react';

export type ErrorLabelProps = {
  errors: any;
  name: string | undefined;
  className?: string;
};
export const errSpanClassName = 'block text-xs font-small text-red-500';

const ErrorLabel: FC<ErrorLabelProps> = (props) => {
  const { errors, name, className } = props;
  return (
    <>
      {errors && name && Object.keys(errors).length > 0 && errors[name] && (
        <span className={className ? className : errSpanClassName}>{errors[name]?.message}</span>
      )}
    </>
  );
};
const WrappedErrorLabel = ErrorLabel;
export { WrappedErrorLabel as ErrorLabel };
