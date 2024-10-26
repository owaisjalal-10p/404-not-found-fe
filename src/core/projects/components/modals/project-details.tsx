import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Team, Loe, TechStack } from "../../../../interface";
import { MultiSelect } from "primereact/multiselect";
import techStackData from "../../../../../techStacks.json";
import architectsData from "../../../../../architects.json";
import teamJson from "../../../../../team.json";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { RefObject, useRef } from "react";
import { Button } from "primereact/button";

interface IProjectDetails{
    visible: boolean,
    isEditMode: boolean,
    setVisible: (visible: boolean) => void,
    form: any,
    setForm: (value: any) => void,
    onFileSelect: (e: any) => void,
    handleSave: () => void,
    fileUploadRef: RefObject<FileUpload>
}

function ProjectDetailModal(props: IProjectDetails){
    const { isEditMode, visible, setVisible, form, setForm, onFileSelect, handleSave, fileUploadRef } = {...props};
    const loes: Loe[] = [{ name: "L1" }, { name: "L2" }, { name: "L3" }];
    const techStacks: Array<TechStack> = techStackData;
    const architectsList: Array<any> = architectsData.architects;
    const teams: Team[] = teamJson.employees;

    return(
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
                options={architectsList}
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
                options={teams}
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
    )
}

export default ProjectDetailModal;