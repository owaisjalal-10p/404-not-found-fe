import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";

interface IProjectDetails{
    confirmationProjectName: string,
    confirmationVisible: boolean,
    setConfirmationVisible: (isVisible: boolean) => void,
    assumtions: Array<any>,
    handleSaveResponse: (assumtions: Array<any>) => void,
    setAssumtions: (assumtions: any) => void
}

function EstimationsListModal(props: IProjectDetails){
    const {confirmationProjectName, confirmationVisible, setConfirmationVisible, assumtions, handleSaveResponse, setAssumtions} = {...props};
    const updateAssumptionState = () => {
        setAssumtions(() => [...assumtions])
    }
    
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
              {assumtions.map((assumption, index) => (
                <div
                  key={index}
                  className="flex justify-content-between mb-2 grid"
                >
                  <div className="col-10">
                    <p
                      style={{
                        textDecoration: assumption.isRemovedFromList
                          ? "line-through"
                          : "none",
                        }}
                    >
                      {assumption.assumption}
                    </p>
                  </div>
                  <div className="actions col-2 justify-content-end flex gap-2">
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-12 flex justify-content-end">
          <Button
            label="Save"
            onClick={() => handleSaveResponse(assumtions)}
          />
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