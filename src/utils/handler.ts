// import { toasterr, toastSuccess } from './Toaster';
import { Toaster } from '@libs/toaster';

type handleProps = {
  func: (params?: any) => any;
  params?: any;
  successMsg?: string;
  errorMsg?: string;
  permissions?: any[];
  action?: string;
  toaster?: boolean;
  errorToaster?: boolean;
  successToaster?: boolean;
  authMsg?: string;
};
type isAllowedProps = {
  action: string;
  permissions: any[];
};
type ResponseType = {
  res: any;
  err: any;
  allowed: boolean;
};
const isAllowed = (props: isAllowedProps) => {
  const { action, permissions } = props;
  console.log(action);
  try {
    // const permissions = [AllPermissions.CustomerList, AllPermissions.CustomerView];
    if (permissions && permissions?.length > 0 && permissions.includes(action)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const handle = async (props: handleProps) => {
  const {
    func,
    params,
    successMsg,
    errorMsg,
    permissions,
    action = '',
    successToaster,
    toaster,
    authMsg,
    errorToaster
  } = props;
  console.log('inside handle');

  const authMessage = 'You are not authorized !!';
  let allowed = true;
  const result: ResponseType = await new Promise(async (resolve, reject) => {
    if (permissions && action) {
      allowed = isAllowed({ action, permissions });
    }
    // allowed
    if (!action || allowed) {
      try {
        const res = params ? func(params) : func();
        console.log('executed');
        if (successMsg) {
          console.info(successMsg);
          if (toaster || successToaster) {
            Toaster.success({ message: successMsg });
          }
        }
        resolve({ res, err: undefined, allowed: true });
      } catch (err) {
        if (errorMsg) {
          if (toaster || errorToaster) {
            Toaster.error({ message: errorMsg });
          }
        }
        resolve({ res: undefined, err, allowed: true });
      }
    } else {
      // not allowed
      Toaster.warning({ message: authMsg || authMessage });
      resolve({ res: undefined, err: undefined, allowed: false });
    }
  });
  return result;
};
