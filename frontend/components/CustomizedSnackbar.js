import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function CustomizedSnackbar({open, setShowSnackbar, snackbarMsg}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackbar(false);
  };

  return (
    <div style={{position: 'absolute'}}>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}