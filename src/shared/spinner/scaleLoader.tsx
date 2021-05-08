import { css } from '@emotion/core';
import { memo } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

type SpinnerProps = {
  tip?: string;
  size?: number;
  loading?: boolean;
  radius?: string | number;
  color?: string;
  height?: string | number;
  width?: string | number;
};
const ScaleLoad = (props: SpinnerProps) => {
  const { color = '#9F7AEA', loading = true } = props;
  return (
    <div className="sweet-loading flex justify-center items-center">
      <ScaleLoader
        color={color}
        height={120}
        loading={loading}
        css={override}
        width={20}
        radius={25}
        margin={15}
      />
    </div>
  );
};
export default memo(ScaleLoad);
