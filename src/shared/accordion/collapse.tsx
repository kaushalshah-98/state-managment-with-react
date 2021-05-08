import { FC, memo } from 'react';
import * as FeatherIcon from 'react-feather';
const i = 'cursor-pointer text-gray-800';

type Collapse1Props = {
  title?: string;
  active: string;
  wrapperClass?: string;
  bodyClass?: string;
  dropDown: string;
  size?: string;
  toggle: (type: string) => void;
  textClass?: string;
};
const Dropdown: FC<Collapse1Props> = (props) => {
  const { title, active, wrapperClass, bodyClass, dropDown, size, toggle, textClass } = props;
  const featherProps = { strokeWidth: '3px', className: i, size: size || '24' };
  return (
    <>
      <div className="flex items-center">
        <div className="text-lg mr-8 leading-8 font-semibold text-gray-900">
          {dropDown === active ? (
            <FeatherIcon.ChevronsDown {...featherProps} onClick={() => toggle('')} />
          ) : (
            <FeatherIcon.ChevronsRight {...featherProps} onClick={() => toggle(active)} />
          )}
        </div>
        <div
          className={
            wrapperClass || 'md:flex-1 md:flex md:items-center md:justify-between md:space-x-12'
          }
        >
          <h3 className={textClass || 'text-lg leading-8 font-medium text-gray-700'}>{title}</h3>
        </div>
      </div>
      {dropDown === active && <div className={bodyClass || ''}> {props.children}</div>}
    </>
  );
};

export default memo(Dropdown);
