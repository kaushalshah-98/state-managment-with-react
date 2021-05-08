import { IHeaders } from '@config/interfaces';
import { CheckLabel, InputLabel, SelectLabel } from '@shared/forms';
import { getData } from '@utils';
import React, { FC, Fragment } from 'react';
import * as FeatherIcon from 'react-feather';
import styled from 'styled-components';
import { tdClassName } from '../customTable/customTableHelper';
const selectClassName = 'mt-1 w-56 -mr-6 bg-white rounded-md shadow-sm text-gray-700';

const header2: IHeaders[] = [{ key: 'action', value: 'Action', component: 'Actions' }];
const getHeader = (value: boolean, headers: IHeaders[]) =>
  value ? headers : [...headers, ...header2];
const Actions: FC<any> = (props) => {
  const { editRow, deleteRow, submit, corectRow, index, data } = props;
  const done = (idx: number) => {
    corectRow(idx);
    submit();
  };
  const deleterow = (event: any) => {
    event.preventDefault();
    deleteRow(index);
  };
  const editrow = (event: any) => {
    event.preventDefault();
    data.edit === true ? done(index) : editRow(index);
  };
  return (
    <>
      <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-base leading-5 font-normal">
        <button onClick={editrow} className="mr-8 text-gray-600 p-2 rounded-full hover:bg-gray-200">
          {data.edit === true ? (
            <FeatherIcon.Check strokeWidth="1.5px" />
          ) : (
            <FeatherIcon.Edit strokeWidth="1.5px" />
          )}
        </button>
        <button
          onClick={data.edit === true ? () => {} : deleterow}
          className={`${
            data.edit === true ? 'cursor-not-allowed' : 'hover:bg-gray-200'
          } mr-8 text-gray-600 p-2 rounded-full `}
        >
          <FeatherIcon.Trash2 strokeWidth="1.5px" />
        </button>
      </td>
    </>
  );
};
type LabelProps = {
  keyy: string;
  control: any;
  row: any;
  displayOnly: boolean;
  inputType?: string;
  type?: string;
  validation?: any;
  setValue?: any;
  errors: any;
  register: any;
  values?: any[];
  index: number;
};

const Label: FC<LabelProps> = (props) => {
  const {
    keyy,
    row,
    errors,
    values,
    control,
    setValue,
    validation = null,
    register,
    inputType = 'text',
    type = 'input'
    // index
  } = props;
  let data = getData(keyy, row);
  if (row.edit === true) {
    if (type === 'input') {
      return (
        <>
          <td className={tdClassName}>
            <InputLabel
              type={inputType}
              errors={errors}
              defaultValue={data}
              register={register(validation || { required: 'Field is required' })}
              name={keyy}
              inputClass="mt-1 form-input block w-full py-1.5 px-3 hover:border-blue-400 border border-gray-300 rounded-md shadow-sm focus:shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </td>
        </>
      );
    } else if (type === 'select') {
      return (
        <>
          <td className={tdClassName}>
            <SelectLabel
              setValue={setValue}
              control={control}
              size="default"
              selectClass={selectClassName}
              options={values}
              errors={errors}
              defaultValue={data}
              rules={validation || { required: 'Field is required' }}
              name={keyy}
            />
          </td>
        </>
      );
    } else if (type === 'checkBox') {
      return (
        <>
          <td className={tdClassName}>
            <CheckLabel
              errors={errors}
              defaultValue={data}
              register={register()}
              name={keyy}
              checkClass="form-checkbox ml-6 h-5 w-5 text-blue-500 transition duration-150 ease-in-out bg-gray-200"
            />
          </td>
        </>
      );
    }
  } else {
    if (data !== '' && (data === 'true' || data === true || data === 'false' || data === false)) {
      data = data === true || data === 'true' ? 'Yes' : 'No';
    } else if (type === 'select' && values) {
      values.forEach((item) => (item.value === data ? (data = item.name) : ''));
      data = data || '';
    }
    return <td className={tdClassName}>{data}</td>;
  }
  return <></>;
};

type DynamicComponentProps = {
  head: any;
  components: any;
  functions?: any;
  index: number;
  idx: number;
  row: any;
};
const DynamicComponent: FC<DynamicComponentProps> = (props) => {
  const { head, components, functions, idx, row, index } = props;
  const Comp = components[head.component];
  const CompProps = { data: row, index, keyy: head.key, ...functions };
  return (
    <Fragment key={idx}>
      <Comp {...CompProps} />
    </Fragment>
  );
};

const Load = styled.td`
  z-index: 999;
  position: relative;
  left: 50%;
  top: 60%;
`;
const allcomponents = { Actions };
export { DynamicComponent, Label, Load, allcomponents, getHeader };
