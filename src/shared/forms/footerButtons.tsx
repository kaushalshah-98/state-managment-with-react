import { Button } from '@shared/forms';
import { memo } from 'react';

export type FooterButtonProps = {
  btn1Name?: string;
  btn2Name?: string;
  btn1Class?: string;
  btn2Class?: string;
  btn1WrapperClass1?: string;
  btn1WrapperClass2?: string;
  wrapperClass?: string;
  loading?: boolean;
  btn1Function?: () => void;
  btn2function?: () => void;
};
const class1 =
  'inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-purplee-600 leading-6 font-medium text-white shadow-sm hover:bg-purplee-500 focus:outline-none focus:border-purplee-700 focus:shadow-outline-redd transition ease-in-out duration-150 sm:text-sm sm:leading-5';
const class2 =
  'inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-purplee-300 focus:shadow-outline-redd transition ease-in-out duration-150 sm:text-sm sm:leading-5';

const class3 = 'flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto';
const class4 = 'mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto';
const FooterButton: React.FC<FooterButtonProps> = (props) => {
  const {
    btn1Name,
    loading,
    btn2Name,
    wrapperClass,
    btn1WrapperClass1,
    btn1WrapperClass2,
    btn1Function,
    btn2function,
    btn1Class,
    btn2Class
  } = props;
  return (
    <div className={wrapperClass || 'mt-5 mb-5 sm:mt-4 px-8 sm:flex sm:flex-row-reverse'}>
      {btn1Name && btn1Function && (
        <span className={btn1WrapperClass1 || class3}>
          <Button
            loading={loading}
            name={btn1Name}
            className={btn1Class || class1}
            functionName={btn1Function}
          />
        </span>
      )}
      {btn2Name && btn2function && (
        <span className={btn1WrapperClass2 || class4}>
          <Button name={btn2Name} className={btn2Class || class2} functionName={btn2function} />
        </span>
      )}
    </div>
  );
};
const WrappedFooterButton = memo(FooterButton);
export { WrappedFooterButton as FooterButton };
