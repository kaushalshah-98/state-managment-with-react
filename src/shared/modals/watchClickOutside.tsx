import React, { FC, memo, useEffect, useRef } from 'react';

type Props = {
  children: any;
  // open: boolean;
  className?: string;
  onClickOutside: () => void;
};
export const WatchClickOutside: FC<Props> = memo((props) => {
  const { className, onClickOutside } = props;
  const ref: any = useRef();

  const handleClickOutside = (e: any) => {
    if (ref.current.contains(e.target)) {
      // inside click
      return;
    }
    onClickOutside();
    // outside click
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={className} ref={ref}>
      {props.children}
    </div>
  );
});
