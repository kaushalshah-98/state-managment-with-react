import Loading from '@shared/spinner/hashLoader';
import { FC, memo } from 'react';
import { Header, NoDataFound, SequenceNumber } from '../customTable/customTableHelper';
import { DynamicComponent, Label } from './helper';

type TableProps = {
  errors: any;
  register: any;
  displayOnly: boolean;
  newData: any[];
  setValue: any;
  headers: any[];
  loading?: boolean;
  handleSubmit: any;
  control: any;
  components: any;
  submit: (data: any) => void;
  deleteRow: (idx: number) => void;
  editRow: (idx: number) => void;
  addRow: () => void;
  corectRow: (idx: number) => void;
};
const Table: FC<TableProps> = (props) => {
  const {
    errors,
    register,
    displayOnly,
    setValue,
    control,
    loading,
    newData,
    headers,
    handleSubmit,
    components,
    submit,
    deleteRow,
    editRow,
    // addRow,
    corectRow
  } = props;

  return (
    <>
      {/* {displayOnly || (
        <span className="mt-3 rounded-md shadow-sm sm:mt-0 ">
          <Button
            name={'Add Row'}
            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 sm:text-sm sm:leading-5"
            functionName={addRow}
          />
        </span>
      )} */}
      <table className="min-w-full">
        <thead className="bg-blue-100">
          <tr>
            <Header headers={headers} />
          </tr>
        </thead>
        {!newData || loading ? (
          <tbody>
            <tr>
              <td className="py-20" colSpan={headers?.length}>
                <Loading />
              </td>
            </tr>
          </tbody>
        ) : newData.length <= 0 ? (
          <tbody>
            <tr>
              <td className="py-20" colSpan={headers?.length}>
                <NoDataFound />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="bg-white">
            {newData.map((row, index) => {
              return (
                <tr key={index}>
                  {headers.map((head, idx) => {
                    if (head.key === 'number') {
                      const SequenceNumberProps = { index };
                      return <SequenceNumber key={idx} {...SequenceNumberProps} />;
                    } else if (head.component) {
                      const dynamicComponentProps = {
                        idx,
                        components,
                        index,
                        head,
                        row,
                        functions: {
                          deleteRow,
                          editRow,
                          corectRow,
                          submit: handleSubmit(submit)
                        }
                      };
                      return <DynamicComponent key={idx} {...dynamicComponentProps} />;
                    } else {
                      const LabelProps = {
                        keyy: head?.key,
                        values: head?.values,
                        validation: head.validation,
                        type: head?.type,
                        row,
                        inputType: head?.inputType,
                        setValue,
                        displayOnly,
                        control,
                        index,
                        errors,
                        register
                      };
                      return <Label key={idx} {...LabelProps} />;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </>
  );
};

export default memo(Table);
