import React from "react";
import PropTypes from "prop-types";

import Alert from "react-bootstrap/Alert";

function AlertDismissible(props) {
  const { setShowAlert, alertMessage } = props;
  return (
    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
      <Alert.Heading>Oops! Something went wrong</Alert.Heading>
      <p>{alertMessage}</p>
    </Alert>
  );
}

AlertDismissible.propTypes = {
  setShowAlert: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
};

export default AlertDismissible;
