import React, { FC, memo } from 'react';
import { SidebarHeader } from 'react-pro-sidebar';

type Props = {
  collapsed: boolean;
};
const Header: FC<Props> = memo((props) => {
  const { collapsed } = props;
  return (
    <SidebarHeader>
      <div
        className={
          collapsed
            ? 'flex items-center flex-shrink-0 mt-2 mb-12 justify-center'
            : 'flex items-center flex-shrink-0 -mt-8 px-3'
        }
      >
        {collapsed ? (
          <img className="h-12 w-auto" src="/assets/img/short.png" alt="Action Engineers" />
        ) : (
          <img className="h-52 w-auto" src="/assets/img/lgo.png" alt="Action Engineers" />
        )}
      </div>
    </SidebarHeader>
  );
});

export { Header };
