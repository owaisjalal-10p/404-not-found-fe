import { Dialog } from "primereact/dialog";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

interface IProjectDetails {
  confirmationProjectName: string;
  confirmationVisible: boolean;
  setConfirmationVisible: (isVisible: boolean) => void;
  assumtions: Array<any>;
  handleSaveResponse: (assumtions: Array<any>) => void;
  setAssumtions: (assumtions: any) => void;
}

function EstimationsListModal(props: IProjectDetails) {
  const {
    confirmationProjectName,
    confirmationVisible,
    setConfirmationVisible,
    assumtions,
    handleSaveResponse,
  } = { ...props };

  return (
    <Dialog
      header={confirmationProjectName}
      visible={confirmationVisible}
      style={{ width: "60vw" }}
      onHide={() => setConfirmationVisible(false)}
    >
      <div className="col-12">
        <div className="card">
          <div className="col-12 mb-2 h-20rem overflow-auto">
            {/* <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
              <Column field="code" header="Code"></Column>
              <Column field="name" header="Name"></Column>
              <Column field="category" header="Category"></Column>
              <Column field="quantity" header="Quantity"></Column>
            </DataTable> */}
          </div>
        </div>
      </div>
      <div className="col-12 flex justify-content-end">
        <Button label="Save" onClick={() => handleSaveResponse(assumtions)} />
        <Button
          outlined
          label="Cancel"
          onClick={() => setConfirmationVisible(false)}
          className="ml-2"
        />
      </div>
    </Dialog>
  );
}

export default EstimationsListModal;
