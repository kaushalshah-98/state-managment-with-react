export type NavheadersType = {
  name?: string;
  url?: string;
  active?: boolean;
  icons?: any;
  child?: NavheadersType[];
  isMenuOpen?: boolean;
};
import * as Feather from 'react-feather';

export const testing: NavheadersType[] = [
  {
    name: 'Home',
    icons: <Feather.Home />,
    url: '/home',
    active: false
  },
  {
    name: 'Styles',
    icons: <Feather.Aperture />,
    url: '/styless',
    active: false
  },
  {
    name: 'Popover',
    icons: <Feather.Triangle />,
    url: '/popover',
    active: false
  },
  {
    name: 'Tooltip',
    icons: <Feather.Type />,
    url: '/tooltip',
    active: false
  },
  {
    name: 'Toaster',
    icons: <Feather.Heart />,
    url: '/toaster',
    active: false
  },
  {
    name: 'Fetch',
    icons: <Feather.Anchor />,
    url: '/fetch',
    active: false
  },
  {
    name: 'Modal',
    icons: <Feather.Grid />,
    url: '/modal',
    active: false
  },
  {
    name: 'Buttons',
    icons: <Feather.Feather />,
    url: '/buttons',
    active: false
  },
  {
    name: 'Tags',
    icons: <Feather.ToggleRight />,
    url: '/tags',
    active: false
  },
  {
    name: 'Accordion',
    icons: <Feather.CornerUpRight />,
    url: '/collapse',
    active: false
  },
  {
    name: 'Spinner',
    icons: <Feather.Circle />,
    url: '/spinner',
    active: false
  },
  {
    name: 'Table',
    icons: <Feather.List />,
    url: '/table',
    active: false
  },
  {
    name: 'Overlay',
    icons: <Feather.Droplet />,
    url: '/overlay',
    active: false
  }
];
