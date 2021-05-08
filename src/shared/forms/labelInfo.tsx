import React, { FC, memo } from 'react';
import * as Feather from 'react-feather';
import { Popover } from 'react-tiny-popover';
import { Label } from './label';

type LabelInfoProps = {
  label: string;
  placement?: ('left' | 'right' | 'top' | 'bottom')[];
  title?: string;
  size?: string;
  iconClass?: string;
  required?: boolean;
  padding?: number;
  camelCase?: boolean;
  align?: 'start' | 'center' | 'end';
  upperCase?: boolean;
  containerClassName?: string;
  onClickOutside?: any;
  Content: any;
  open: boolean;
  className?: string;
};
const LabelInfo: FC<LabelInfoProps> = memo((props) => {
  const {
    label,
    className,
    Content,
    // title,
    required,
    padding,
    onClickOutside,
    open,
    camelCase,
    containerClassName,
    iconClass,
    upperCase,
    placement = ['bottom'],
    size = '15',
    align = 'center'
  } = props;
  return (
    <>
      <div className={className || 'flex items-center space-x-2'}>
        <Label label={label} required={required} camelCase={camelCase} upperCase={upperCase} />
        <Popover
          padding={padding}
          isOpen={open}
          align={align}
          containerClassName={containerClassName}
          positions={placement}
          onClickOutside={onClickOutside}
          content={Content}
        >
          <Feather.Info
            size={size}
            className={iconClass || 'text-blue-500 cursor-pointer hover:text-blue-700'}
          />
        </Popover>
      </div>
    </>
  );
});
export { LabelInfo };
