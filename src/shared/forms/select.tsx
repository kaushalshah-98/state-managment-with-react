// eslint-disable-line react-hooks/exhaustive-deps
import { FC, memo, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { ErrorLabel } from './errorLabel';
import { Label } from './label';
import { ShowLabel } from './showLabel';

export type option = {
  value: any;
  label: string;
};
export type SelectLabelProps = {
  name: any;
  closeMenuOnSelect?: boolean;
  showArrow?: boolean;
  allowClear?: boolean;
  options: option[] | undefined;
  defaultValue?: any;
  value?: any;
  label?: string;
  isLoading?: boolean;
  children?: any;
  control: any;
  setValue: any;
  disabled?: boolean;
  onChange?: any;
  mode?: 'default' | 'multiple';
  tagClass?: any;
  register?: any;
  size?: 'default' | 'small' | 'large';
  selectClass?: string;
  startOptionLabel?: string;
  placeHolder?: string;
  showSearch?: boolean;
  rules?: any;
  displayOnly?: boolean;
  optionClass?: string;
  labelClass?: string;
  errors?: any;
  upperCase?: boolean;
  required?: boolean;
  camelCase?: boolean;
};

// const optionClassName = '';
// const selectClassName =
//   'mt-2  rounded-md shadow-sm w-full bg-white text-gray-700 sm:text-sm sm:leading-5';

const SelectLabel: FC<SelectLabelProps> = (props) => {
  const defaultSelectedValues: any[] = [];
  const {
    mode,
    value,
    // optionClass,
    isLoading,
    camelCase,
    closeMenuOnSelect,
    displayOnly,
    disabled,
    showSearch = true
  } = props;

  const { options, placeHolder, onChange, size, allowClear = true } = props;
  const { labelClass, label, upperCase, required, tagClass, showArrow = true } = props;
  let selectedValue: any;

  if (displayOnly && options) {
    if (mode === 'multiple') {
      options.forEach((item) =>
        value?.includes(item.value) ? defaultSelectedValues.push(item.label) : ''
      );
    } else {
      options.forEach((item) => (item.value === value ? (selectedValue = item.label) : ''));
    }
  }
  const LabelProps = { label, className: labelClass, camelCase, upperCase, required };

  const selectValue = (
    <>
      <Select
        isSearchable={showSearch}
        isClearable={allowClear}
        // id={new Date()?.toString()}
        instanceId={'hiii'}
        options={options}
        closeMenuOnSelect={closeMenuOnSelect}
        isLoading={isLoading}
        styles={colourStyles}
        placeholder={placeHolder}
        isMulti={mode === 'multiple' ? true : false}
        showArrow={showArrow}
        value={
          mode === 'multiple'
            ? options?.filter((i) => value?.includes(i?.value))
            : options?.filter((i) => i.value === value)
        }
        size={size || 'large'}
        onChange={onChange}
        className="focus:border border-purplee-600"
        disabled={disabled}
        // className={selectClass ? selectClass : selectClassName}
      />
    </>
  );
  return (
    <>
      {label && <Label {...LabelProps} />}
      {displayOnly ? (
        mode === 'multiple' ? (
          <div className="mt-3">
            {defaultSelectedValues?.map((item, index) => {
              return (
                <div key={index} className={tagClass || 'py-1 text-sm bg-gray-100 px-3'}>
                  <p>{item}</p>
                </div>
                //   <Tag className={tagClass || 'py-1 text-sm bg-gray-100 px-3'} key={index}>
                //   { item }
                //  </Tag>
              );
            })}
          </div>
        ) : (
          <ShowLabel defaultValue={selectedValue} />
        )
      ) : (
        selectValue
      )}
    </>
  );
};

const AntdSelect: FC<SelectLabelProps> = (props) => {
  const [state, setstate] = useState(true);
  const { control, options, defaultValue, errors, setValue, name, mode, onChange, rules } = props;
  const ErrorLabelProps = { errors, name };

  const handleChange = (data: any) => {
    if (mode === 'multiple') {
      setValue(name, data, { shouldDirty: true });
      if (onChange) {
        onChange(data);
      }
    } else {
      setValue(name, data?.value, { shouldDirty: true });
      if (onChange) {
        onChange(data?.value);
      }
    }
  };

  useEffect(() => {
    if (
      defaultValue !== undefined &&
      defaultValue !== '' &&
      defaultValue !== null &&
      options &&
      options.length > 0 &&
      state
    ) {
      setstate(false);
      setValue(name, defaultValue);
    }
  }, [defaultValue, options]);

  return (
    <>
      <Controller
        name={name && name}
        defaultValue={defaultValue}
        control={control}
        rules={rules}
        render={({ onChange: on, value }) => (
          <SelectLabel
            {...props}
            value={value}
            onChange={(data: any) => {
              on(data);
              handleChange(data);
            }}
          />
        )}
      />
      <ErrorLabel {...ErrorLabelProps} />
    </>
  );
};
const colourStyles = {
  option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? null : isSelected ? '#E9D8FD' : isFocused ? '#F7FAFC' : null,
      color: '#4A5568',
      fontSize: '14px',
      ':active': {
        ...styles[':active'],
        color: '#4A5568',
        backgroundColor: !isDisabled && (isSelected ? '#E9D8FD' : '#F7FAFC')
      },
      ':hover': {
        ...styles[':active'],
        color: '#4A5568',
        backgroundColor: !isDisabled && (isSelected ? '#E9D8FD' : '#FAF5FF')
      },
      ':focus': {
        ...styles[':active'],
        color: '#4A5568',
        backgroundColor: !isDisabled && (isSelected ? '#E9D8FD' : '#F7FAFC')
      }
    };
  },
  control: (base: any, state: any) => ({
    ...base,
    borderColor: state.isFocused ? '#B794F4' : '#CBD5E0',
    // This line disable the blue border
    boxShadow: state.isFocused ? 0 : 0,
    '&:hover': {
      borderColor: '#B794F4'
    },
    '&:active': {
      borderColor: '#B794F4'
    }
  })
};
const WrappedSelectLabel = memo(AntdSelect);
export { WrappedSelectLabel as SelectLabel };
