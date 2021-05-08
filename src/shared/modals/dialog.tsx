import { FooterButton } from '@shared/forms';
import classnames from 'classnames';
import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';

type IModalContainerProps = {
  open: boolean;
  onClose: any;
  loading?: boolean;
  children?: any;
  className?: string;
  onClick?: () => void;
  renderToElement?: any;
  containerClassName?: string;
  overlayClassName?: string;
  closeDialog?: any;
  confirm?: () => void;
  header?: string;
  text?: string;
  cancelText?: string;
  confirmText?: string;
  secondText?: string;
  icon?: boolean;
  confirmTextColor?: string;
  cancelTextColor?: string;
};

export class Dialog extends Component<IModalContainerProps> {
  renderModal() {
    const {
      confirm,
      header,
      loading,
      text,
      cancelText,
      confirmText,
      secondText,
      icon,
      open,
      onClose,
      // children,
      className,
      containerClassName,
      overlayClassName
    } = this.props;
    const xColor = this.props.confirmTextColor;
    const yColor = this.props.cancelTextColor;

    const confirmBtnColor = `bg-${xColor || 'red'}-600
    hover:bg-${xColor || 'red'}-500 focus:border-${xColor || 'red'}-700
    focus:shadow-outline-${xColor || 'red'}`;

    const cancelBtnColor = `border-${yColor || 'gray'}-300
    text-${yColor || 'gray'}-700 hover:text-${yColor || 'gray'}-500
    focus:border-${yColor || 'blue'}-300 focus:shadow-outline-${yColor || 'blue'}`;

    if (!open) {
      return null;
    }

    const resolvedClassName = classnames(
      'yum-ui-modal',
      'modal',
      'relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6',
      'shadow-xl overflow-hidden transform transition-all ',
      { 'ease-in duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95': !open },
      { 'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100': open },
      className
    );

    const resolvedContainerClassName = classnames(
      'fixed bottom-0 z-50 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center',
      { 'ease-out duration-300 opacity-0': open },
      { 'ease-out duration-300 opacity-100': open },
      containerClassName
    );

    const resolvedOverlayClassName = classnames(
      'absolute inset-0 bg-gray-800 opacity-75',
      overlayClassName
    );
    const FooterButtonProps = {
      loading,
      btn1Name: confirmText,
      btn1Class: `${confirmBtnColor} inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5`,
      btn2Name: cancelText,
      btn2Class: `${cancelBtnColor} inline-flex justify-center w-full rounded-md border  px-4 py-2 bg-white text-base leading-6 font-medium shadow-sm focus:outline-none  transition ease-in-out duration-150 sm:text-sm sm:leading-5`,
      btn1Function: confirm,
      btn2function: onClose
    };
    return (
      <div className={resolvedContainerClassName}>
        <div role="button" className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className={resolvedOverlayClassName} />
        </div>
        <div
          className={resolvedClassName}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="sm:flex sm:items-start">
            {icon !== false && (
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            )}
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="flex items-center mt-2 text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                {header}
              </h3>
              <div className="mt-8 mb-8">
                <p className="text-sm leading-5 font-sans">{text}</p>
              </div>
              {secondText && (
                <div>
                  <p className="text-sm leading-5 font-sans">{secondText}</p>
                </div>
              )}
            </div>
          </div>
          <FooterButton {...FooterButtonProps} />
        </div>
      </div>
    );
  }

  render() {
    let { renderToElement } = this.props;

    if (!renderToElement) {
      if (typeof window !== 'undefined') {
        renderToElement = document.querySelector('body');
      }
    }

    const renderedModal = this.renderModal();
    if (typeof window !== 'undefined') {
      return ReactDOM.createPortal(renderedModal, renderToElement);
    }
    return <></>;
  }
}
