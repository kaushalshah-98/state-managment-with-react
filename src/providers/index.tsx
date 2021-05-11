import { ContactProvider } from '@store/contact';
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
  return <CombinedProviders>{children}</CombinedProviders>;
}

export { AllProviders };
