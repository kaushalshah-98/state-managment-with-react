import { useAuthConext } from '@store/context';
import { Toaster } from '@libs/toaster';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import BeatLoader from '@shared/spinner/scaleLoader';

function withAuthentication(WrappedComponent: any) {
  const withAuthenticationWrappedComponent = (props: any) => {
    const router = useRouter();
    const { state, dispatch } = useAuthConext();
    // const { AuthService: service } = services;
    const [checked, setchecked] = useState(false);

    useEffect(() => {
      authenticate();
    }, []);

    const authenticate = async () => {
      try {
        if (!state.isLoggedIn) {
          console.log('Reloaded and Validating Again');
          // const res = await service.authenticate();
          const loggedIn = localStorage.getItem('loggedIn');
          const user = localStorage.getItem('user');
          if (loggedIn === 'true') {
            dispatch({ type: 'SET_USER', user: JSON.parse(user || '') });
          } else {
            Toaster.warning({ message: 'You are Not Authorized' });
            await router.push('/login');
          }
        }
      } catch (err) {
        console.log('withAuthentication.authenticate() error: ', err);
      } finally {
        setchecked(true);
      }
    };
    if (checked || state.isLoggedIn) {
      return <WrappedComponent {...props} />;
    }
    return (
      <div className="absolute inset-0  h-full flex flex-col">
        <div className="z-50 bg-gray-800 opacity-70 h-full flex justify-center items-center">
          <BeatLoader />
        </div>
        {/* <WrappedComponent {...props} /> */}
      </div>
    );
    return <WrappedComponent {...props} />;
  };
  return withAuthenticationWrappedComponent;
}
export { withAuthentication };
