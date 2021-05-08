// Breakpoints
const breakpoints = ['576px', '768px', '992px', '1200px'];
// @media screen and (min-width: 40em)
// @media screen and (min-width: 52em)
// @media screen and (min-width: 64em)

// Other units work as well, but em units are recommended
// const breakpoints = [ '300px', '600px', '1200px' ]

// FontFamily
const fonts = {
  default: "'Roboto', san-serif",
  title: "'Roboto', san-serif",
  btn: "'Roboto', san-serif",
  content: "'Roboto', san-serif"
};

// Typographic Scale
// numbers are converted to px values
const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 72];
// Spacing Scale
// used for margin and padding
const space = [0, 8, 16, 20, 24, 32, 64];

const colors = {
  text: '#343434',
  titletext: '#343434',
  subtext: '#666666',
  primary: '#286739',
  navyblue: '#2e3292',
  darkred: '#92241F',
  lightgreen: '#34A151;',
  yellow: '#F2C94C',
  gray: ['#f8f8f8', '#ebebeb', '#989898', '#8b8b8b', '#6d6d6d', '#6c6c6c', '#5d5d5d']
};

const lineHeights = [1, 1.125, 1.25, 1.5];

const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  bolder: 800
};

const letterSpacings = {
  normal: 'normal',
  caps: '0.25em'
};

const radii = [0, 1, 2, 3, 4, 8];

const borders = [0, '1px solid', '2px solid'];

const shadows = [`0 1px 2px 0 ${colors.text}`, `0 1px 4px 0 ${colors.text}`];

export default {
  breakpoints,
  colors,
  space,
  fonts,
  fontSizes,
  lineHeights,
  fontWeights,
  letterSpacings,
  radii,
  borders,
  shadows
};
