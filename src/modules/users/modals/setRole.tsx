import { Validation } from '@config/interfaces';
import { FooterButton, SelectLabel } from '@shared/forms';
import { ModalHeader } from '@shared/modals';
import React, { FC, memo } from 'react';
import { useForm } from 'react-hook-form';
import { UserRoles } from '../helper/staticData';

type AssignApproverModalProps = {
  handleSave: (acion: string, data: { role: string }) => void;
  isLoading: boolean;
  closeModal: () => void;
};
const arr = [
  { label: UserRoles.ADMIN, value: 'admin' },
  { label: UserRoles.USER, value: 'user' }
];
const validations: Validation = {
  role: { required: 'Select Any one' }
};
const RoleModal: FC<AssignApproverModalProps> = (props) => {
  const { closeModal, isLoading } = props;
  const { handleSubmit, setValue, errors, control } = useForm();
  const onSubmit = (data: { role: string }) => {
    console.log(data);
    // handleSave(data, 'Assign Approver');
  };
  const FooterButtonProps = {
    loading: isLoading,
    btn1Name: 'Save',
    btn2Name: 'Cancel',
    btn1Function: handleSubmit(onSubmit),
    btn2function: closeModal
  };
  return (
    <>
      <ModalHeader title={'Set Role'} onClose={closeModal} />
      <div className="mb-24">
        <form>
          <div className="sm:rounded-md">
            <div className="p-8">
              <SelectLabel
                control={control}
                rules={validations.role}
                closeMenuOnSelect={true}
                defaultValue={'admin'}
                options={arr}
                setValue={setValue}
                errors={errors}
                name="role"
              />
            </div>
          </div>
        </form>
      </div>
      <FooterButton {...FooterButtonProps} />
    </>
  );
};

export default memo(RoleModal);
