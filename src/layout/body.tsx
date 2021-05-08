import React, { FC, memo } from 'react';
import * as Feather from 'react-feather';
import { NavheadersType } from './menuItems';

const active =
  'bg-purplee-300 cursor-pointer text-grayy-900 group flex items-center px-4 py-1.5 text-base font-medium rounded-md';
const inactive =
  'bg-white cursor-pointer hover:bg-purplee-100 text-grayy-600 focus:text-gray-800 group flex items-center px-4 py-1.5 text-base font-medium rounded-md';

const cactive =
  'group flex bg-purplee-300 cursor-pointer items-center justify-center px-3 py-1.5 text-base rounded-md focus:text-gray-800  font-medium rounded-md text-gray-700 hover:text-gray-900 focus:outline-none transition ease-in-out duration-150';
const cinactive =
  'group flex items-center cursor-pointer justify-center px-3 py-1.5 text-base rounded-md focus:text-gray-800  font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-purplee-100 focus:outline-none transition ease-in-out duration-150';

type ListProps = {
  item: NavheadersType;
  handleClick: (item: NavheadersType, index: number) => void;
  index: number;
};
type Props = {
  collapsed: boolean;
  navheaders: NavheadersType[];
  handleClick: (item: NavheadersType, index: number) => void;
  handleLogout: () => void;
};
const ClosedElement: FC<ListProps> = memo((props) => {
  const { item, handleClick, index } = props;

  return (
    <>
      <React.Fragment>
        <span
          className={item.active ? cactive : cinactive}
          onClick={() => handleClick(item, index)}
        >
          <div className={item.active ? 'text-gray-800' : 'text-gray-500 '}>{item.icons}</div>
        </span>
      </React.Fragment>
    </>
  );
});
const OpenedElement: FC<ListProps> = memo((props) => {
  const { item, handleClick, index } = props;
  return (
    <>
      <React.Fragment>
        <span className={item.active ? active : inactive} onClick={() => handleClick(item, index)}>
          <div className={item.active ? 'text-grayy-800 mr-4' : 'text-grayy-600 mr-4'}>
            {item.icons}
          </div>
          {item.name}
        </span>
      </React.Fragment>
    </>
  );
});
const Body: FC<Props> = memo((props) => {
  const { collapsed, navheaders, handleClick, handleLogout } = props;

  return (
    <nav className="-mt-8 flex-1 px-2.5 bg-white space-y-1">
      {navheaders.map((item, index) => {
        return (
          <div key={index}>
            {collapsed ? (
              <ClosedElement item={item} handleClick={handleClick} index={index} />
            ) : (
              <OpenedElement item={item} handleClick={handleClick} index={index} />
            )}
          </div>
        );
      })}
      {collapsed ? (
        <span className={cinactive} onClick={() => handleLogout()}>
          <div className={'text-gray-500 '}>
            <Feather.LogOut />
          </div>
        </span>
      ) : (
        <span className={inactive} onClick={() => handleLogout()}>
          <Feather.LogOut className={'text-gray-500 focus:text-gray-800 ml-1  mr-3'} />
          <p>Logout</p>
        </span>
      )}
    </nav>
  );
});

export { Body };
