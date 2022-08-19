import {useContext, useEffect, useState, forwardRef} from 'react';
import { AppContext } from '../context/AppContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const [open, setOpen] = useState(false);
  const {alert, setAlert} = useContext(AppContext);
//   { This iis want and Alert should look like
//       msg:"Alert Message",
//       cat:"Success/Warning"
//   }
    useEffect(
        ()=>{
            setOpen(true)
        },[alert]
    )

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setAlert({});
  };

  if(!alert?.msg){
      return<></>
  }

  return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.cat} sx={{ width: '100%' }}>
          {alert.msg}
        </Alert>
      </Snackbar>
  );
}
