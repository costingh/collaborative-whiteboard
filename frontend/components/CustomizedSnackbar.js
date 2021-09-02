// react
import React, { useState, useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} variant="filled" {...props} ref={ref} />);
const SnackbarComponent = React.forwardRef((props, ref) => <Snackbar  autoHideDuration={4000}  {...props} ref={ref} />);

export default function CustomizedSnackbar({open, setShowSnackbar, snackbarMsg, severity, transition, verticalAnchor, horizontalAnchor }) {
  const [vertical, setVertical] = useState('bottom');
  const [horizontal, setHorizontal] = useState('center');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  useEffect(() => {
    if(verticalAnchor) {
      setVertical(verticalAnchor)
    }

    if(horizontalAnchor) {
      setHorizontal(horizontalAnchor)
    }
  }, [])

  return (
    <div style={{position: 'absolute'}}>
      <SnackbarComponent
          open={open} 
          onClose={handleClose}
          TransitionComponent={
              transition ==='right' 
                ? TransitionRight 
                : transition ==='left'
                  ? TransitionLeft
                  : transition === 'down'
                    ? TransitionDown
                    : transition === 'up'
                      ? TransitionUp
                      : TransitionUp 
          }
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert onClose={handleClose} severity={severity ? severity : 'success'}>
            {snackbarMsg}
          </Alert>
      </SnackbarComponent>
      </div>
  );
}