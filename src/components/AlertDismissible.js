import React from "react";

import Alert from "react-bootstrap/Alert";

function AlertDismissible(props) {
    return (
      <Alert variant="danger" onClose={() => props.setShowAlert(false)} dismissible>
        <Alert.Heading>Oops! Something went wrong</Alert.Heading>
        <p>
          Please try after some time/check is UAT server under maintainance.
        </p>
      </Alert>
    );
  }
  
  export default AlertDismissible;