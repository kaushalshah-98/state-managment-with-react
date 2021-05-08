import { FC, memo } from 'react';
import Spinner from '../spinner/clipLoader';

export type ButtonProps = {
  functionName: any;
  name: string;
  className?: string;
  loading?: boolean;
  upperCase?: string;
};
const Button: FC<ButtonProps> = (props) => {
  const { functionName, name, loading, className, upperCase } = props;
  const onClick = (event: any) => {
    event?.preventDefault();
    functionName();
  };
  return (
    <div className={`${loading ? 'opacity-50' : ''}`}>
      <button onClick={onClick} type="submit" className={className}>
        {loading ? (
          <div className={`flex items-center justify-center space-x-3 cursor-wait`}>
            <Spinner size={16} />
            <p className="-mt-1">{upperCase ? name.toUpperCase() : name}</p>
          </div>
        ) : (
          <> {upperCase ? name.toUpperCase() : name}</>
        )}
      </button>
    </div>
  );
};
const WrappedButton = memo(Button);
export { WrappedButton as Button };
