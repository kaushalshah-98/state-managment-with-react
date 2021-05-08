// import { Spin } from 'antd';
import HashLoader from '@shared/spinner/hashLoader';
import { useRouter } from 'next/router';
import React, { FC, memo } from 'react';

type SpinnerContainerProps = {
  loading: boolean;
  children?: any;
};

const Container: FC<SpinnerContainerProps> = (props) => {
  const { loading, children } = props;
  const router = useRouter();
  if (loading) {
    return (
      <>
        <div className="absolute inset-0 bg-gray-800 opacity-70  h-full flex justify-center items-center">
          <div
            className="flex-col justify-center items-center space-y-6"
            onClick={() => {
              router.push('/home');
            }}
          >
            <HashLoader size={90} color="#B794F4" />
            {/* <p className="text-4xl z-50">Hello</p> */}
          </div>
        </div>
        {children}
      </>
    );
  }
  return <>{children}</>;
};

export default memo(Container);
