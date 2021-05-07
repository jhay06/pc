import { toast } from 'react-toastify';

toast.configure();

const success = (message) => {
  toast.success(message, {
    position: 'top-left',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const warnings = (message) => {
  toast.warning(message, {
    position: 'top-left',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const errors = (message) => {
  toast.error(message, {
    position: 'top-left',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default {
  success,
  warnings,
  errors,
};
