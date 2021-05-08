import { Dialog, Modal } from '@shared/modals';
// import { SpinnerContainer } from '@shared/spinner';
import CustomTable, { IDataTableProps } from '@shared/table/customTable/customTable';
import React, { FC } from 'react';
import UserState from '../controller/user';
import {
  activeClass,
  apiActions,
  deleteUserConfig,
  headers,
  lastnames,
  limit
} from '../helper/staticData';
import { components, UserHeader } from '../helper/users';
import AddEdit from '../modals/addEdit';
import Assign from '../modals/assign';
import ResetPasswordModal from '../modals/resetPasswordModal';
import SetRole from '../modals/setRole';

type Props = {
  title?: string;
  path?: any;
  active?: boolean;
  contextRef?: any;
  store?: any;
  data?: any;
  ref?: any;
};

const Users: FC<Props> = (props) => {
  const {
    data,
    page,
    totalPages,
    title,
    modal1,
    modal2,
    modal3,
    modal4,
    dialog1,
    totalRecords,
    isLoading,
    selectedData,
    loading,
    userData,
    handleCheckBox,
    // dialogConfig,
    changePage,
    handleSave,
    openModal,
    closeModal,
    openDialog,
    closeDialog
  } = UserState();
  const pagination = {
    changePage,
    totalPages,
    totalRecords,
    page,
    activeClass,
    limit
  };
  const CustomTableProps: IDataTableProps = {
    headers,
    lists: { lastnames },
    data,
    components,
    uniqueKey: 'email',
    loading,
    pagination,
    functions: { changePage, openModal, openDialog, handleCheckBox }
  };
  const FormProps = {
    // formData,
    userData,
    // customers,
    title,
    isLoading,
    handleSave,
    closeModal
  };

  const ModalProps = { onClose: closeModal };
  const Modal1Props = {
    open: modal1,
    ...ModalProps
  };
  const Modal2Props = { open: modal2, ...ModalProps };
  const Modal3Props = { open: modal3, ...ModalProps };
  const Modal4Props = {
    open: modal4,
    ...ModalProps,
    className:
      'relative bg-white rounded-lg pb-4 shadow-xl transform transition-all sm:max-w-lg sm:w-full'
  };
  const AddEditModalProps = { userData, isLoading, handleSave, closeModal, title };
  const UserHeaderProps = { openModal, selectedData };
  const DialogProps = {
    loading: isLoading,
    open: dialog1,
    confirm: () => handleSave(apiActions.DELETE, {}),
    onClose: closeDialog,
    ...deleteUserConfig
    // ...dialogConfig
  };

  return (
    <div className="px-8">
      {/* <SpinnerContainer loading={isLoading} /> */}
      <UserHeader {...UserHeaderProps} />
      <CustomTable {...CustomTableProps} />
      <Modal {...Modal1Props}>
        <AddEdit {...AddEditModalProps} />
      </Modal>
      <Modal {...Modal2Props}>
        <ResetPasswordModal {...FormProps} />
      </Modal>
      <Modal {...Modal3Props}>
        <SetRole {...FormProps} />
      </Modal>
      <Modal {...Modal4Props}>
        <Assign {...FormProps} />
      </Modal>
      <Dialog {...DialogProps} />
    </div>
  );
};

export default Users;
