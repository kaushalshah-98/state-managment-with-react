import classnames from 'classnames';
import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

const Temp = styled.div`
  overflow-y: auto;
  max-height: 90vh;
  scrollbar-width: thin !important;
  ::-webkit-scrollbar {
    width: 6px;
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

type IModalContainerProps = {
  open: boolean;
  onClose: any;
  children: any;
  className?: string;
  onClick?: () => void;
  renderToElement?: any;
  containerClassName?: string;
  overlayClassName?: string;
};

export class Modal extends Component<IModalContainerProps> {
  renderModal() {
    const { open, onClose, children, className, containerClassName, overlayClassName } = this.props;
    const modalClass =
      'relative bg-white rounded-lg pb-4 shadow-xl transform transition-all sm:max-w-lg sm:w-full';
    if (!open) {
      return null;
    }

    const resolvedClassName = classnames(
      'yum-ui-modal',
      'modal',
      'shadow-xl overflow-hidden transform transition-all ',
      { 'ease-in duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95': !open },
      { 'ease-out duration-300 opacity-100 translate-y-0 sm:scale-100': open },
      className ? className : modalClass
    );

    const resolvedContainerClassName = classnames(
      'fixed bottom-0 z-50 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center',
      { 'ease-out duration-300 opacity-0': open },
      { 'ease-out duration-300 opacity-100': open },
      containerClassName
    );

    const resolvedOverlayClassName = classnames(
      'absolute inset-0 bg-gray-800 opacity-75',
      overlayClassName
    );

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
          <Temp>
            <div>{children}</div>
          </Temp>
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
