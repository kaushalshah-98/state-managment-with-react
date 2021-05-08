import APP_THEME from '@public/assets/js/theme';
import { store as rootStore } from '@store/mobx';
// import { store } from '@store/redux';
import { store } from '@store/redux-toolkit';
import { ContactContext, contactStore } from '@store/mobx/contact';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from './toaster';
import { Provider as ReduxProvider } from 'react-redux';

function AllProviders({ children }: any) {
  return (
    <ThemeProvider theme={APP_THEME}>
      <ReduxProvider store={store}>
        <Provider store={rootStore}>
          <ContactContext.Provider value={contactStore}>
            <ToastProvider />
            {children}
          </ContactContext.Provider>
        </Provider>
      </ReduxProvider>
      ,
    </ThemeProvider>
  );
}

export { AllProviders };
