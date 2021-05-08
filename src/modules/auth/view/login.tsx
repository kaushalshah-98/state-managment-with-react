import { inject, observer } from 'mobx-react';
import { FC } from 'react';
import LoginState from '../controller/login';
import LoginView from './loginView';

type Props = {
  title?: string;
  path?: any;
  active?: boolean;
  contextRef?: any;
  store?: any;
  data?: any;
  ref?: any;
};
const Login: FC<Props> = (props) => {
  const { handleSave, isLoading } = LoginState();
  const LoginProps = { handleSave, isLoading };
  return (
    <div>
      <LoginView {...LoginProps} />
    </div>
  );
};

export default inject('store')(observer(Login));

// export default Login;
