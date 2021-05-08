import Head from 'next/head';
import * as React from 'react';

type Props = {
  title?: string;
  path?: any;
  contextRef?: any;
  store?: any;
  data?: any;
  ComposedComponent?: any;
};

type IWithLayoutState = { navigationObject: any[] };
const HOC = (ComposedComponent: any): any => {
  class WithLayout extends React.Component<Props, IWithLayoutState> {
    constructor(props: Props) {
      super(props);
      this.state = { navigationObject: [] };
    }
    render() {
      return (
        <div>
          <Head>
            <link rel="icon" href="https://i.imgur.com/cADuAL6.png" />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@tailwindcss/ui@latest/dist/tailwind-ui.min.css"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
              rel="stylesheet"
            />
          </Head>
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }
  return WithLayout;
};
export default HOC;
