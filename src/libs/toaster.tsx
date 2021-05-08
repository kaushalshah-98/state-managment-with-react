// import { toast } from 'react-toastify';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';

type Props = {
  message: string;
  duration?: number;
  style?: any;
  className?: string;
  icon?: any;
  iconTheme?: any;
  role?: any;
  ariaLive?: any;
};
const ToastFunction = () => {
  const error = (props: Props) => {
    const { message, ariaLive, className, duration, icon, iconTheme, role, style } = props;
    const options = { ariaLive, className, duration, icon, iconTheme, role, style };
    toast.error(message, options);
  };
  const success = (props: Props) => {
    const { message, ariaLive, className, duration, icon, iconTheme, role, style } = props;
    const options = { ariaLive, className, duration, icon, iconTheme, role, style };
    toast.success(message, options);
  };
  const warning = (props: Props) => {
    const {
      message,
      ariaLive,
      className,
      duration,
      icon = <Feather.AlertTriangle />,
      iconTheme = {
        primary: '#faf089',
        secondary: '#faf089'
      },
      role,
      style = { backgroundColor: '#f6e05e', color: '#3D3D3D' }
    } = props;
    const options = {
      ariaLive,
      className,
      duration,
      icon,
      iconTheme,
      role,
      style
    };
    toast(message, options);
  };
  const info = (props: Props) => {
    const {
      message,
      ariaLive,
      className,
      duration,
      icon = <Feather.Info />,
      style = { backgroundColor: '#63B3ED', color: '#fff' },
      iconTheme = {
        primary: '#000',
        secondary: '#000'
      },
      role
    } = props;
    const options = { ariaLive, className, duration, icon, iconTheme, role, style };
    toast(message, options);
  };
  const simple = (props: Props) => {
    const { message, ariaLive, className, duration, icon, iconTheme, role, style } = props;
    const options = { ariaLive, className, duration, icon, iconTheme, role, style };
    toast(message, options);
  };
  const custom = (props: Props) => {
    return toast((t) => (
      <span>
        Custom and <b>bold</b> and <b>{props.message}</b>
        <button
          className="p-1.5 border bg-gray-100 rounded-lg border-black-200 ext-md text-gray-700 ml-3"
          onClick={() => toast.dismiss(t.id)}
        >
          Dismiss
        </button>
      </span>
    ));
  };
  return {
    simple,
    success,
    warning,
    error,
    custom,
    info
  };
};
const func = ToastFunction();
const Toaster = {
  error: func.error,
  info: func.info,
  success: func.success,
  simple: func.simple,
  custom: func.custom,
  warning: func.warning
};
export { Toaster };
