import APP_THEME from '@public/assets/js/theme';
import { store } from '@store/index';
import { ContactProvider } from '@store/contact';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { FC } from 'react';

function combineProviders(...providers: FC[]) {
  return ({ children }: any) =>
    providers.reduce(
      (prev, CurrentProvider) => <CurrentProvider>{prev}</CurrentProvider>,
      children
    );
}

const CombinedProviders = combineProviders(ContactProvider);

function AllProviders({ children }: any) {
  return (
    <ThemeProvider theme={APP_THEME}>
      <Provider store={store}>
        <CombinedProviders>{children}</CombinedProviders>
      </Provider>
    </ThemeProvider>
  );
}

export { AllProviders };
