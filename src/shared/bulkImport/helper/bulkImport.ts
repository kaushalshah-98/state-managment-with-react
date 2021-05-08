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
//     Liability {
//       ValidateItems(src: $src, customerId: $customerId, type: $type) {
//         validation
//         error_array
//         file
//         error_msg
//       }
//     }
//   }
// `;

// const PREPARE = gql`
//   mutation($fileName: String!) {
//     Liability {
//       updateExcel(fileName: $fileName) {
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
//   mutation($src: String) {
//     Liability {
//       importBulkData(src: $src)
//     }
//   }
// `;

// const STATIC_FILES_URL =
//   process.env.END_POINT + '/static/tmp/' || 'http://api.metis.apps.actonatepanel.com/static/';

// const BulkImportQuery = {
//   VENDOR_VALIDATE,
//   LIABILITY_VALIDATE,
//   LIABILITY_IMPORT,
//   VENDOR_IMPORT,
//   PREPARE
// };

// export { BulkImportQuery, STATIC_FILES_URL };
export {};
