import { css } from '@emotion/core';
import { FC, memo } from 'react';
import HashLoader from 'react-spinners/HashLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  /* display: block; */
  /* margin: 0 auto; */
  /* border-color: #48bb78; */
`;

type SpinnerProps = {
  tip?: string;
  size?: number;
  color?: string;
  loading?: boolean;
  radius?: string | number;
  height?: string | number;
  width?: string | number;
};
const HashLoad: FC<SpinnerProps> = (props) => {
  const { size = 50, color = '#9F7AEA', loading = true } = props;
  return (
    <div className="sweet-loading flex items-center justify-center">
      <HashLoader color={color} loading={loading} css={override} size={size} />
    </div>
  );
};
export default memo(HashLoad);
