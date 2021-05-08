import { Toaster } from '@libs/toaster';
import { WatchClickOutside } from '@shared/modals/watchClickOutside';
import { useRouter } from 'next/router';
import React, { FC, Fragment, memo, useEffect, useState } from 'react';
import * as FeatherIcon from 'react-feather';
import { getData } from '@utils';
import { FilterIcons } from './filters';

const tdClassName =
  'px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-700';
const theaderClassName =
  'px-6 py-3 text-left text-sm leading-6 font-medium  uppercase tracking-wider';

type CheckLabelProps = {
  functions?: any;
  uniqueKey: string;
  limit: number;
  setall: any;
  row: any;
  selectedData: any[];
  setselectedData: (data: any[]) => void;
};
type LabelProps = { keyy: string | string[]; row: any; seperator?: string };
type SequenceNumberProps = { page?: number; limit?: number; index: number };
type DynamicComponentProps = {
  head: any;
  components: any;
  functions?: any;
  idx: number;
  index: number;
  row: any;
};
type CustomComponentProps = {
  data: any;
  index: number;
  keyy: string;
  sort: any;
};
type HeaderProps = {
  headers: any;
  lists?: any;
  setselectedData?: (data: any[]) => void;
  filterFunction?: any;
  handleCheckBox?: (data: any[]) => void;
  data?: any;
  thClassName?: string;
  all?: boolean;
  setall?: (value: boolean) => void;
};
export type paginationType = {
  totalPages: number;
  page: number;
  limit: number;
  totalRecords?: number;
  activeClass: object;
  numbersToshow?: number;
};
type Actionprops = {
  editProp?: any;
  viewProp?: any;
  deleteProp?: any;
  secured?: boolean;
  authMsg?: string;
  actionProp?: any[];
  onlyAction: boolean;
  Action: boolean;
};
const Label: FC<LabelProps> = (props) => {
  const { keyy, row, seperator } = props;
  let data = '';
  const dataarr = [];
  let multiple = false;
  if (Array.isArray(keyy)) {
    if (seperator === '/n') {
      multiple = true;
      for (const key of keyy) {
        data = getData(key, row);
        dataarr.push(data);
      }
    } else {
      for (const key of keyy) {
        data = data.concat(getData(key, row) + seperator);
      }
      data = data.slice(0, -2);
    }
  } else {
    data = getData(keyy, row);
  }
  return (
    <td className={tdClassName}>
      {multiple ? (
        <>
          {dataarr.map((it, i) => {
            return <p key={i}>{it}</p>;
          })}
        </>
      ) : (
        data
      )}
    </td>
  );
};
const SequenceNumber: FC<SequenceNumberProps> = ({ page, limit, index }) => {
  const pageNo = page && limit ? (page - 1) * limit + (index + 1) + '.' : index + 1;
  return <td className={tdClassName}>{pageNo}</td>;
};
const Loading: FC<any> = () => {
  return <td>Loading</td>;
};
const NoDataFound: FC<any> = () => {
  return (
    <div className="flex justify-center">
      <div>
        <FeatherIcon.AlertTriangle className="ml-10 mb-4 text-purplee-500" size="40" />
        <p className="text-grayy-800 font-semibold">No Data Found</p>
      </div>
      {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
    </div>
  );
};
const DynamicComponent: FC<DynamicComponentProps> = (props) => {
  const { head, components, functions, index, idx, row } = props;
  const Comp = components[head.component];
  const sort = head.sort ? head.sort : false;
  const CompProps = { data: row, index, keyy: head.key, sort, ...functions };
  return (
    <Fragment key={idx}>
      <Comp {...CompProps} />
    </Fragment>
  );
};

const Header: FC<HeaderProps> = (props) => {
  const { lists, filterFunction, setselectedData, handleCheckBox, data, all, setall } = props;
  const changed = (event: any) => {
    const value = !all;
    if (setall) {
      setall(value);
    }
    if (value) {
      if (setselectedData) {
        setselectedData([...data]);
      }
      if (handleCheckBox) {
        handleCheckBox([...data]);
      }
    } else {
      if (setselectedData) {
        setselectedData([]);
      }
      if (handleCheckBox) {
        handleCheckBox([]);
      }
    }
  };
  return props.headers.map(
    ({ value, key, type, list, upperCase = false, property, thClassName }: any, index: number) => {
      const FilterProps = { type, list: lists && lists[list], filterFunction, keyy: key, property };
      return (
        <th key={index} className={thClassName ? thClassName : theaderClassName}>
          {key === 'checkbox' ? (
            <>
              <div className="ml-1 flex items-center">
                <input
                  disabled={!data || data?.length < 1}
                  type="checkbox"
                  checked={all}
                  onChange={changed}
                  className="form-checkbox ml-6 h-5 w-5 rounded-md text-purplee-500 transition duration-150 ease-in-out bg-gray-200"
                />
              </div>
            </>
          ) : (
            <div className="flex items-center">
              {upperCase ? value.toUpperCase() : value}
              <FilterIcons {...FilterProps} />
            </div>
          )}
        </th>
      );
    }
  );
};

const ActionComponent: FC<Actionprops> = (props) => {
  const router = useRouter();
  // const { currentUser, update } = useContext(CurrentUserContext);
  const permissions: any[] = [];
  const [showDiv, setshowDiv] = useState(false);
  const anchorClassName =
    'cursor-pointer block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-purplee-200 hover:text-gray-900 focus:outline-none focus:bg-purplee-100 focus:text-gray-900';
  const authMessage = 'You are not authorized !!';
  const { className: editClass, enable: editEnabled = true } = props?.editProp || {};
  const { className: deleteClass, enable: deleteEnabled = true } = props?.deleteProp || {};
  const { className: viewClass, enable: viewEnabled = true } = props?.viewProp || {};

  const toggle = (event: any) => {
    event?.preventDefault();
    setshowDiv(!showDiv);
  };
  const editButton = (event: any) => {
    event.preventDefault();
    sharedFunction(props.editProp);
  };
  const viewButton = (event: any) => {
    event.preventDefault();
    sharedFunction(props.viewProp);
  };
  const deletButton = (event: any) => {
    event.preventDefault();
    sharedFunction(props.deleteProp);
  };
  const actionButton = (item: any) => {
    setshowDiv(false);
    sharedFunction(item);
  };
  const sharedFunction = (item: any) => {
    if (props.secured) {
      if (permissions.includes(item.permission)) {
        if ('url' in item) {
          item.as ? router.push(item.url, item.as) : router.push(item.url);
        } else {
          item?.functionName();
        }
      } else {
        Toaster.warning({
          message: props?.authMsg || authMessage
        });
      }
    } else {
      if ('url' in item) {
        item.as ? router.push(item.url, item.as) : router.push(item.url);
      } else {
        item?.functionName();
      }
    }
  };
  return (
    <div className="flex items-center">
      {!props.onlyAction && (
        <>
          {props?.viewProp && (
            <button
              onClick={viewEnabled ? viewButton : () => {}}
              className={
                viewClass ||
                'mr-2 text-gray-600 p-2 rounded-full hover:bg-purplee-200 focus:text-gray-800'
              }
            >
              <FeatherIcon.Eye size="23" strokeWidth="1.5px" />
            </button>
          )}
          {props?.editProp && (
            <button
              onClick={editEnabled ? editButton : () => {}}
              className={
                editClass ||
                'mr-2 text-gray-600 p-2 rounded-full hover:bg-purplee-200 focus:text-gray-800'
              }
            >
              <FeatherIcon.Edit size="22" strokeWidth="1.5px" />
            </button>
          )}
          {props?.deleteProp && (
            <button
              onClick={deleteEnabled ? deletButton : () => {}}
              className={
                deleteClass ||
                'mr-2 text-gray-600 p-2 rounded-full hover:bg-purplee-200 focus:text-gray-800'
              }
            >
              <FeatherIcon.Trash2 size="23" strokeWidth="1.5px" />
            </button>
          )}
        </>
      )}
      <WatchClickOutside onClickOutside={() => setshowDiv(false)}>
        {props.Action && (
          <button
            onClick={toggle}
            className="mr-3 mt-1 p-2 rounded-full hover:bg-purplee-200 -ml-2 text-gray-600 focus:text-gray-800"
          >
            <FeatherIcon.MoreVertical strokeWidth="1.5px" />
          </button>
        )}
        {showDiv && (
          <div className="origin-top-right z-10 absolute -ml-28 mt-1 rounded-md shadow-lg">
            <div className="rounded-md bg-white shadow-xs w-40 py-1">
              <div
                // className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {props?.actionProp?.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <a
                        onClick={() => actionButton(item)}
                        className={anchorClassName}
                        role="menuitem"
                      >
                        {item.name}
                      </a>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </WatchClickOutside>
    </div>
  );
};
const CheckBox: FC<CheckLabelProps> = (props) => {
  const [checked, setchecked] = useState(false);
  const { functions, row, uniqueKey, selectedData, limit, setselectedData, setall } = props;
  const { handleCheckBox } = functions;

  useEffect(() => {
    if (selectedData && selectedData.length === limit) {
      setchecked(true);
    }
    if (selectedData && selectedData.length === 0) {
      setchecked(false);
    }
  }, [selectedData]);

  const changed = (event: any) => {
    const value = !checked;
    setchecked(value);
    let list = [...selectedData];
    if (value) {
      list.push(row);
      console.log(list.length, limit);
      if (list.length === limit) {
        setall(true);
      }
    } else {
      if (list.length === limit) {
        setall(false);
      }
      list = list.filter((i) => i[uniqueKey] !== row[uniqueKey]);
    }
    setselectedData([...list]);
    if (handleCheckBox) {
      handleCheckBox(list);
    }
  };

  return (
    <td className={tdClassName}>
      <input
        type="checkbox"
        checked={checked}
        onChange={changed}
        className="form-checkbox ml-6 h-5 w-5 rounded-md text-purplee-500 transition duration-150 ease-in-out bg-gray-200"
      />
    </td>
  );
};
const WrappedCheckBox = memo(CheckBox);

const WrappedSequenceNumber = memo(SequenceNumber);
const WrappedHeader = memo(Header);
const WrappedLabel = memo(Label);
const WrappedLoading = memo(Loading);
const WrappedNoDataFound = memo(NoDataFound);
const WrappedDynamicComponent = memo(DynamicComponent);
const WrappedActionComponent = memo(ActionComponent);

export {
  tdClassName,
  WrappedCheckBox as CheckBox,
  WrappedSequenceNumber as SequenceNumber,
  WrappedHeader as Header,
  WrappedLabel as Label,
  WrappedLoading as Loading,
  WrappedNoDataFound as NoDataFound,
  WrappedDynamicComponent as DynamicComponent,
  WrappedActionComponent as ActionComponent
};
export type { CustomComponentProps };
