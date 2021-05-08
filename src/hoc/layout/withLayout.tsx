import { Slider } from '@layout/container';
import * as React from 'react';
import { FC } from 'react';

type Props = {
  title?: string;
  path?: any;
  contextRef?: any;
  store?: any;
  data?: any;
  ComposedComponent?: any;
};

const WithLayout = (ComposedComponent: any, title: any): any => {
  const WithInnerLayout: FC<Props> = (props) => {
    return (
      <div className=" h-screen flex overflow-hidden">
        <Slider />
        <div className="px-6 h-screen w-full overflow-x-scroll overflow-y-scroll bg-purplee-100">
          <div
            style={{ minHeight: '670px' }}
            className="bg-white rounded-lg my-4 py-8 w-full shadow-md"
          >
            <ComposedComponent {...props} />
          </div>
        </div>
      </div>
    );
  };

  return WithInnerLayout;
};
export { WithLayout };
