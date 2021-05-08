import * as React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '@libs/json/loader.json';
import { memo } from 'react';

export interface IOptions {
  loop?: boolean;
  autoplay?: boolean;
  animationData?: any;
  rendererSettings?: any;
}

export interface ILoaderProps {
  options?: IOptions;
  height?: number;
  width?: number;
}

function Loader(props: ILoaderProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    // @ts-ignore
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
    ...props.options
  };

  return (
    // <div>
    <Lottie
      style={{
        color: '#68D391'
      }}
      css={`
        color: '#68D391';
      `}
      options={defaultOptions}
      height={props.height || 400}
      width={props.width || 400}
      // zIndex="100"
    />
    // </div>
  );
}

export default memo(Loader);
