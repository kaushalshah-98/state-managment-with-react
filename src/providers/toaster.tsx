import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <>
      <ToastContainer />
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          duration: 2000,
          // className: 'p-20 text-lg'
          style: {
            padding: '15px',
            // background: '#363636',
            // color: '#fff',
            zIndex: 1
          }
          // success: {
          //   style: {
          //     borderRadius: '10px',
          //     background: '#333',
          //     color: '#fff',
          //     fontSize: '12px'
          //   }
          // },
          // error: {
          //   style: {
          //     borderRadius: '10px',
          //     background: '#333',
          //     color: '#fff',
          //     fontSize: '12px'
          //   }
          // }
        }}
      />
    </>
  );
};

export { ToastProvider };
