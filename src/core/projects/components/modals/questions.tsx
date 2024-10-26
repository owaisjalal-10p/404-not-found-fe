import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";

interface IProps{
    confirmationProjectName: string,
    confirmationVisible: boolean,
    setConfirmationVisible: (isVisible: boolean) => void,
    questions: Array<any>,
    handleSaveResponse: (questions: Array<any>) => void,
    setQuestions: (questions: any) => void
}

function Questions(props: IProps){
    const {confirmationProjectName, confirmationVisible, setConfirmationVisible, questions, handleSaveResponse, setQuestions} = {...props};
    const updateQuestionState = () => {
        setQuestions(() => [...questions])
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
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="flex justify-content-between mb-2 grid"
                >
                  <div className="col-11">
                    <p
                      style={{
                        textDecoration: question.isRemovedFromList
                          ? "line-through"
                          : "none",
                        }}
                    >
                      {question.question}
                    </p>
                    {!question.isRemovedFromList && question.hasOwnProperty('answer') && <InputTextarea
                        className="w-full"
                        rows={3}
                        value={question.answer}
                        disabled={!question.isEditMode}
                        onChange={(e) => {
                          question.answer = e.target.value;
                          updateQuestionState();
                        }}
                        required
                      />
                      }
                  </div>
                  <div className="actions col-1 justify-content-end flex">
                    {question.isRemovedFromList ? (
                      <Button
                        onClick={() => {
                            question.isRemovedFromList = !question.isRemovedFromList;
                            updateQuestionState();
                        }}
                        icon="pi pi-undo"
                        rounded
                        text
                        severity="success"
                        aria-label="Restore"
                      />
                    ) : question.isEditMode ? (
                      <Button
                        onClick={() => {
                            question.isEditMode = false;
                            updateQuestionState();
                        }}
                        icon="pi pi-save"
                        rounded
                        text
                        severity="success"
                        aria-label="Save"
                      />
                    ) : (
                      <>
                        <Button
                          onClick={() => {
                            
                            question.isEditMode = true;
                            question.answer = '';
                            updateQuestionState()
                            debugger
                        }}
                          icon="pi pi-pencil"
                          rounded
                          text
                          severity="info"
                          aria-label="Edit"
                        />
                        {!question.answer && <Button
                          icon="pi pi-times"
                          rounded
                          text
                          severity="danger"
                          onClick={() => {
                            question.isRemovedFromList = !question.isRemovedFromList;
                            updateQuestionState();
                          }}
                          aria-label="Remove"
                        />}
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
            onClick={() => handleSaveResponse(questions)}
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

export default Questions;