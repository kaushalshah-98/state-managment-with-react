import { useSliderConext } from '@store/context';
import { testing, NavheadersType } from '@layout/menuItems';
import LoginState from '@modules/auth/controller/login';
import { useRouter } from 'next/router';
import React, { FC, memo, useEffect, useState } from 'react';
import { ProSidebar } from 'react-pro-sidebar';
import { Body } from './body';
import { Footer } from './footer';
import { Header } from './header';
import styled from 'styled-components';

type LoaderProps = {
  collapsed?: boolean;
};
const CustomSlider = styled.div<LoaderProps>`
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: ${(props) => (props.collapsed ? '4px' : '8px')};
    /* width: 4px; */
    background-color: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(121, 121, 121);
    border-radius: 20px;
  }
  ::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
  }
`;
const Slider: FC<any> = memo((props) => {
  const { Logout } = LoginState();
  const [navheaders, setnavheaders] = useState(testing);
  const { state, dispatch } = useSliderConext();
  // const [collapsed, setcollapsed] = useState(state.collapsed);
  const router = useRouter();
  const url = router?.pathname;
  const path = url.toLocaleLowerCase();

  useEffect(() => {
    navheaders.forEach((item: any) => {
      item.active = false;
      item.isMenuOpen = false;
      item.active = path === item.url.toLocaleLowerCase() ? true : false;
    });
    setnavheaders([...navheaders]);
  }, []);

  const handleLogout = () => {
    Logout();
  };
  const toggle = () => {
    dispatch({ type: 'SET_COLLAPSE', collapsed: !state.collapsed });
  };
  const handleClick = async (item: NavheadersType, index: number) => {
    const newNavHeaders = [...navheaders];
    if (item.url) {
      router.push(item.url);
      newNavHeaders.forEach((i) => (i.active = false));
      newNavHeaders[index].active = true;
      // setnavheaders([...newNavHeaders]);
    }
  };
  const HeaderProps = { collapsed: state.collapsed };
  const FooterProps = { collapsed: state.collapsed, toggle };
  const BodyProps = { collapsed: state.collapsed, handleClick, handleLogout, navheaders };

  return (
    <ProSidebar className="shadow  bg-white border-r border-gray-200" collapsed={state.collapsed}>
      <CustomSlider collapsed={state.collapsed}>
        <Header {...HeaderProps} />
        <Body {...BodyProps} />
        <Footer {...FooterProps} />
      </CustomSlider>
    </ProSidebar>
  );
});

export { Slider };
