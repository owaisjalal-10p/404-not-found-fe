import { useState, useRef, useEffect } from "react";
import "./project.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProjectDetailModal from "../components/modals/project-details";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProjectData } from "../../../interface";
import { OverlayPanel } from "primereact/overlaypanel";
import Questions from "../components/modals/questions";
import Assumption from "../components/modals/assumptions";
import EstimationsListModal from "../components/modals/estimations";
import { ProjectService } from "../services/project.service";

function Project() {
  const projectService = new ProjectService();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const itemMenuOPRef: any = useRef(null);
  const [isProjectDetailVisible, showProjectDetail] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const fileUploadRef = useRef<FileUpload>(null);
  const [confirmationProjectName, setConfirmationProjectName] = useState("");
  const [visibleQuestionModal, setVisibleQuestionModal] = useState(false);
  const [visibleAssumptionModal, setVisibleAssumptionModal] = useState(false);
  const [visibleEstimationsModal, setVisibleEstimationsModal] = useState(false);
  const [form, setForm] = useState<ProjectData>({
    clientName: "",
    projectName: "",
    loeType: null,
    description: "",
    techStack: [],
    attachment: undefined,
  });
  const [questions, setQuestions] = useState([
    {
      question:
        "What specific data and feature access permissions are required for each user role?",
    },
    {
      question:
        "Are there any specific restrictions or security controls for 'super admin' or external consultant roles?",
    },
    {
      question:
        "Are there additional export formats (e.g., CSV, PDF) required beyond Excel?",
    },
    {
      question:
        "What level of detail is needed for importing financial models, including file structure and data validation?",
    },
    {
      question:
        "Should data synchronization between NS Core and NS Deal happen in real time, or would scheduled batch syncs suffice?",
    },
    {
      question:
        "Could there be a future need for integrating third-party financial tools, even as an optional feature?",
    },
    {
      question:
        "Are there specific requirements for GDPR/CCPA compliance, such as handling data access requests or data portability?",
    },
    {
      question:
        "Is user activity logging needed from Day 1, or can it be delayed until future releases?",
    },
    {
      question:
        "Is mobile or tablet optimization required for the application?",
    },
    {
      question:
        "Will users need options to customize dashboards or report layouts?",
    },
    {
      question:
        "Beyond real-time viewing, will multi-user collaborative editing be necessary (e.g., for documents or deal data entries)?",
    },
    {
      question:
        "Are there specific high availability or disaster recovery requirements for critical services like authentication or data storage?",
    },
    {
      question:
        "Should we plan to implement feature toggles to support phased rollouts or limited feature releases?",
    },
    {
      question:
        "Is there an expectation for in-app help, training materials, or user documentation to support client onboarding and ongoing usage?",
    },
  ]);
  const [assumtions, setAssumtions] = useState([
    {
      assumption:
        "What specific data and feature access permissions are required for each user role?",
    },
    {
      assumption:
        "Are there any specific restrictions or security controls for 'super admin' or external consultant roles?",
    },
    {
      assumption:
        "Are there additional export formats (e.g., CSV, PDF) required beyond Excel?",
    },
    {
      assumption:
        "What level of detail is needed for importing financial models, including file structure and data validation?",
    },
    {
      assumption:
        "Should data synchronization between NS Core and NS Deal happen in real time, or would scheduled batch syncs suffice?",
    },
    {
      assumption:
        "Could there be a future need for integrating third-party financial tools, even as an optional feature?",
    },
    {
      assumption:
        "Are there specific requirements for GDPR/CCPA compliance, such as handling data access requests or data portability?",
    },
    {
      assumption:
        "Is user activity logging needed from Day 1, or can it be delayed until future releases?",
    },
    {
      assumption:
        "Is mobile or tablet optimization required for the application?",
    },
    {
      assumption:
        "Will users need options to customize dashboards or report layouts?",
    },
    {
      assumption:
        "Beyond real-time viewing, will multi-user collaborative editing be necessary (e.g., for documents or deal data entries)?",
    },
    {
      assumption:
        "Are there specific high availability or disaster recovery requirements for critical services like authentication or data storage?",
    },
    {
      assumption:
        "Should we plan to implement feature toggles to support phased rollouts or limited feature releases?",
    },
    {
      assumption:
        "Is there an expectation for in-app help, training materials, or user documentation to support client onboarding and ongoing usage?",
    },
  ]);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    getProjectList()
  }, []);

  const getProjectList = async () => {
    let projectList = await projectService.getProjectLOEList();
    projectList = projectList.map((project: any) => {

        return {
            ...project, 
            techStack: project.techStack.split(',').map((stack: string) => ({name: stack})),
            architect: {name: project.architect},
            team: project.team.split(',').map((t: string) => ({name: t})),
            loeType: {name: project.loeType},
            key: project.id
        }
    })
    setProjects(() => [...projectList])
  }

  const onFileSelect = (e: any) => {
    const uploadedFile = e.files[0];
    if (uploadedFile) {
      setForm((prev: any) => ({
        ...prev,
        attachment: {
          name: uploadedFile.name,
          url: URL.createObjectURL(uploadedFile),
        },
      }));
    }
  };

  const handleSave = async () => {
    const { clientName, projectName, loeType, description, techStack, architect, team } = form;

    if (
      !clientName ||
      !projectName ||
      !loeType ||
      !description ||
      !techStack.length
    ) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill in all required fields.",
      });
      return;
    }

    if (isEditMode) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.projectName === projectName ? form : project
        )
      );
    } else {
        const response = await projectService.createProjectLOE({
            clientName,
            projectName,
            loeType: loeType.name,
            techStack: techStack?.map((stack: any) => stack.name).join(','),
            description,
            architect: {name: architect.name},
            team: team?.map((t: any) => t.name).join(',')
        })
        getProjectList()
    }

    setConfirmationProjectName(projectName);
    setVisibleQuestionModal(true);

    resetForm();
    showProjectDetail(false);
  };

  const resetForm = () => {
    setForm({
      clientName: "",
      projectName: "",
      loeType: null,
      description: "",
      techStack: [],
      attachment: undefined,
    });
    fileUploadRef.current?.clear();
    setIsEditMode(false);
  };

  const editProject = (rowData: any) => {
    setForm(rowData);
    setIsEditMode(true);
    showProjectDetail(true);
  };

  const actionBodyTemplate = (rowData: any) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text"
        onClick={() => editProject(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text p-button-danger"
        onClick={() => {
          setProjects((prev) => prev.filter((project) => project !== rowData));
        }}
      />
      <Button
        icon="pi pi-list"
        severity="help"
        className="p-button-rounded p-button-text"
        onClick={(event) => {
          setConfirmationProjectName(rowData.projectName);
          itemMenuOPRef?.current?.toggle(event);
        }}
      />
      <OverlayPanel ref={itemMenuOPRef} className="overlay-style">
        <ul className="list-none flex flex-column gap-2 p-0 m-0">
          <li>
            <Button
              label="Questions"
              className="p-button-text w-full"
              onClick={() => {
                setVisibleQuestionModal(true);
              }}
            />
          </li>
          <li>
            <Button
              label="Assumptions"
              className="p-button-text w-full"
              onClick={() => {
                setVisibleAssumptionModal(true);
              }}
            />
          </li>
          <li>
            <Button
              label="Task breakdown"
              className="p-button-text w-full"
              onClick={() => {
                setVisibleEstimationsModal(true);
              }}
            />
          </li>
        </ul>
      </OverlayPanel>
    </div>
  );

  const handleQuestionsSaveResponse = (questions: any) => {
  };

  const handleAssumptionsSaveResponse = (questions: any) => {
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="grid grid-nogutter">
        <div className="col-12 mb-8">
          <div className="card">
            <Card>
              <div className="flex align-items-center justify-content-between">
                <span className="text-xl">
                  <strong className="text-primary">404</strong>-NotFound
                </span>
                <Button
                  label="Add New"
                  onClick={() => showProjectDetail(true)}
                />
              </div>
            </Card>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <DataTable value={projects} paginator rows={10}>
              <Column field="clientName" header="Client Name" />
              <Column field="projectName" header="Project Name" />
              <Column header="LOE Type" body={(data) => data.loeType?.name} />
              <Column field="description" header="Description" />
              <Column
                header="Tech Stack"
                body={(data) =>
                  data.techStack.map((stack: any) => stack.name).join(", ")
                }
              />
              <Column
                header="Architect"
                body={(data) => data.architect?.name || ""}
              />
              <Column
                header="Team"
                body={(data) =>
                  data.team?.map((member: any) => member.name).join(", ") || ""
                }
              />
              <Column
                header="Attachment"
                body={(data) =>
                  data?.attachment ? (
                    <a
                      href={data.attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.attachment.name}
                    </a>
                  ) : (
                    "No Attachment"
                  )
                }
              />
              <Column header="Actions" body={actionBodyTemplate} />
            </DataTable>
          </div>
        </div>
      </div>
      <ProjectDetailModal
        {...{
          fileUploadRef,
          visible: isProjectDetailVisible,
          isEditMode: true,
          setVisible: showProjectDetail,
          form,
          setForm,
          onFileSelect,
          handleSave,
        }}
      />
      <Questions
        {...{
          confirmationProjectName,
          confirmationVisible: visibleQuestionModal,
          setConfirmationVisible: setVisibleQuestionModal,
          questions,
          handleSaveResponse: handleQuestionsSaveResponse,
          setQuestions,
        }}
      />
      <Assumption
        {...{
          confirmationProjectName,
          confirmationVisible: visibleAssumptionModal,
          setConfirmationVisible: setVisibleAssumptionModal,
          assumtions,
          handleSaveResponse: handleAssumptionsSaveResponse,
          setAssumtions,
        }}
      />

      <EstimationsListModal
        {...{
          confirmationProjectName,
          confirmationVisible: visibleEstimationsModal,
          setConfirmationVisible: setVisibleEstimationsModal,
          assumtions,
          handleSaveResponse: handleAssumptionsSaveResponse,
          setAssumtions,
        }}
      />
    </>
  );
}

export default Project;
