import React from "react";

import Alert from "react-bootstrap/Alert";

function AlertDismissible(props) {
  return (
    <Alert
      variant="danger"
      onClose={() => props.setShowAlert(false)}
      dismissible
    >
      <Alert.Heading>Oops! Something went wrong</Alert.Heading>
      <p>{props.alertMessage}</p>
    </Alert>
  );
}

export default AlertDismissible;
