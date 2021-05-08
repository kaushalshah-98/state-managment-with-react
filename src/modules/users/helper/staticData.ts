import { FilterTypes } from '@shared/table/customTable/filters';

const limit = 6;
const deleteUserConfig = {
  header: 'Delete User',
  text: 'Are You Sure Want To Delete This User?',
  cancelText: 'Cancel',
  confirmText: 'Delete'
};

const thClassName =
  'px-5 py-3 text-left text-sm leading-4 font-medium text-grayy-600 uppercase tracking-wider';

const activeAnchorClassName =
  'whitespace-no-wrap ml-8 py-4 px-1 border-b-4 border-yellow-500 font-medium text-sm leading-5 text-yellow-600 focus:outline-none focus:text-yellow-800 focus:border-yellow-700';
const inactiveAnchorClassName =
  'whitespace-no-wrap ml-8 py-4 px-1 border-b-4 border-transparent font-medium text-sm leading-5 text-black-600 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300';
const Actions = {};
const tdClassName =
  'px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-700';
const QueryVars = { offset: 0, limit };
const numbersToshow = 4;
const getdialogConfig = (action: string) => {
  switch (action) {
    case apiActions.DELETE:
      return deleteUserConfig;
    default:
      return null;
  }
};
const UserRoles = {
  ADMIN: 'Admin',
  USER: 'User'
};
const activeClass = { background: '#9F7AEA', color: '#fff' };
const apiActions = {
  CREATE: 'create',
  ASSIGN: 'assign',
  EDIT: 'edit',
  DELETE: 'delete',
  SET_PASSWORD: 'setpassword',
  SET_ROLE: 'setrole'
};
const lastnames = [
  { name: 'static', value: 'static' },
  { name: 'hello', value: 'hello' },
  { name: 'how', value: 'how' },
  { name: 'are', value: 'are' },
  { name: 'you', value: 'you' },
  { name: 'yess', value: 'yess' },
  { name: 'dynamic', value: 'dynamic' },
  { name: 'are', value: 'are' },
  { name: 'you', value: 'you' },
  { name: 'yess', value: 'yess' },
  { name: 'dynamic', value: 'dynamic' }
];
const USER_KEY_PAIR = {
  FIRST_NAME: { key: 'firstName', label: 'First Name', excelLabel: 'First Name' },
  LAST_NAME: { key: 'lastName', label: 'Last Name', excelLabel: 'Last Name' },
  MOBILE: { key: 'mobile', label: 'Mobile', excelLabel: 'Mobile' },
  EMAIL: { key: 'email', label: 'Email', excelLabel: 'Email' },
  ROLE: { key: 'role', label: 'Role', excelLabel: 'Role' },
  CREATED_AT: { key: 'createdAt', label: 'Created At', excelLabel: 'Created At' },
  UPDATED_AT: { key: 'updatedAt', label: 'Updated At', excelLabel: 'Updated At' }
};
const headers = [
  {
    key: 'checkbox',
    value: '',
    property: '',
    thClassName
  },
  {
    key: USER_KEY_PAIR.FIRST_NAME.key,
    value: USER_KEY_PAIR.FIRST_NAME.label,
    property: USER_KEY_PAIR.FIRST_NAME.excelLabel,
    thClassName,
    type: FilterTypes.search
  },
  {
    key: USER_KEY_PAIR.LAST_NAME.key,
    value: USER_KEY_PAIR.LAST_NAME.label,
    property: USER_KEY_PAIR.LAST_NAME.excelLabel,
    thClassName,
    type: FilterTypes.checkbox,
    list: 'lastnames'
  },
  {
    key: USER_KEY_PAIR.EMAIL.key,
    value: USER_KEY_PAIR.EMAIL.label,
    property: USER_KEY_PAIR.EMAIL.excelLabel,
    thClassName,
    type: FilterTypes.sort
  },
  {
    key: USER_KEY_PAIR.ROLE.key,
    value: USER_KEY_PAIR.ROLE.label,
    property: USER_KEY_PAIR.ROLE.excelLabel,
    thClassName
  },
  {
    key: USER_KEY_PAIR.CREATED_AT.key,
    value: USER_KEY_PAIR.CREATED_AT.label,
    property: USER_KEY_PAIR.CREATED_AT.excelLabel,
    component: 'DateLabel',
    type: FilterTypes.date,
    thClassName
  },
  {
    key: USER_KEY_PAIR.UPDATED_AT.key,
    value: USER_KEY_PAIR.UPDATED_AT.label,
    property: USER_KEY_PAIR.UPDATED_AT.excelLabel,
    component: 'DateLabel',
    thClassName
  },
  {
    key: 'action',
    value: 'Action',
    component: 'Action',
    thClassName
  }
];
export {
  QueryVars,
  USER_KEY_PAIR,
  limit,
  UserRoles,
  apiActions,
  tdClassName,
  deleteUserConfig,
  headers,
  Actions,
  lastnames,
  numbersToshow,
  inactiveAnchorClassName,
  activeClass,
  activeAnchorClassName,
  getdialogConfig
};
