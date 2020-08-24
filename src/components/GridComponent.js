import React from "react";
import BootstrapTable from "react-bootstrap/Table";

function GridComponent(props) {

    return (
   
          <div className="tableDiv">
            <BootstrapTable striped bordered hover size="sm" responsive="true">
              <thead>
                <tr>{props.tableHeadingList}</tr>
              </thead>
              <tbody>{props.entryRows}</tbody>
            </BootstrapTable>
          </div>
      );
}

export default GridComponent;