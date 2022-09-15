import { FC, useRef } from "react"
import Button from "../reusable/Button"
import TextButton from "../reusable/TextButton"
import TextField from "../reusable/TextField"
import { useAppDispatch, useAppSelector } from "../../types/hooks"
import { manageQuizActions, manageQuizAsyncActions } from "../../slices/manageQuizSlice"
import { QuestionType } from "../../types/myquizzes"
import { editQuizActions, editQuizAsyncActions } from "../../slices/editQuizSlice"
import OptionField from "../reusable/OptionField"


const AddQuestionDialog: FC = () => {
    const dispatch = useAppDispatch()
    const {quizId, questionType, choiceOptions, correctAnswer, question } = useAppSelector(state => state.editQuiz)

    // TODO: Maybe clear the state of other type 
    const onTypeChange = (event: any) => {
        if (event.target.id === QuestionType.Boolean) {
            dispatch(editQuizActions.setQuestionType(QuestionType.Boolean))

        } else if (event.target.id === QuestionType.Choice) {
            dispatch(editQuizActions.setQuestionType(QuestionType.Choice))
        }
    }

    const onChoiceChange = (event: any) => {
        switch (event.target.id) {
            case "option1":
                dispatch(editQuizActions.setChoiceOption(["option1", event.target.value]))
                break
            case "option2":
                dispatch(editQuizActions.setChoiceOption(["option2", event.target.value]))
                break
            case "option3":
                dispatch(editQuizActions.setChoiceOption(["option3", event.target.value]))
                break
            case "option4":
                dispatch(editQuizActions.setChoiceOption(["option4", event.target.value]))
                break
        }
    }

    const onCorrectAnswerChange = (event: any) => {
        if (questionType === QuestionType.Boolean) {
            if (event.target.id === "true") {
                dispatch(editQuizActions.setCorrectAnswer("true"))
            } else {
                dispatch(editQuizActions.setCorrectAnswer("false"))
            }
        } else {
            console.log(event.target)
            const radioValue = event.target.value 
            const answer = choiceOptions[radioValue]

            dispatch(editQuizActions.setCorrectAnswer(answer))
        }
    }


    const addQuestion = () => {
        // TODO: Validation
        const requestData: any = {
            quizId: quizId,
            questionData: {
                question: question,
                correctAnswer: correctAnswer,
                questionType: questionType.toString(),
            }
        }
        
        if (questionType === QuestionType.Choice) {
            requestData.questionData.options = Object.values(choiceOptions)
        } else {
            requestData.questionData.options = [true, false]
        }


        dispatch(editQuizAsyncActions.addQuestion(requestData))
    }

    return <div className="absolute flex w-full h-full top-0 left-0 items-center justify-center backdrop-blur-sm">
        <div className="flex flex-col min-w-[400px] min-h-[300px] items-center p-4 rounded-md shadow-md bg-l_backgroundLight dark:bg-d_backgroundLight gap-4">
            <p>Add a new question</p>

            <TextField title="Quiz title" placeholder="Type a question..." icon={null} onChange={(e) => dispatch(editQuizActions.setQuestion(e.target.value))} noLabel />

            {/* TODO: Radio button styles */}
            <div className="flex gap-4">
                <div className="flex gap-2">
                    <input id="choice" defaultChecked name="qType" type="radio" onChange={onTypeChange} />
                    <p>Choice</p>
                </div>

                <div className="flex gap-2">
                    <input id="boolean" name="qType" type="radio" onChange={onTypeChange} />
                    <p>Boolean</p>
                </div>
            </div>


            {
                questionType === QuestionType.Choice
                && <div className="w-[150px] flex flex-col gap-4">
                    <OptionField placeholder="Option 1" onChange={onChoiceChange} onSelected={onCorrectAnswerChange} inputId="option1" groupName="option" />
                    <OptionField placeholder="Option 2" onChange={onChoiceChange} onSelected={onCorrectAnswerChange} inputId="option2" groupName="option" />
                    <OptionField placeholder="Option 3" onChange={onChoiceChange} onSelected={onCorrectAnswerChange}inputId="option3" groupName="option" />
                    <OptionField placeholder="Option 4" onChange={onChoiceChange} onSelected={onCorrectAnswerChange} inputId="option4" groupName="option" />
                </div>
            }

            {
                questionType === QuestionType.Boolean
                && <div className="w-[100px] flex gap-4">
                    <div className="flex gap-2">
                        <input defaultChecked id="true" name="boolOption" type="radio" onChange={onCorrectAnswerChange} />
                        <p>True</p>
                    </div>
                    <div className="flex gap-2">
                        <input id="false" name="boolOption" type="radio" onChange={onCorrectAnswerChange} />
                        <p>False</p>
                    </div>
                </div>
            }


            <p className="mt-auto"></p>
            <Button text="Add" clickHandler={addQuestion} variant="filled" />
            <TextButton text="Cancel" clickHandler={() => { dispatch(editQuizActions.setShowAddDialog(false)) }} />
        </div>
    </div>
}

export default AddQuestionDialog