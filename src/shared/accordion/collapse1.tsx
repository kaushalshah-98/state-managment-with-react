import { FC, memo, useEffect, useState } from 'react';
import * as FeatherIcon from 'react-feather';
const i = 'cursor-pointer text-gray-800';

type collapseObjecttype = {
  open: boolean;
  keyy: string;
  label?: string;
};
type featherObjecttype = {
  strokeWidth?: string;
  className?: string;
  size?: string;
};

export type CollapseProps1 = {
  arr: collapseObjecttype[];
  featherObject?: featherObjecttype;
  keyy: string;
  label?: any;
  wrapperClass?: string;
  labelClass?: string;
};
const Collapse: FC<CollapseProps1> = memo((props) => {
  const { featherObject, keyy, label, wrapperClass, labelClass, arr, children } = props;
  const [collapseList, setcollapseList] = useState(arr);
  const featherProps = featherObject || { strokeWidth: '3px', className: i, size: '24' };

  useEffect(() => {
    return () => {
      // close all collapse list
      const list = [...collapseList];
      list.forEach((j) => (j.open = false));
      setcollapseList(list);
    };
  }, []);

  const toggle = () => {
    const list = [...collapseList];
    list.forEach((j) => (j.keyy === keyy ? (j.open = !j.open) : null));
    setcollapseList(list);
  };
  const isOpen = () => {
    let opened = false;
    const list = [...collapseList];
    list.forEach((j) => (j.keyy === keyy ? (opened = j.open) : null));
    return opened;
  };
  return (
    <>
      <div className={wrapperClass || 'my-8 mx-4 py-8 px-6 border rounded-lg bg-white shadow-sm'}>
        <div className="flex items-center space-x-4">
          {isOpen() ? (
            <button
              onClick={toggle}
              className={'text-gray-600 p-2 rounded-full hover:bg-gray-200 focus:text-gray-800'}
            >
              <FeatherIcon.ChevronDown {...featherProps} />
            </button>
          ) : (
            <button
              onClick={toggle}
              className={'text-gray-600 p-2 rounded-full hover:bg-gray-200 focus:text-gray-800'}
            >
              <FeatherIcon.ChevronRight {...featherProps} />
            </button>
          )}
          {label &&
            (label.name ? (
              <h1 className={labelClass || 'text-lg leading-6 font-medium text-gray-900'}>
                {label.name}
              </h1>
            ) : (
              <>{label?.component}</>
            ))}
        </div>
        {isOpen() && children}
      </div>
    </>
  );
});

export default Collapse;
