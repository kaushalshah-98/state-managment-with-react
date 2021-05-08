// import { DatePicker } from 'antd';
import dayjs from 'dayjs';
// import moment from 'moment';
import React, { FC, memo, useEffect, useState } from 'react';
import { ErrorLabel, Label } from '.';
import { isDate } from '@utils';
import { ShowLabel } from './showLabel';
import DatePicker from 'react-datepicker';
// import * as Feather from 'react-feather';

// const selectClassName =
//   'mt-2 form-input block w-full py-2 px-3 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-redd focus:border-purplee-400 focus:shadow-sm transition duration-150 ease-in-out sm:text-sm sm:leading-5';

export type DatePickerLabelProps = {
  label?: string;
  labelClass?: string;
  todayButton?: string;
  size?: any;
  control?: any;
  required?: boolean;
  errors?: any;
  disabled?: boolean;
  minDate?: Date | undefined;
  name?: string;
  upperCase?: boolean;
  camelCase?: boolean;
  errorClass?: string;
  displayOnly?: boolean;
  rules?: any;
  date?: any;
  defaultValue?: any;
  maxDate?: Date | undefined;
  setValue?: any;
  placeHolder?: string | undefined;
  range?: boolean;
  onChange?: (date: Date) => void;
  onOpenChange?: any;
  clearErrors?: (name: string) => void;
  inputClass?: string;
  register?: any;
  readOnly?: boolean;
  onBlur?: () => void;
  dateClass?: string;
};

const inputClassName =
  'mt-2 form-input block w-full py-1.5 px-3 border hover:border-purplee-600 focus:border-purplee-600 border-gray rounded-md shadow-sm focus:shadow-sm focus:outline-none focus:shadow-outline-redd focus:border-purplee-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5';

const DatePickerLabel: FC<DatePickerLabelProps> = (props) => {
  const {
    label,
    labelClass,
    required,
    name,
    camelCase,
    displayOnly,
    upperCase,
    placeHolder,
    disabled = false,
    onChange,
    date,
    defaultValue,
    errors
  } = props;
  const [changeValue, setchangeValue]: [any, any] = useState(date);
  // const [icon, seticon] = useState(true);
  // const [open, setopen] = useState(false);

  const handleChange = (data: any) => {
    if (onChange) {
      onChange(data);
    }
    // date ? seticon(false) : seticon(true);
    setchangeValue(dayjs(data).format('YYYY-MM-DD'));
    if (props.clearErrors && name) {
      props.clearErrors(name);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      if (isDate(defaultValue)) {
        setchangeValue(defaultValue);
      } else {
        setchangeValue(null);
      }
    }
  }, [defaultValue]);

  const ErrorLAbelProps = { errors, name };
  const LabelProps = { label, className: labelClass, camelCase, upperCase, required };
  return (
    <>
      {label && <Label {...LabelProps} />}
      {displayOnly ? (
        <ShowLabel defaultValue={defaultValue ? dayjs(defaultValue)?.format('MMM D, YYYY') : '-'} />
      ) : (
        <>
          <DatePicker
            dateFormat="dd-MM-yyyy"
            closeOnScroll={true}
            isClearable={!disabled}
            popperPlacement="bottom-end"
            popperClassName="datePicker"
            value={changeValue}
            placeholderText={placeHolder}
            todayButton={false}
            showMonthDropdown={true}
            disabled={disabled}
            onCalendarOpen={() => {
              // setopen(true);
            }}
            onCalendarClose={() => {
              // setopen(false);
            }}
            showYearDropdown={true}
            dropdownMode="select"
            showDisabledMonthNavigation={true}
            portalId="root-portal"
            selected={defaultValue}
            onChange={(data: any) => {
              handleChange(data);
            }}
            className={inputClassName}
          />
          {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              <p
                className={
                  icon && !defaultValue ? 'text-grayy-500 mt-1 mr-3' : 'text-grayy-500 mt-1 mr-5'
                }
              >
                |
              </p>
              {icon && !defaultValue && (
                <Feather.Calendar
                  size="16"
                  className={
                    open
                      ? 'text-grayy-800 mt-2 cursor-default hover-text-grayy-600'
                      : 'text-grayy-500 mt-2 cursor-default hover-text-grayy-600'
                  }
                />
              )}
            </div> */}
          <ErrorLabel {...ErrorLAbelProps} />
        </>
      )}
    </>
  );
};
const WrappedDatePickerLabel = memo(DatePickerLabel);
export { WrappedDatePickerLabel as DatePickerLabel };
