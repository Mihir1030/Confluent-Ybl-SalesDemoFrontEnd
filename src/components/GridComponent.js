import React from "react";
import PropTypes from "prop-types";

import BootstrapTable from "react-bootstrap/Table";

function GridComponent(props) {
  const { tableHeadingList, entryRows } = props;
  return (
    <div className="tableDiv">
      <BootstrapTable striped bordered hover size="sm" responsive>
        <thead>
          <tr>{tableHeadingList}</tr>
        </thead>
        <tbody>{entryRows}</tbody>
      </BootstrapTable>
    </div>
  );
}

GridComponent.propTypes = {
  tableHeadingList: PropTypes.arrayOf(PropTypes.element).isRequired,
  entryRows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GridComponent;
