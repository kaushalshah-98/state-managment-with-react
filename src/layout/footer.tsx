import React, { FC, memo } from 'react';
import { SidebarFooter } from 'react-pro-sidebar';
import * as Feather from 'react-feather';

type Props = {
  collapsed: boolean;
  toggle: any;
};
const Footer: FC<Props> = memo((props) => {
  const { collapsed, toggle } = props;

  return (
    <div className="px-2.5 my-4">
      <SidebarFooter>
        {collapsed ? (
          <button
            onClick={toggle}
            className="text-gray-600 flex justify-center items-center w-full cursor-pointer rounded-md p-2.5 hover:bg-grayy-300"
          >
            <Feather.ChevronsRight />
          </button>
        ) : (
          <button
            onClick={toggle}
            className="flex space-x-4 w-full items-center text-gray-600 rounded-md p-2.5 hover:bg-grayy-300"
          >
            <Feather.ChevronsLeft />
            <p className="text-gray-700">Collapse</p>
          </button>
        )}
      </SidebarFooter>
    </div>
  );
});

export { Footer };
