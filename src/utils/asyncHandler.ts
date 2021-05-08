// import { toasterr, toastSuccess } from './Toaster';
import { Toaster } from '@libs/toaster';
type handleProps = {
  func: (params?: any) => Promise<any>;
  successMsg?: string;
  errorMsg?: string;
  params?: any;
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
export const isAllowed = (props: isAllowedProps) => {
  const { action, permissions } = props;
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
export const handleAsync = async (props: handleProps) => {
  const {
    func,
    successMsg,
    errorMsg,
    permissions,
    params,
    action = '',
    successToaster,
    toaster,
    authMsg,
    errorToaster
  } = props;
  const authMessage = 'You are not authorized !!';
  let allowed = true;
  const result: ResponseType = await new Promise(async (resolve, reject) => {
    if (permissions && action) {
      allowed = isAllowed({ action, permissions });
    }
    // allowed
    if (!action || allowed) {
      try {
        const res = await func(params);
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
