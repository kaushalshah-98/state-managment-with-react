import { useAuthConext } from '@store/context';
import { Toaster } from '@libs/toaster';
import { IUser } from '@models';
import { services } from '@services';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { apiActions } from '../helper/staticData';

const { AuthService: service } = services;

const LoginState = () => {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const { dispatch } = useAuthConext();

  // Login functions
  const Login = async (event: IUser) => {
    const successMsg = 'User Logged In Successfully';
    const errorMsg = 'Something went wrong';
    try {
      const res = await service.login(event);
      if (res.success === true) {
        dispatch({ type: 'LOGIN', data: res.data });
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(res.data));
        Toaster.success({ message: successMsg });
        router.push('/home');
      } else {
        Toaster.error({ message: res.message });
      }
    } catch (err) {
      console.log('LoginState.Login() error: ', err);
      Toaster.error({ message: errorMsg });
    } finally {
      setisLoading(false);
    }
  };
  const Logout = async (event = null) => {
    const successMsg = 'User Loggout Out Successfully';
    const errorMsg = 'Something went wrong';
    try {
      const res = await service.logout();
      if (res.success === true) {
        dispatch({ type: 'LOGOUT', loggedIn: false });
        localStorage.clear();
        Toaster.success({ message: successMsg });
        router.push('/login');
      } else {
        Toaster.error({ message: res.message });
      }
    } catch (err) {
      console.log('LoginState.Logout() error: ', err);
      Toaster.error({ message: errorMsg });
    } finally {
      setisLoading(false);
    }
  };
  // Form Functions
  const handleSave = (action: string, event: any) => {
    if (action === apiActions.LOGIN) {
      Login(event);
    } else if (action === apiActions.LOGOUT) {
      Logout(event);
    }
  };

  return {
    handleSave,
    isLoading,
    Logout
  };
};

export default LoginState;
