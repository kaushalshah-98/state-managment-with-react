import { ContactProvider } from '@store/contact';
import { store } from '@store/index';
import { Provider } from 'mobx-react';
import { FC } from 'react';

function combineProviders(...providers: FC[]) {
  return ({ children }: any) =>
    providers.reduce(
      (prev, CurrentProvider) => <CurrentProvider>{prev}</CurrentProvider>,
      children
    );
}
1;
const CombinedProviders = combineProviders(ContactProvider);

function AllProviders({ children }: any) {
  return (
    <Provider store={store}>
      <CombinedProviders>{children}</CombinedProviders>
    </Provider>
  );
}

export { AllProviders };
