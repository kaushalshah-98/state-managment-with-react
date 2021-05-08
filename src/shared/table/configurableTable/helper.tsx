import { IHeaders } from '@config/interfaces';
import { InputLabel } from '@shared/forms';
import { getData } from '@utils';
import { FC, Fragment } from 'react';
import * as FeatherIcon from 'react-feather';
import styled from 'styled-components';
import { tdClassName } from '../customTable/customTableHelper';

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
  row: any;
  displayOnly: boolean;
  errors: any;
  validation?: any;
  register: any;
  index: number;
};
const Label: FC<LabelProps> = (props) => {
  const { keyy, row, errors, register, validation } = props;
  const data = getData(keyy, row);

  return row.edit === true ? (
    <td className={tdClassName}>
      <InputLabel
        errors={errors}
        defaultValue={data}
        register={register(validation || { required: 'Field is required' })}
        name={keyy}
        inputClass="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md hover:border-blue-400 focus:shadow-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      />
    </td>
  ) : (
    <td className={tdClassName}>{data}</td>
  );
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
