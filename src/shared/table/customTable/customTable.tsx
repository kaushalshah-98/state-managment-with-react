import { IHeaders } from '@config/interfaces';
import { Pagination } from '@shared/pagination';
import React, { memo, useState } from 'react';
import Loading from '../../spinner/hashLoader';
import {
  DynamicComponent,
  Header,
  CheckBox,
  paginationType,
  Label,
  NoDataFound,
  SequenceNumber
} from './customTableHelper';

export type IDataTableProps = {
  headers: IHeaders[];
  data?: any[];
  footer?: any;
  components?: any;
  isLoading?: boolean;
  thClass?: string;
  loading?: boolean;
  wrapperClass?: string;
  lists?: any;
  pagination?: paginationType;
  functions?: any;
  status?: any;
  showNoDataIcon?: boolean;
  uniqueKey?: string;
  columnName?: any;
  hoverEnable?: boolean;
  tableType?: any;
  mainWrapperClass?: string;
  radioButtons?: any;
  searchString?: any;
  customerMobile?: any;
  customerName?: any;
  setValues?: any;
};

const CustomTable: React.FC<IDataTableProps> = (props) => {
  const {
    data,
    headers,
    uniqueKey,
    thClass,
    components,
    // mainWrapperClass,
    lists,
    pagination,
    loading,
    hoverEnable = true,
    functions,
    isLoading,
    wrapperClass,
    showNoDataIcon = true
  } = props;
  const { activeClass, limit, page, totalRecords, totalPages, numbersToshow } = pagination || {};
  const { changePage, filterFunction, handleCheckBox } = functions || {};
  const [selectedData, setselectedData]: [any, any] = useState([]);
  const [all, setall] = useState(false);

  const PagiProps = {
    totalPages,
    totalRecords,
    numbersToshow,
    limit,
    activeClass,
    changePage,
    page
  };
  const HeaderProps = {
    headers,
    handleCheckBox,
    setselectedData,
    data,
    lists,
    filterFunction,
    all,
    setall
  };
  return (
    <div
      className={
        wrapperClass ||
        'align-middle inline-block min-w-full overflow-hidden border-b border-gray-200'
      }
    >
      {props.children && props.children}
      <table className="min-w-full bg-white">
        <thead className={thClass || 'bg-purplee-100 text-black-400'}>
          <tr>
            <Header {...HeaderProps} />
          </tr>
        </thead>
        {loading || isLoading || !data ? (
          <tbody>
            <tr>
              <td className="py-40" colSpan={headers?.length}>
                <Loading />
              </td>
            </tr>
          </tbody>
        ) : (totalRecords === 0 || data.length <= 0) &&
          showNoDataIcon &&
          !(loading || isLoading) ? (
          <tbody>
            <tr>
              <td className="py-36" colSpan={headers?.length}>
                <NoDataFound />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="bg-white">
            {data.map((row, index) => {
              return (
                <tr className={hoverEnable ? 'hover:bg-gray-50' : ''} key={index}>
                  {headers.map((head, idx: number) => {
                    if (head.key === 'number' && limit) {
                      const SequenceNumberProps = { page, limit, index };
                      return <SequenceNumber key={idx} {...SequenceNumberProps} />;
                    } else if (head.key === 'checkbox' && uniqueKey && limit) {
                      const CheckBoxProps = {
                        functions,
                        row,
                        setall,
                        limit,
                        selectedData,
                        uniqueKey,
                        setselectedData
                      };
                      return <CheckBox key={idx} {...CheckBoxProps} />;
                    } else if (head.component) {
                      const dynamicComponentProps = {
                        idx,
                        components,
                        head,
                        index,
                        row,
                        functions
                      };
                      return <DynamicComponent key={idx} {...dynamicComponentProps} />;
                    } else {
                      const LabelProps = { keyy: head.key, row, seperator: head.seperator };
                      return <Label key={idx} {...LabelProps} />;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {/* {() => {
        if (pagination && limit && totalPages) {
          return (
            <>
              <Pagination {...PagiProps} />
            </>
          );
        }
        return null;
      }} */}
      {pagination && <Pagination {...PagiProps} />}
    </div>
  );
};

export default memo(CustomTable);
