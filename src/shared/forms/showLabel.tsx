import { FC, memo } from 'react';

export type ShowLabelProps = { defaultValue: any; displayClass?: string };

export const displayClassName =
  'mt-2 text-gray-700 block w-full py-2 transition duration-150 ease-in-out sm:text-sm sm:leading-5';

const ShowLabel: FC<ShowLabelProps> = (props) => {
  const { defaultValue, displayClass } = props;

  if (defaultValue !== undefined && defaultValue !== '' && defaultValue !== null) {
    return <span className={displayClass || displayClassName}>{defaultValue}</span>;
  } else if (defaultValue === false || defaultValue === 'false') {
    return <span className={displayClass || displayClassName}>No</span>;
  } else if (defaultValue === true || defaultValue === 'true') {
    return <span className={displayClass || displayClassName}>Yes</span>;
  }
  return <span className={displayClass || displayClassName}>{'-'}</span>;
};

const WrappedShowLabel = memo(ShowLabel);
export { WrappedShowLabel as ShowLabel };
