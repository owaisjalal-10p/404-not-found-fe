import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/md-dark-deeppurple/theme.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import architectsData from "../architects.json";
import { FileUpload } from "primereact/fileupload";
import intialData from "./initialData";

interface City {
  name: string;
  code?: string;
}

interface Loe {
  name: string;
}

interface TechStack {
  name: string;
}

interface Attachment {
  name: string;
  url: string;
}

interface ProjectData {
  clientName: string;
  projectName: string;
  loeType: City | null;
  description: string;
  techStack: City[];
  attachment?: Attachment;
  team?: City[];
  architect?: City | null;
}

function App() {
  const [projects, setProjects] = useState<ProjectData[]>([intialData]);
  const [visible, setVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [form, setForm] = useState<ProjectData>({
    clientName: "",
    projectName: "",
    loeType: null,
    description: "",
    techStack: [],
    attachment: undefined,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(null);
  const [rowResponses, setRowResponses] = useState({});
  const [confirmationProjectName, setConfirmationProjectName] = useState("");
  const toast = useRef<Toast>(null);
  const fileUploadRef = useRef<FileUpload>(null);
  const questions = [
    "What specific data and feature access permissions are required for each user role?",
    "Are there any specific restrictions or security controls for 'super admin' or external consultant roles?",
    "Are there additional export formats (e.g., CSV, PDF) required beyond Excel?",
    "What level of detail is needed for importing financial models, including file structure and data validation?",
    "Could there be a future need for integrating third-party financial tools, even as an optional feature?",
    "Should data synchronization between NS Core and NS Deal happen in real time, or would scheduled batch syncs suffice?",
    "Are there specific requirements for GDPR/CCPA compliance, such as handling data access requests or data portability?",
    "Is user activity logging needed from Day 1, or can it be delayed until future releases?",
    "Is mobile or tablet optimization required for the application?",
    "Will users need options to customize dashboards or report layouts?",
    "Beyond real-time viewing, will multi-user collaborative editing be necessary (e.g., for documents or deal data entries)?",
    "Are there specific high availability or disaster recovery requirements for critical services like authentication or data storage?",
    "Should we plan to implement feature toggles to support phased rollouts or limited feature releases?",
    "Is there an expectation for in-app help, training materials, or user documentation to support client onboarding and ongoing usage?",
  ];
  // State to track which questions are being edited and which are removed
  const [editedQuestions, setEditedQuestions] = useState(
    new Array(questions.length).fill(false)
  );
  const [removedQuestions, setRemovedQuestions] = useState(
    new Array(questions.length).fill(false)
  );
  const [textareaValues, setTextareaValues] = useState(
    new Array(questions.length).fill("")
  );
  // Assuming 'entries' is an array of objects where each entry has an 'id' and a 'responses' field
  const handleSaveResponses = (entryId: number) => {
    // Find the entry based on its ID
    const entryIndex = entries.findIndex((entry) => entry.id === entryId);

    if (entryIndex !== -1) {
      // Save questions and textarea values to the specified entry
      const updatedEntry = {
        ...entries[entryIndex],
        responses: questions.map((question, index) => ({
          question,
          answer: textareaValues[index],
          removed: removedQuestions[index],
          edited: editedQuestions[index],
        })),
      };

      // Update the entries state
      const updatedEntries = [...entries];
      updatedEntries[entryIndex] = updatedEntry;
      setEntries(updatedEntries);
    }

    // Hide the dialog after saving
    setConfirmationVisible(false);
  };
  const openDialogForEntry = (entryId: number) => {
    setCurrentRowId(entryId);
    setConfirmationVisible(true);
  };

  const handleEdit = (index) => {
    const updatedEditedQuestions = [...editedQuestions];
    updatedEditedQuestions[index] = !updatedEditedQuestions[index]; // Toggle edit mode
    setEditedQuestions(updatedEditedQuestions);
  };

  const handleRemove = (index) => {
    const updatedRemovedQuestions = [...removedQuestions];
    updatedRemovedQuestions[index] = true; // Mark the question as removed
    setRemovedQuestions(updatedRemovedQuestions);
  };

  const handleRestore = (index) => {
    const updatedRemovedQuestions = [...removedQuestions];
    updatedRemovedQuestions[index] = false; // Restore the question
    setRemovedQuestions(updatedRemovedQuestions);
  };

  const handleTextareaChange = (index, value) => {
    const updatedTextareaValues = [...textareaValues];
    updatedTextareaValues[index] = value; // Update the textarea value
    setTextareaValues(updatedTextareaValues);
  };

  const cities: City[] = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const techStacks: TechStack[] = [
    { name: "React.js" },
    { name: "Angular" },
    { name: "Vue.js" },
    { name: "Svelte" },
    { name: "SASS" },
    { name: "LESS" },
    { name: "Styled-components" },
    { name: "Emotion" },
    { name: "Tailwind CSS" },
    { name: "JavaScript/TypeScript" },
    { name: "Python" },
    { name: "Java" },
    { name: "Go" },
    { name: "Ruby" },
    { name: "Express.js" },
    { name: "Django" },
    { name: "Spring Boot" },
    { name: "PostgreSQL" },
    { name: "MySQL" },
    { name: "SQLite" },
    { name: "MongoDB" },
    { name: "Redis" },
    { name: "Cassandra" },
    { name: "Docker" },
    { name: "Kubernetes" },
    { name: "GitHub Actions" },
    { name: "GitLab CI/CD" },
    { name: "Jenkins" },
    { name: "AWS" },
    { name: "Microsoft Azure" },
    { name: "Google Cloud Platform (GCP)" },
    { name: "RESTful APIs" },
    { name: "GraphQL" },
    { name: "Microservices" },
    { name: "Serverless Computing" },
    { name: "AI/ML Integration" },
    { name: "Low-Code/No-Code Platforms" },
    { name: "WebAssembly" },
  ];
  const [architects, setArchitects] = useState<Array<any>>([]);

  useEffect(() => {
    if (architectsData && architectsData.architects) {
      setArchitects(architectsData.architects);
    }
  }, []);

  const loes: Loe[] = [{ name: "L1" }, { name: "L2" }, { name: "L3" }];

  const handleSave = () => {
    const { clientName, projectName, loeType, description, techStack } = form;

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

    // Save the project
    if (isEditMode) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.projectName === projectName ? form : project
        )
      );
    } else {
      setProjects((prevProjects) => [...prevProjects, form]);
    }

    setConfirmationProjectName(projectName);
    setConfirmationVisible(true);

    resetForm();
    setVisible(false);
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

  const onFileSelect = (e) => {
    const uploadedFile = e.files[0];
    if (uploadedFile) {
      setForm((prev) => ({
        ...prev,
        attachment: {
          name: uploadedFile.name,
          url: URL.createObjectURL(uploadedFile),
        },
      }));
    }
  };

  const editProject = (rowData: any) => {
    setForm(rowData);
    setIsEditMode(true);
    setVisible(true);
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
        onClick={() => {
          const existingResponses = rowResponses[rowData.id] || []; // Use the row's ID
          setTextareaValues(existingResponses);
          setCurrentRowId(rowData.id); // Set the row ID for later reference
          setConfirmationProjectName(rowData.projectName);
          setConfirmationVisible(true);
        }}
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <div className="grid grid-nogutter">
        <div className="col-12 mb-8">
          <div className="card">
            <Card>
              <div className="flex align-items-center justify-content-between">
                <span className="text-xl">
                  <strong className="text-primary">Projects</strong>
                </span>
                <Button label="Add New" onClick={() => setVisible(true)} />
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
                  data.techStack.map((stack) => stack.name).join(", ")
                }
              />
              <Column
                header="Architect"
                body={(data) => data.architect?.name || ""}
              />
              <Column
                header="Team"
                body={(data) =>
                  data.team?.map((member) => member.name).join(", ") || ""
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

      <Dialog
        header={isEditMode ? "Edit Project Details" : "Enter Project Details"}
        visible={visible}
        style={{ width: "60vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="grid">
          <div className="col-6 pt-3">
            <FloatLabel>
              <InputText
                className="w-full"
                value={form.clientName}
                onChange={(e) =>
                  setForm({ ...form, clientName: e.target.value })
                }
                required
              />
              <label>Client Name*</label>
            </FloatLabel>
          </div>
          <div className="col-6 pt-3">
            <FloatLabel>
              <InputText
                className="w-full"
                value={form.projectName}
                onChange={(e) =>
                  setForm({ ...form, projectName: e.target.value })
                }
                required
              />
              <label>Project Name*</label>
            </FloatLabel>
          </div>
          <div className="col-6 pt-3">
            <FloatLabel>
              <Dropdown
                className="w-full"
                value={form.loeType}
                onChange={(e) => setForm({ ...form, loeType: e.value })}
                options={loes}
                optionLabel="name"
                required
              />
              <label>LOE Type*</label>
            </FloatLabel>
          </div>
          <div className="col-6 pt-3">
            <FloatLabel>
              <MultiSelect
                className="w-full"
                value={form.techStack}
                onChange={(e) => setForm({ ...form, techStack: e.value })}
                options={techStacks}
                optionLabel="name"
                required
              />
              <label>Tech Stack*</label>
            </FloatLabel>
          </div>
          <div className="col-6">
            <FloatLabel>
              <Dropdown
                className="w-full"
                value={form.architect}
                onChange={(e) => setForm({ ...form, architect: e.value })}
                options={architects}
                optionLabel="name"
              />
              <label>Architect</label>
            </FloatLabel>
          </div>
          <div className="col-6">
            <FloatLabel>
              <MultiSelect
                className="w-full"
                value={form.team}
                onChange={(e) => setForm({ ...form, team: e.value })}
                options={cities}
                optionLabel="name"
              />
              <label>Team</label>
            </FloatLabel>
          </div>
          <div className="col-12">
            <FloatLabel>
              <InputTextarea
                className="w-full"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={15}
                required
              />
              <label>Description*</label>
            </FloatLabel>
          </div>

          <div className="col-12">
            <FileUpload
              ref={fileUploadRef}
              name="file"
              url="/api/upload"
              accept="image/*"
              maxFileSize={1000000}
              onSelect={onFileSelect}
              mode="basic"
              chooseLabel={isEditMode ? "Change Attachment" : "Choose File"}
              cancelLabel="Cancel"
              uploadLabel="Upload"
            />
            {form.attachment && (
              <div className="mt-2">
                <strong>Current Attachment:</strong> {form.attachment.name}
              </div>
            )}
          </div>
          <div className="col-12 flex justify-content-end">
            <Button label="Save" onClick={handleSave} />
            <Button
              outlined
              label="Cancel"
              onClick={() => setVisible(false)}
              className="ml-2"
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header={confirmationProjectName}
        visible={confirmationVisible}
        style={{ width: "60vw" }}
        onHide={() => setConfirmationVisible(false)}
      >
        <div className="col-12">
          <div className="card">
            <div className="col-12 mb-2">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="flex justify-content-between mb-2 grid"
                >
                  <div className="col-8">
                    <p
                      style={{
                        textDecoration: removedQuestions[index]
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {question}
                    </p>
                    {editedQuestions[index] && !removedQuestions[index] && (
                      <InputTextarea
                        className="w-full"
                        rows={3}
                        value={textareaValues[index]}
                        onChange={(e) =>
                          handleTextareaChange(index, e.target.value)
                        }
                        required
                      />
                    )}
                  </div>
                  <div className="actions col-4 justify-content-end flex">
                    {removedQuestions[index] ? (
                      <Button
                        onClick={() => handleRestore(index)}
                        icon="pi pi-undo"
                        rounded
                        text
                        severity="success"
                        aria-label="Restore"
                      />
                    ) : editedQuestions[index] ? (
                      <Button
                        onClick={() => handleSave(index)}
                        icon="pi pi-save"
                        rounded
                        text
                        severity="success"
                        aria-label="Save"
                      />
                    ) : (
                      <>
                        <Button
                          onClick={() => handleEdit(index)}
                          icon="pi pi-pencil"
                          rounded
                          text
                          severity="info"
                          aria-label="Edit"
                        />
                        <Button
                          icon="pi pi-times"
                          rounded
                          text
                          severity="danger"
                          onClick={() => handleRemove(index)}
                          aria-label="Remove"
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-12 flex justify-content-end">
          <Button
            label="Save"
            onClick={() => handleSaveResponses(currentRowId)}
          />
          <Button
            outlined
            label="Cancel"
            onClick={() => setConfirmationVisible(false)}
            className="ml-2"
          />
        </div>
      </Dialog>
    </>
  );
}

export default App;
