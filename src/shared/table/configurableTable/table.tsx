import { IHeaders } from '@config/interfaces';
import { Toaster } from '@libs/toaster';
import { FC, memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { allcomponents, getHeader } from './helper';
import TableView from './table.html';

type TableProps = {
  displayOnly: boolean;
  onChange?: any;
  value?: any;
  row: object;
  // type: string;
  tableHeaders: IHeaders[];
};
export const Table: FC<TableProps> = (props) => {
  const [newData, setnewData] = useState(props?.value);
  const { errors, register, handleSubmit, clearErrors } = useForm({ mode: 'onBlur' });
  const [rowNum, setrowNum] = useState(0);
  const { value, displayOnly, row, tableHeaders, onChange } = props;
  const headers = getHeader(displayOnly, tableHeaders);

  let temp: any[];
  let stringifyTemp: any[];

  const update = (data: any[]) => {
    stringifyTemp = data.filter((item) => item.name !== '');
    // stringifyTemp = stringifyTemp.map((item) => JSON.stringify(item));
    const newDataa = stringifyTemp?.map(({ edit, ...keepAttrs }) => keepAttrs);
    setnewData([...data]);
    onChange(newDataa);
  };
  const submit = (data: any) => {
    clearErrors();
    temp = [...newData];
    temp[rowNum] = data;
    temp[rowNum].edit = false;
    temp[temp.length - 1].edit = true;
    update(temp);
  };
  const deleteRow = (rowNumber: number) => {
    temp = [...newData];
    if (!(rowNumber === newData.length - 1)) {
      clearErrors();
      setrowNum(rowNumber);
      temp = temp.filter((item, index) => index !== rowNumber);
      update(temp);
    }
  };
  const editRow = (rowNumber: number) => {
    clearErrors();
    setrowNum(rowNumber);
    temp = [...newData];
    temp.forEach((item) => (item.edit = false));
    temp.forEach((item, index) => (index === rowNumber ? (item.edit = true) : ''));
    setnewData([...temp]);
  };
  const addRow = () => {
    clearErrors();
    let count = 0;
    temp = [...newData];
    temp.forEach((item, index) => {
      if (item.edit === true) {
        Toaster.info({ message: `row number ${index + 1} is unsaved` });
        count += 1;
      }
    });
    if (count === 0) {
      temp.push(row);
    }
    setnewData([...temp]);
  };
  const corectRow = (rowNumber: number) => {
    clearErrors();
    setrowNum(rowNumber);
  };
  useEffect(() => {
    temp = [...(value || [])];
    if (!displayOnly) {
      temp.forEach((item) => (item.edit = false));
      temp.push(row);
      setrowNum(temp.length - 1);
    }
    setnewData([...(temp || [])]);
  }, [value]);

  const TableViewProps = {
    newData,
    components: allcomponents,
    row,
    displayOnly,
    headers,
    errors,
    register,
    submit,
    deleteRow,
    handleSubmit,
    editRow,
    addRow,
    corectRow
  };
  return <TableView {...TableViewProps} />;
};
type ReactTableProps = {
  data: any;
  control: any;
  displayOnly: boolean;
  setValue: any;
  onChange?: (change: any) => void;
  row: object;
  tableHeaders: IHeaders[];
  name: string;
};
const ReactTable: FC<ReactTableProps> = (props) => {
  const [state, setstate] = useState(true);
  const { control, setValue, data, name, onChange } = props;
  const handleChange = (value: any) => {
    setValue(name, value, { shouldDirty: true });
    if (onChange) {
      onChange(value);
    } // props.clearErrors(name);
  };

  useEffect(() => {
    if (data && data.length > 0 && state) {
      setstate(false);
      setValue(name, data);
    }
  }, [data]);

  return (
    <>
      <Controller
        name={name}
        defaultValue={data}
        control={control}
        render={({ onChange: on, value }) => (
          <Table
            {...props}
            value={value}
            onChange={(val: any) => {
              on(val);
              handleChange(val);
            }}
          />
        )}
      />
    </>
  );
};
export default memo(ReactTable);
