import { InputLabel, ReactDatePicker } from '@shared/forms';
import { WatchClickOutside } from '@shared/modals/watchClickOutside';
import React, { FC, memo, useEffect, useState } from 'react';
import * as FeatherIcon from 'react-feather';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

// type SortProps = { property: string; filterFunction: any };
const inactiveIconClassName = 'relative left-2  text-black-400 cursor-pointer hover:text-black-500';
const activeIconClassName = 'relative left-2  text-blue-600 cursor-pointer hover:text-blue-700';
const BtnClass =
  'text-gray-400 rounded-full p-1 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150';

const cachedList = {};
let open = false;
let dateObj = { to: null, from: null };

const Temp = styled.div`
  overflow-y: auto;
  /* padding-right: 10px; */
  max-height: 17vh;
  scrollbar-width: thin !important;
  ::-webkit-scrollbar {
    width: 5px;
    /* margin-left: 3px; */
    background-color: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(172, 172, 172);
    border-radius: 20px;
  }
  ::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
  }
`;

export const FilterTypes = {
  search: 'search',
  checkbox: 'checkbox',
  date: 'date',
  select: 'select',
  sort: 'sort'
};
type FilterIconProps = {
  type: string;
  list: any[];
  property: string;
  filterFunction: (data: any) => void;
};
export const FilterIcons: FC<FilterIconProps> = memo((props) => {
  const { type, list, property, filterFunction } = props;
  const { register, handleSubmit } = useForm();
  const FilterProps = { list, type, property, filterFunction, register, handleSubmit };
  if (type === FilterTypes.sort) {
    return <Sort {...FilterProps} />;
  } else if (type === FilterTypes.search) {
    return <Search {...FilterProps} />;
  } else if (type === FilterTypes.checkbox) {
    return <CheckBox {...FilterProps} />;
  } else if (type === FilterTypes.date) {
    return <DateSearch {...FilterProps} />;
  }
  return <></>;
});

type Props = {
  type: string;
  list: any[];
  property: string;
  filterFunction: (data: any) => void;
  register: any;
  handleSubmit: any;
};
const Sort: FC<Props> = (props) => {
  const [sort, setSort] = useState(false);
  const [iconClass, seticonClass] = useState(inactiveIconClassName);
  const { filterFunction, type, property } = props;
  const filter = (key: string) => {
    seticonClass(activeIconClassName);
    setSort(!sort);
    if (filterFunction) {
      filterFunction({ type, headerName: property, value: sort });
    }
  };

  return sort ? (
    <FeatherIcon.ArrowDown onClick={() => filter(property)} className={iconClass} size="18" />
  ) : (
    <FeatherIcon.ArrowUp onClick={() => filter(property)} className={iconClass} size="18" />
  );
};
const Search: FC<Props> = (props) => {
  const [state, setstate] = useState(false);
  const [searchString, setsearchString] = useState('');
  const [iconClass, seticonClass] = useState(inactiveIconClassName);
  const { property, type, filterFunction, register, handleSubmit } = props;

  const onSearch = (data: { searchString: string }) => {
    if (data.searchString) {
      setsearchString(data.searchString);
      setstate(false);
      seticonClass(activeIconClassName);
      if (filterFunction) {
        filterFunction({ type, headerName: property, value: data.searchString });
      }
    }
  };

  const clearInput = () => {
    if (filterFunction) {
      filterFunction({ type, headerName: property, value: null });
    }
    setsearchString('');
    setstate(false);
    seticonClass(inactiveIconClassName);
  };

  return (
    <>
      <WatchClickOutside onClickOutside={() => setstate(false)}>
        <FeatherIcon.Search onClick={() => setstate((e) => !e)} className={iconClass} size="18" />
        {state && (
          <>
            <div className=" absolute mt-3 rounded-lg shadow-lg">
              <div className="rounded-lg bg-white shadow-lg border border-solid border-input-border">
                <div
                  // className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div
                    className="cursor-pointer px-3 py-2 text-sm leading-5 text-grayy-400 my-2"
                    role="menuitem"
                  >
                    <div className=" flex space-x-1 -mt-3 justify-end mr-1">
                      <button onClick={clearInput} type="button" className={BtnClass}>
                        <FeatherIcon.X size="20" />
                      </button>
                      <button onClick={handleSubmit(onSearch)} type="button" className={BtnClass}>
                        <FeatherIcon.Check size="20" />
                      </button>
                    </div>
                    <InputLabel
                      defaultValue={searchString}
                      register={register}
                      placeHolder="Search.."
                      inputClass="mt-1 form-input block w-44 py-1 px-2 focus:shadow-sm font-ubuntu border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      name="searchString"
                    />
                    {/* <div className="flex justify-between mt-2">
                      <button
                        onClick={handleSubmit(onSearch)}
                        className=" flex mr-2 w-16 justify-center  mt-1 bg-blue-500 px-auto py-1 rounded text-center text-gray-100 "
                      >
                        Search
                      </button>
                      <button
                        onClick={clearInput}
                        className=" flex w-16 justify-center  mt-1 bg-gray-500 px-auto py-1 rounded text-center text-gray-100 "
                      >
                        Clear
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </WatchClickOutside>
    </>
  );
};
const CheckBox: FC<Props> = (props) => {
  const [state, setstate] = useState(false);
  const [optionList, setoptionList]: [any[], any] = useState([]);
  const { list, property, filterFunction, type } = props;
  const [iconClass, seticonClass] = useState(inactiveIconClassName);
  const [selectedVal, setSelectedVal]: [any[], any] = useState([]);
  const [filterString, setfilterString] = useState('');

  useEffect(() => {
    if (list && list.length > 0) {
      setoptionList([...list]);
      cachedList[property] = [...list];
    }
  }, [list]);

  const handleCheckBox = (value: string) => {
    let values = [...selectedVal];
    if (selectedVal.includes(value)) {
      values = values.filter((i) => i !== value);
    } else {
      values.push(value);
    }
    setSelectedVal([...values]);
  };
  const OnInputChange = (event: any) => {
    const value = event?.target?.value;
    if (value) {
      setfilterString(value);
      let newList = [...(cachedList[property] || [])];
      newList = newList?.filter((i) => i.name.toLowerCase().includes(value.toLowerCase()));
      setoptionList([...newList]);
    } else {
      setfilterString('');
      setoptionList([...(cachedList[property] || [])]);
    }
  };
  const apply = () => {
    if (selectedVal.length > 0) {
      if (filterFunction) {
        filterFunction({ type, headerName: property, value: selectedVal });
      }
      seticonClass(activeIconClassName);
      setstate(false);
    }
  };
  const remove = () => {
    setfilterString('');
    if (filterFunction) {
      filterFunction({ type, headerName: property, value: [] });
    }
    setSelectedVal([]);
    seticonClass(inactiveIconClassName);
    setstate(false);
  };

  return (
    <>
      <WatchClickOutside onClickOutside={() => setstate(false)}>
        <FeatherIcon.Filter onClick={() => setstate((e) => !e)} className={iconClass} size="18" />
        {state && (
          <>
            <div className="origin-top-right z-10 absolute mt-3 rounded-lg shadow-lg">
              <div className="rounded-lg bg-white py-2 shadow-lg border border-solid border-input-border">
                <div className="mx-3 ">
                  <InputLabel
                    defaultValue={filterString}
                    placeHolder="Search.."
                    onKeyUp={OnInputChange}
                    inputClass="mt-1 form-input block py-1 focus:shadow-sm font-ubuntu border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    name="searchString"
                  />
                  <div className=" flex space-x-1 justify-end ">
                    <button onClick={() => remove()} type="button" className={BtnClass}>
                      <FeatherIcon.X size="16" />
                    </button>
                    <button onClick={() => apply()} type="button" className={BtnClass}>
                      <FeatherIcon.Check size="16" />
                    </button>
                  </div>
                </div>
                {!optionList || optionList.length <= 0 ? (
                  <div className="p-5">
                    {/* <FeatherIcon.Meh size="16" /> */}
                    <div className="flex justify-center">No Results found</div>
                  </div>
                ) : (
                  <Temp>
                    <div className="">
                      {optionList?.map((menu, index) => (
                        <div
                          key={index}
                          onClick={() => handleCheckBox(menu.value)}
                          className=" flex items-center hover:bg-gray-100"
                        >
                          <div className="flex items-center px-3 ">
                            <input
                              id={menu.value}
                              type="checkbox"
                              onChange={() => handleCheckBox(menu.value)}
                              value={menu.value}
                              checked={selectedVal.includes(menu.value)}
                              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            />
                            <label
                              htmlFor="isAgreedToTC"
                              className="ml-2 text-sm font-hairline normal-case py-1 text-gray-600"
                            >
                              {menu.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Temp>
                )}
              </div>
            </div>
          </>
        )}
      </WatchClickOutside>
    </>
  );
};
const DateSearch: FC<Props> = (props) => {
  const [iconClass, seticonClass] = useState(inactiveIconClassName);
  const { property, filterFunction, type } = props;
  const [state, setstate] = useState(false);
  const [dateselected, setdateselected]: [{ to: any; from: any }, any] = useState(dateObj);
  const { control, setValue } = useForm();
  const apply = () => {
    if (dateselected.to && dateselected.from) {
      if (filterFunction) {
        filterFunction({ type, headerName: property, value: dateselected });
      }
      setdateselected({ to: dateselected.to, from: dateselected.from });
      seticonClass(activeIconClassName);
      dateObj = { ...dateselected };
      setstate(false);
    }
  };
  const remove = () => {
    if (filterFunction) {
      filterFunction({ type, headerName: property, value: { to: null, from: null } });
    }
    setdateselected({ to: null, from: null });
    dateObj = { to: null, from: null };
    seticonClass(inactiveIconClassName);
    setstate(false);
  };
  return (
    <>
      <WatchClickOutside onClickOutside={() => (open ? {} : setstate(false))}>
        <FeatherIcon.Calendar onClick={() => setstate((e) => !e)} className={iconClass} size="18" />
        {state && (
          <>
            <div className="origin-top-right z-10 absolute mt-3 rounded-lg shadow-lg">
              <div className="rounded-lg bg-white py-2 shadow-lg border border-solid border-input-border">
                <div className=" flex space-x-1 -mt-1 justify-end mr-4">
                  <button onClick={() => remove()} type="button" className={BtnClass}>
                    <FeatherIcon.X size="20" />
                  </button>
                  <button onClick={() => apply()} type="button" className={BtnClass}>
                    <FeatherIcon.Check size="20" />
                  </button>
                </div>
                <div className="pt-1 pl-1 pr-3 pb-2">
                  <div className="flex items-center">
                    <ReactDatePicker
                      label="From"
                      setValue={setValue}
                      control={control}
                      labelClass="block mr-2 text-sm leading-5 font-normal text-gray-700"
                      defaultValue={dateselected.from}
                      onOpen={console.log}
                      onClose={() => (open = false)}
                      maxDate={dateselected.to}
                      onChange={(data) => setdateselected({ ...dateselected, from: data })}
                      placeHolder="mm-dd-yy"
                    />
                  </div>
                  <div className="flex mt-4 items-center">
                    <ReactDatePicker
                      label="To"
                      control={control}
                      setValue={setValue}
                      onOpen={console.log}
                      onClose={() => (open = false)}
                      labelClass="block mr-7 text-sm leading-5 font-normal text-gray-700"
                      defaultValue={dateselected.to}
                      minDate={dateselected.from}
                      onChange={(data) => setdateselected({ ...dateselected, to: data })}
                      placeHolder="mm-dd-yy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </WatchClickOutside>
    </>
  );
};
