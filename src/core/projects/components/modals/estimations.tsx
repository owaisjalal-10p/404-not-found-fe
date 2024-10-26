import { Dialog } from "primereact/dialog";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { TreeTable } from "primereact/treetable";

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

  const estimations: any = [
    {
      key: 1,
      "Module Name": "User Management",
      "Module-Specific Assumptions": [
        "Users can register, login, and manage their profiles.",
        "OAuth2 integration for social logins is required.",
      ],
      Effort: {
        Architect: 10,
        PM: 8,
        Designer: 12,
        Backend: 20,
        Frontend: 18,
        "HTML/CSS": 5,
        SecOps: 4,
        QA: 10,
        DevOps: 6,
      },
      "Sub-Modules": [
        {
          Name: "Registration",
          Effort: {
            Architect: 2,
            PM: 2,
            Designer: 3,
            Backend: 5,
            Frontend: 4,
            "HTML/CSS": 1,
            SecOps: 1,
            QA: 2,
            DevOps: 1,
          },
        },
        {
          Name: "Login",
          Effort: {
            Architect: 1,
            PM: 1,
            Designer: 2,
            Backend: 4,
            Frontend: 3,
            "HTML/CSS": 1,
            SecOps: 1,
            QA: 2,
            DevOps: 1,
          },
        },
      ],
    },
  ].map((estimate: any) => {
    const transformedEstimateObject: any = { ...estimate, data: {} };
    if (estimate.Effort) {
      for (const key in estimate.Effort) {
        transformedEstimateObject[key] = estimate.Effort[key];
      }
      transformedEstimateObject.data = {
        ...transformedEstimateObject.data,
        ...transformedEstimateObject,
      };
    }
    if (estimate["Sub-Modules"] && estimate["Sub-Modules"].length) {
      transformedEstimateObject.children = estimate["Sub-Modules"].map(
        (subModule: any) => {
          const transformedSubModule = { ...subModule, data: {} };
          if (subModule.Effort) {
            for (const key in subModule.Effort) {
              transformedSubModule[key] = subModule.Effort[key];
            }
            transformedSubModule.data = {
              ...transformedSubModule.data,
              ...transformedSubModule,
            };
          }
          return transformedSubModule;
        }
      );
    }
    return transformedEstimateObject;
  });

  return (
    <Dialog
      header={confirmationProjectName}
      visible={confirmationVisible}
      style={{ width: "80vw" }}
      onHide={() => setConfirmationVisible(false)}
    >
      <div className="col-12">
        <div className="card">
          <div className="col-12 mb-2 h-20rem overflow-auto">
            <TreeTable value={estimations}>
              <Column header="" expander></Column>
              <Column
                style={{ width: "200px" }}
                field="Module Name"
                header="Module Name"
              ></Column>
              <Column
                style={{ width: "300px" }}
                field="Module-Specific Assumptions"
                header="Module-Specific Assumptions"
              ></Column>
              <Column field="Architect" header="Architect"></Column>
              <Column field="PM" header="PM"></Column>

              <Column field="Designer" header="Designer"></Column>
              <Column field="Backend" header="Backend"></Column>

              <Column field="Frontend" header="Frontend"></Column>
              <Column field="HTML/CSS" header="HTML/CSS"></Column>

              <Column field="SecOps" header="SecOps"></Column>
              <Column field="QA" header="QA"></Column>
              <Column field="DevOps" header="DevOps"></Column>
            </TreeTable>
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
