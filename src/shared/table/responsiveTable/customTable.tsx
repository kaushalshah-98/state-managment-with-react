import { IHeaders } from '@config/interfaces';
import { Pagination } from '@shared/pagination';
import React, { memo } from 'react';
import styled from 'styled-components';
import Loading from '../../spinner/hashLoader';
import {
  DynamicComponent,
  Header,
  Label,
  paginationType,
  NoDataFound,
  SequenceNumber
} from './customTableHelper';

const StyledTable = styled.div`
  table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    background-color: #f4f5f7;
    border-radius: 45px;
    padding: 0;
    width: 100%;
    table-layout: fixed;
  }

  table caption {
    font-size: 1em;
    margin: 0.5em 0 0.75em;
  }

  table tr {
    border-radius: 10px;
    /* background-color: #f4f5f7; */
    border: 1px solid #ddd;
    padding: 0.35em;
  }

  table th,
  table td {
    padding: 0;
    padding-left: 4px;
    /* text-align: center; */
  }

  table th {
    font-size: 0.75em;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  @media screen and (max-width: 600px) {
    table {
      border: 0;
    }

    table caption {
      font-size: 0.6em;
    }

    table thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    table tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: 0.425em;
      background-color: #f4f5f7;
    }

    table td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: 0.7em;
      text-align: right;
    }

    table td::before {
      /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
      content: attr(data-label);
      float: left;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
    }

    table td:last-child {
      border-bottom: 0;
    }
  }
`;
type IDataTableProps = {
  headers: IHeaders[];
  data?: any[];
  footer?: any;
  components?: any;
  isLoading?: boolean;
  loading?: boolean;
  wrapperClass?: string;
  lists?: any;
  pagination?: paginationType;
  functions?: any;
  status?: any;
  rowClass?: string;
  showNoDataIcon?: boolean;
  columnName?: any;
  hoverEnable?: boolean;
  tableType?: any;
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
    rowClass,
    components,
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
  const { changePage, filterFunction } = functions || {};
  const PagiProps = {
    totalPages,
    totalRecords,
    numbersToshow,
    limit,
    activeClass,
    changePage,
    page
  };
  return (
    <div className={rowClass || 'flex flex-col m-10 rounded-lg'}>
      <div className=" -my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          className={
            wrapperClass ||
            ' align-middle inline-block min-w-full shadow-lg overflow-hidden sm:rounded-lg border-b border-gray-200'
          }
        >
          {props.children && props.children}
          <StyledTable>
            <table className="min-w-full bg-white">
              <thead className="bg-blue-100">
                <tr>
                  <Header headers={headers} lists={lists} filterFunction={filterFunction} />
                </tr>
              </thead>
              {loading || isLoading || !data ? (
                <tbody>
                  <tr>
                    <td className="py-0" colSpan={headers?.length}>
                      <Loading />
                    </td>
                  </tr>
                </tbody>
              ) : (totalRecords === 0 || data.length <= 0) &&
                showNoDataIcon &&
                !(loading || isLoading) ? (
                <tbody>
                  <tr>
                    <td className="py-0" colSpan={headers?.length}>
                      <NoDataFound />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="bg-white">
                  {data.map((row, index) => {
                    return (
                      <tr className={hoverEnable ? 'hover:bg-gray-100' : ''} key={index}>
                        {headers.map((head, idx) => {
                          if (head.key === 'number') {
                            const SequenceNumberProps = { label: head.value, page, limit, index };
                            return <SequenceNumber key={idx} {...SequenceNumberProps} />;
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
                            const LabelProps = {
                              keyy: head.key,
                              label: head.value,
                              row,
                              seperator: head.seperator
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
          </StyledTable>
          {pagination && <Pagination {...PagiProps} />}
        </div>
      </div>
    </div>
  );
};

export default memo(CustomTable);
