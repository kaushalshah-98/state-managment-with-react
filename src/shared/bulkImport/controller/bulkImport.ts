// import LiabilityState from '@Modules/Console/Liability/Logistics/Controller/liability';
// import VendorState from '@Modules/Console/Vendor/Vendor/Controller/vendor';
// import { STATIC_FILES_URL } from '../Helper/staticData';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { STATIC_FILES_URL } from '../helper/staticData';

const BulkImportState = (props: any) => {
  // const [file, setfile] = useState('');
  // const [schema, setschema] = useState('');
  const [loading, setloading] = useState(false);
  const [errorsArray, seterrorsArray] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [errorMessage, seterrorMessage] = useState('');
  const [isPreparing, setisPreparing] = useState(false);
  const [activeState, setActiveState] = useState('first');
  const [serverErrors, setserverErrors] = useState(false);
  const [importComplete, setimportComplete] = useState(false);
  const [Validationerrors, setValidationerrors] = useState(false);
  const [ValidationComplete, setValidationComplete] = useState(false);
  // const [prepareDocument] = useMutation(BulkImportQuery.PREPARE);
  // const [vendorValidateDocument] = useMutation(BulkImportQuery.VENDOR_VALIDATE);
  // const [vendorImportDocument] = useMutation(BulkImportQuery.VENDOR_IMPORT);
  // const [liabilityValidateDocument] = useMutation(BulkImportQuery.LIABILITY_VALIDATE);
  // const [liabilityImportDocument] = useMutation(BulkImportQuery.LIABILITY_IMPORT);
  // const { currentUser } = useContext(CurrentUserContext);

  // const { refresh } = LiabilityState(props);
  // const { refresh: vendorrefresh } = VendorState(props);

  // liability
  // const PrepareDocument = async (liability_type: string, customer_id: string, fileName: string) => {
  //   setisPreparing(true);
  //   const variables = { fileName, liability_type, customer_id };
  //   const params = { variables };
  //   // const func = prepareDocument;
  //   const successMsg = 'Prepared The Document';
  //   const errorMsg = 'Something Went Wrong During Preparing';
  //   // const { res, err } = await handleAsync({ func, params, successMsg, errorMsg });
  //   // console.log(res);
  //   // const data = res?.data?.Liabilities?.updateExcel;
  //   // if (data && data.status) {
  //   //   console.log('prepared');
  //   //   prepareLink(data.fileName);
  //   // } else {
  //   //   console.log('server Error');
  //   // }
  //   setisPreparing(false);
  // };
  const startValidating = async (data: any) => {
    setloading(true);
    // const variables = { src: fileName, type, customerId };
    // console.log(variables);
    // const params = { variables };
    // const func = liabilityValidateDocument;
    // const successMsg = 'Validated The Document';
    // const errorMsg = 'Something Went Wrong During Validating';
    // const { res, err } = await handleAsync({ func, params, successMsg, errorMsg });
    // console.log(res);
    // const data = res?.data?.Liabilities?.ValidateItems;
    // if (data?.error_msg) {
    //   console.log(data?.error_msg);
    //   seterrorMessage(data?.error_msg);
    //   setValidationerrors(true);
    // } else if (data?.validation) {
    //   setValidationComplete(true);
    //   setValidationerrors(false);
    //   setfile(data.file);
    // } else if (data?.error_array) {
    //   setValidationerrors(true);
    //   setValidationComplete(false);
    //   seterrorsArray(JSONparse(data?.error_array));
    // } else {
    //   console.log(err.message);
    //   seterrorMessage(err.message);
    //   setserverErrors(true);
    //   console.log('server Error');
    // }
    setloading(false);
  };
  const startImporting = async () => {
    setloading(true);
    // const params = { variables: { src: file, user: JSON.stringify(currentUser) } };
    // const func = liabilityImportDocument;
    // const successMsg = 'Validated The Document';
    // const errorMsg = 'Something Went Wrong During Validating';
    // const { res, err } = await handleAsync({ func, params, successMsg, errorMsg });
    // const data = res?.data?.Liabilities?.importBulkData;
    // console.log(res);
    // if (data) {
    //   setimportComplete(true);
    //   setTotalRecords(data);
    //   await refresh();
    // } else {
    //   console.log('server Error');
    // }
    setloading(false);
  };

  const getDocument = (customerId: string = '') => {
    prepareLink();
  };
  const setActive = (state: string) => {
    setActiveState(state);
  };

  const prepareLink = (link: string = '') => {
    const href = STATIC_FILES_URL + 'Informa_Source_ME_LDMS.xlsx';
    // const linkk = document.createElement('a');
    // linkk.href = href;
    // linkk.setAttribute('download', STATIC_FILES_URL + link);
    // document.body.appendChild(linkk);
    // linkk.click();

    saveAs(href, 'Excel File');
  };

  const resetState = () => {
    setloading(false);
    seterrorsArray([]);
    setTotalRecords(0);
    seterrorMessage('');
    setisPreparing(false);
    setserverErrors(false);
    setimportComplete(false);
    setValidationerrors(false);
    setValidationComplete(false);
  };

  return {
    setActive,
    startValidating,
    getDocument,
    startImporting,
    resetState,
    errorMessage,
    isPreparing,
    totalRecords,
    activeState,
    serverErrors,
    loading,
    errorsArray,
    importComplete,
    Validationerrors,
    ValidationComplete
  };
};
export default BulkImportState;
