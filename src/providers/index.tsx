import { store } from '@store/index';
import { Provider } from 'react-redux';

function AllProviders({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}

export { AllProviders };
