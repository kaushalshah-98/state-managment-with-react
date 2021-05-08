////////////////// Not Used now ///////////////////////////
const errSpanClassName = 'block text-xs font-small text-red-500';
const inputClassName =
  'mt-2 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5';
const labelClassName = 'block text-sm font-medium leading-5 text-gray-500';
const optionClassName =
  'appearance-none border-transparent py-2 px-4 text-gray-600 hover:bg-blue-600 hover:text-white border-none hover:border-none focus:outline-none';
const selectClassName =
  'mt-2 block appearance-none w-full border border-gray-300 bg-white text-gray-600 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white';
const displayClassName =
  'mt-2 text-gray-700 block w-full py-2 transition duration-150 ease-in-out sm:text-sm sm:leading-5';

export type ButtonProps = {
  functionName: any;
  name: string;
  className?: string;
  upperCase?: string;
};

export type LabelProps = {
  label: string;
  className?: string;
  upperCase?: boolean;
  required?: boolean;
};
export type TextAreaLabelProps = {
  name: string;
  rows?: number;
  cols?: number;
  label: string;
  defaultValue?: string;
  register?: any;
  textAreaClass?: string;
  labelClass?: string;
  errors?: any;
  placeHolder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  displayOnly?: boolean;
  upperCase?: boolean;
};
export type InputLabelProps = {
  name: string;
  type?: string;
  label?: string;
  children?: any;
  defaultValue?: string;
  register?: any;
  inputClass?: string;
  labelClass?: string;
  errors?: any;
  placeHolder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  displayOnly?: boolean;
  upperCase?: boolean;
};
export type RadioLabelProps = {
  name: string;
  value?: string;
  label?: string;
  onClick?: any;
  defaultValue?: any;
  register?: any;
  inputClass?: string;
  labelClass?: string;
  errors?: any;
  placeHolder?: string;
  upperCase?: boolean;
  checked?: any;
};
type option = {
  value: string;
  name: string;
};
export type SelectLabelProps = {
  name: string;
  options: option[];
  defaultValue?: string;
  label?: string;
  onClick?: any;
  register?: any;
  selectClass?: string;
  displayOnly?: boolean;
  optionClass?: string;
  labelClass?: string;
  errors?: any;
  upperCase?: boolean;
  required?: boolean;
};
export type ErrorLabelProps = {
  errors: any;
  name: string;
  className?: string;
};
export type ShowLabelProps = { defaultValue: string };

export {
  displayClassName,
  errSpanClassName,
  inputClassName,
  labelClassName,
  optionClassName,
  selectClassName
};
