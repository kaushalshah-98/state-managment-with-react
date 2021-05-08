import { css } from '@emotion/core';
import { FC, memo } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

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
const Spinner: FC<SpinnerProps> = (props) => {
  const { size = 35, color = '#fff', loading = true } = props;
  return (
    <div className="sweet-loading">
      <ClipLoader color={color} loading={loading} css={override} size={size} />
    </div>
  );
};
export default memo(Spinner);
