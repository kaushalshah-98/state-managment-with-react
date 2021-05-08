import { Validation } from '@config/interfaces';
import { FooterButton, SelectLabel } from '@shared/forms';
import { ModalHeader } from '@shared/modals';
import React, { FC, memo } from 'react';
import { useForm } from 'react-hook-form';

type AssignApproverModalProps = {
  handleSave: (acion: string, data: { customer_id: string }) => void;
  isLoading: boolean;
  customers?: any[];
  closeModal: () => void;
};
//
const validations: Validation = {
  customer_id: { required: 'Select Any one' }
};
const AssignCustomer: FC<AssignApproverModalProps> = (props) => {
  const { handleSave, closeModal, customers, isLoading } = props;
  const { handleSubmit, setValue, errors, control } = useForm();
  const onSubmit = (data: { customer_id: string }) => {
    handleSave('Assign Approver', data);
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
      <ModalHeader title={'Assign Customer'} onClose={closeModal} />
      <div className="mb-72">
        <form>
          <div className="sm:rounded-md">
            <div className="p-8">
              <SelectLabel
                control={control}
                options={customers}
                setValue={setValue}
                errors={errors}
                name="customer_id"
                rules={validations.customer_id}
              />
            </div>
          </div>
        </form>
      </div>
      <FooterButton {...FooterButtonProps} />
    </>
  );
};

export default memo(AssignCustomer);
