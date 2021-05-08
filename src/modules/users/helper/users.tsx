import { ActionComponent } from '@shared/table/customTable/customTableHelper';
import dayjs from 'dayjs';
import React, { memo, useMemo } from 'react';
import { apiActions, tdClassName } from './staticData';

const a = 'bg-purplee-600 hover:bg-purplee-700';
const i = 'bg-grayy-400 cursor-not-allowed';

const Action: React.FC<any> = memo((props) => {
  const { openModal, data, openDialog } = props;
  const deleteUser = () => {
    openDialog(apiActions.DELETE, data);
  };
  const editUser = () => {
    openModal(apiActions.EDIT, data);
  };
  const setRole = () => {
    openModal(apiActions.SET_ROLE, data);
  };
  const setPassword = () => {
    openModal(apiActions.SET_PASSWORD, data);
  };
  const deleteProp = { functionName: deleteUser };
  const editProp = { functionName: editUser };
  const actionProp = [
    { name: 'Set Password', functionName: setPassword },
    { name: 'Set Role', functionName: setRole }
  ];
  const ActionComponentProps = {
    deleteProp,
    editProp,
    Action: true,
    actionProp,
    onlyAction: false
  };
  return (
    <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-base leading-5 font-normal">
      <ActionComponent {...ActionComponentProps} />
    </td>
  );
});

const DateLabel: React.FC<any> = memo((props) => {
  const { keyy, data } = props;
  const date = data[keyy] ? dayjs(data[keyy]).format('DD-MM-YYYY') : '-';
  return <td className={tdClassName}>{date}</td>;
});

type HeaderProps = {
  openModal: (action: string, data: any) => void;
  selectedData: any[];
};
const UserHeader: React.FC<HeaderProps> = memo((props) => {
  const memoizedA = useMemo(() => a, [a]);
  const memoizedI = useMemo(() => i, [i]);

  const { openModal, selectedData } = props;
  const create = () => {
    openModal(apiActions.CREATE, {});
  };
  const assign = () => {
    openModal(apiActions.ASSIGN, {});
  };
  return (
    <div className="hidden sm:block">
      <div className="flex justify-between pt-4">
        <h1 className="text-2xl font-semibold text-gray-900 py-4">Users</h1>
        <div className="flex items-center space-x-4">
          <div className="mt-1 flex relative">
            <span className="flex mb-4 items-center">
              <button
                onClick={assign}
                type="button"
                disabled={selectedData?.length > 0 ? false : true}
                className={`
                ${
                  selectedData?.length > 0 ? memoizedA : memoizedI
                }  inline-flex items-center px-4 py-2 mr-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white  transition ease-in-out duration-150`}
              >
                Assign
              </button>
            </span>
            <span className="flex mb-4 items-center">
              <button
                onClick={create}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purplee-600 hover:bg-purplee-700 focus:outline-none focus:border-purplee-600 focus:shadow-outline-redd active:bg-purplee-600 transition ease-in-out duration-150"
              >
                Create User
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

const components = {
  Action,
  DateLabel
};

export { components, UserHeader };
