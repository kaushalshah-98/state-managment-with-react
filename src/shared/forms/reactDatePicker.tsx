import { FC, memo, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import { ErrorLabel } from './errorLabel';
import dayjs from 'dayjs';
import { ShowLabel } from './showLabel';
import { isDate } from '@utils';
import * as Feather from 'react-feather';

export type DatePickerLabelProps = {
  label?: string;
  labelClass?: string;
  todayButton?: string;
  control: any;
  required?: boolean;
  errors?: any;
  disabled?: boolean;
  minDate?: Date | undefined;
  name?: string | undefined;
  upperCase?: boolean;
  onClose?: (value: boolean) => void;
  onOpen?: (value: boolean) => void;
  displayOnly?: boolean;
  rules?: any;
  defaultValue?: any;
  maxDate?: Date | undefined;
  setValue?: any;
  placeHolder?: string | undefined;
  range?: boolean;
  onChange?: (data: any) => void;
  inputClass?: string;
};

const labelClassName = 'block text-sm font-medium leading-5 text-gray-500';
const selectClassName =
  'mt-2 cursor-default focus:border-purplee-400 hover:border-purplee-400 block flex items-center shadow-sm transition duration-150 ease-in-out appearance-none w-full border border-gray-300 bg-white text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white';

const ReactDatePicker: FC<DatePickerLabelProps> = (props) => {
  const {
    label,
    control,
    labelClass,
    required,
    name,
    minDate,
    displayOnly,
    todayButton,
    upperCase,
    placeHolder,
    onClose,
    disabled = false,
    onChange,
    range,
    onOpen,
    setValue,
    maxDate,
    inputClass,
    defaultValue,
    errors,
    rules
  } = props;
  const [dates] = useState([]);
  const [icon, seticon] = useState(true);
  const [state, setstate] = useState(true);
  const [open, setopen] = useState(false);

  const handleChange = (date: any) => {
    if (onChange) {
      onChange(date);
    }
    date ? seticon(false) : seticon(true);
    if (range) {
      setValue(date[0], { shouldDirty: true });
    } else {
      setValue(name, date, { shouldDirty: true });
    }
  };
  // const onRemove = (event: any) => {
  //   console.log('removed');
  //   event?.preventDefault();
  //   seticon(false);
  //   setValue(name, null, { shouldDirty: true });
  // };
  useEffect(() => {
    if (defaultValue && state) {
      setstate(false);
      if (isDate(defaultValue)) {
        setValue(name, new Date(defaultValue));
      } else {
        setValue(name, null);
      }
    }
  }, [defaultValue]);

  const ErrorLAbelProps = { errors, name };
  return (
    <>
      {label && (
        <label className="ml-3">
          <span className={labelClass ? labelClass : labelClassName}>
            {upperCase ? label && label.toUpperCase() : label}
            {required && '*'}
          </span>
        </label>
      )}
      <div className="relative border-none -mt-2">
        {displayOnly ? (
          <ShowLabel
            defaultValue={defaultValue ? dayjs(defaultValue).format('MMM D, YYYY') : '-'}
          />
        ) : (
          <>
            <Controller
              control={control}
              name={name || ''}
              rules={rules}
              defaultValue={isDate(defaultValue) ? new Date(defaultValue) : null}
              render={({ onChange: on, value }) => (
                // <DatePickerStyled>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  closeOnScroll={true}
                  isClearable={!disabled}
                  popperPlacement="bottom-end"
                  popperClassName="datePicker"
                  placeholderText={placeHolder}
                  todayButton={todayButton}
                  maxDate={maxDate}
                  showMonthDropdown={true}
                  disabled={disabled}
                  onCalendarOpen={() => {
                    if (onOpen) {
                      onOpen(true);
                    }
                    setopen(true);
                  }}
                  onCalendarClose={() => {
                    if (onClose) {
                      onClose(false);
                    }
                    setopen(false);
                  }}
                  showYearDropdown={true}
                  dropdownMode="select"
                  minDate={minDate}
                  showDisabledMonthNavigation={true}
                  portalId="root-portal"
                  // popperModifiers={{
                  //   offset: {
                  //     enabled: true,
                  //     offset: '26px, 10px'
                  //   },
                  //   preventOverflow: {
                  //     enabled: true,
                  //     escapeWithReference: false,
                  //     boundariesElement: 'viewport'
                  //   }
                  // }}
                  selected={value}
                  startDate={dates[0]}
                  selectsRange={range}
                  endDate={dates[1]}
                  onChange={(data: any) => {
                    if (range) {
                      on(data[0]);
                    } else {
                      on(data);
                    }
                    handleChange(data);
                  }}
                  className={inputClass || selectClassName}
                />
                // </DatePickerStyled>
              )}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              <p
                className={
                  icon && !defaultValue ? 'text-grayy-500 mt-1 mr-3' : 'text-grayy-500 mt-1 mr-8'
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
            </div>
            <ErrorLabel {...ErrorLAbelProps} />
          </>
        )}
      </div>
    </>
  );
};
const WrappedDatePickerLabel = memo(ReactDatePicker);
export { WrappedDatePickerLabel as ReactDatePicker };
