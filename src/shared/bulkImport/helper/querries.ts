// import { gql } from '@apollo/client';

// const VENDOR_VALIDATE = gql`
//   mutation($src: String!) {
//     Vendors {
//       ValidateItems(src: $src) {
//         validation
//         error_array
//         file
//         error_msg
//       }
//     }
//   }
// `;

// const LIABILITY_VALIDATE = gql`
//   mutation($src: String!, $customerId: String!, $type: String!) {
//     Liabilities {
//       ValidateItems(src: $src, type: $type, customerId: $customerId) {
//         validation
//         error_array
//         file
//         error_msg
//       }
//     }
//   }
// `;

// const PREPARE = gql`
//   mutation($fileName: String, $liability_type: String, $customer_id: String) {
//     Liabilities {
//       updateExcel(fileName: $fileName, liability_type: $liability_type, customer_id: $customer_id) {
//         status
//         fileName
//       }
//     }
//   }
// `;

// const VENDOR_IMPORT = gql`
//   mutation($src: String) {
//     Vendors {
//       importBulkData(src: $src)
//     }
//   }
// `;

// const LIABILITY_IMPORT = gql`
//   mutation($src: String!, $user: String!) {
//     Liabilities {
//       importBulkData(src: $src, user: $user)
//     }
//   }
// `;

// const BulkImportQuery = {
//   VENDOR_VALIDATE,
//   LIABILITY_VALIDATE,
//   LIABILITY_IMPORT,
//   VENDOR_IMPORT,
//   PREPARE
// };

// export { BulkImportQuery };
export {};
