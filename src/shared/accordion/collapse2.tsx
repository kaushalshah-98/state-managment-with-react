import { FC, memo, useState } from 'react';
import * as FeatherIcon from 'react-feather';
const i = 'cursor-pointer text-gray-800';

type collapseObjecttype = {
  open: boolean;
  keyy: string;
  label?: string;
  content: any;
};
type featherObjecttype = {
  strokeWidth?: string;
  className?: string;
  size?: string;
};

type Props = {
  arr: collapseObjecttype[];
  featherObject?: featherObjecttype;
  multiple?: boolean;
  wrapperClass?: string;
  labelClass?: string;
};
const Collapse: FC<Props> = memo((props) => {
  const { featherObject, wrapperClass, labelClass, multiple = true, arr } = props;
  const [collapseList, setcollapseList] = useState(arr);

  const featherProps = featherObject || { strokeWidth: '3px', className: i, size: '24' };

  const toggle = (key: string) => {
    const list = [...collapseList];
    if (multiple) {
      list.forEach((i) => (i.keyy === key ? (i.open = !i.open) : null));
    } else {
      list.forEach((i) => (i.keyy === key ? (i.open = !i.open) : (i.open = false)));
    }
    console.log(list);
    setcollapseList(list);
  };
  return (
    <>
      {collapseList.map((item, index) => {
        return (
          <div
            key={index}
            className={wrapperClass || 'my-8 mx-4 py-8 px-6 border rounded-lg bg-white shadow-sm'}
          >
            <div className="flex items-center space-x-4">
              {item.open ? (
                <button
                  className={'text-gray-600 p-2 rounded-full hover:bg-gray-200 focus:text-gray-800'}
                  onClick={() => toggle(item.keyy)}
                >
                  <FeatherIcon.ChevronDown {...featherProps} />
                </button>
              ) : (
                <button
                  className={'text-gray-600 p-2 rounded-full hover:bg-gray-200 focus:text-gray-800'}
                  onClick={() => toggle(item.keyy)}
                >
                  <FeatherIcon.ChevronRight {...featherProps} />
                </button>
              )}
              {item.label && (
                <h1 className={labelClass || 'text-lg leading-6 font-medium text-gray-900'}>
                  {item.label}
                </h1>
              )}
            </div>
            {item.open && item.content}
          </div>
        );
      })}
    </>
  );
});

export default Collapse;
