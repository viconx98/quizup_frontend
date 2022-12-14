import { FC, useEffect, useRef } from "react"
import Button from "../reusable/Button"
import TextButton from "../reusable/TextButton"
import TextField from "../reusable/TextField"
import { useAppDispatch, useAppSelector } from "../../types/hooks"
import { QuestionType } from "../../types/myquizzes"
import { editQuizActions, editQuizAsyncActions } from "../../slices/editQuizSlice"
import OptionField from "../reusable/OptionField"
import * as Yup from "yup"
import { MdImage, MdDelete } from "react-icons/md"

const choiceQuestionValidation = Yup.object().shape({
    quizId: Yup.string()
        .required("Something went wrong while adding the question. Please try again."),

    questionData: Yup.object().shape({
        question: Yup.string()
            .test(
                "empty-string",
                "Please enter a question",
                (question) => {
                    return question !== undefined && question.trim().length >= 1
                }
            )
            .required("Please enter a question"),
        correctAnswer: Yup.string()
            .required("Please pick a correct answer"),
        options: Yup.array()
            .test(
                "number-of-options",
                "Please pick all four options",
                (options) => options?.length === 4 && options?.every(opt => opt.trim().length >= 1)
            )
            .required("Please pick the options")
    }),


})

const booleanQuestionValidation = Yup.object().shape({
    quizId: Yup.string()
        .required("Something went wrong while adding the question. Please try again."),

    questionData: Yup.object().shape({
        question: Yup.string()
            .test(
                "empty-string",
                "Please enter a question",
                (question) => {
                    return question !== undefined && question.trim().length >= 1
                }
            )
            .required("Please enter a question"),
        correctAnswer: Yup.string()
            .required("Please pick a correct answer"),
    })
})


const AddQuestionDialog: FC = () => {
    const dispatch = useAppDispatch()
    const { quizId, questionType, choiceOptions, correctAnswer, question, image, isUploadingImage, isError, error } = useAppSelector(state => state.editQuiz)


    useEffect(() => {
        return () => {
            dispatch(editQuizActions.resetAddDialog())
        }
    }, [])

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


    const addQuestion = async () => {
        const requestData: any = {
            quizId: quizId,
            questionData: {
                question: question,
                correctAnswer: correctAnswer,
                questionType: questionType.toString(),
            }
        }

        if (image !== null) {
            requestData.questionData.image = image
        }

        if (questionType === QuestionType.Choice) {
            requestData.questionData.options = Object.values(choiceOptions)
        } else {
            requestData.questionData.options = [true, false]
        }

        try {
            questionType === QuestionType.Choice
                ? await choiceQuestionValidation.validate(requestData)
                : await booleanQuestionValidation.validate(requestData)


            dispatch(editQuizAsyncActions.addQuestion(requestData))

        } catch (error: any) {
            dispatch(editQuizActions.setError([true, error.message]))
        }
    }

    const uploadImage = (event: any) => {
        if (isUploadingImage) return

        const formData = new FormData()
        formData.append("image", event.target.files[0])

        dispatch(editQuizAsyncActions.uploadQuestionImage(formData))

    }

    const removeImage = (event: any) => {
        dispatch(editQuizActions.removeImage())
    }

    return <div className="absolute flex w-full h-full top-0 left-0 items-center justify-center backdrop-blur-sm">
        <div className="flex flex-col min-w-[400px] min-h-[300px] items-center p-4 rounded-md shadow-md bg-l_backgroundLight dark:bg-d_backgroundLight gap-4">
            <p>Add a new question</p>

            <div className="flex flex-col gap-4 items-center">
                {
                    image === null
                    && <div>
                        <label htmlFor="questionImage" className="flex  items-center gap-2 bg-primary-600/50 p-2 rounded-md cursor-pointer">
                            <MdImage />
                            <p>Pick an image</p>
                        </label>
                        <input id="questionImage" className="hidden" type="file" accept="image/*" onChange={uploadImage} />
                    </div>
                }
                {
                    image
                    && <div className="flex gap-4 items-center" >
                        <img src={image} alt="" className="h-[100px] w-[100px] rounded-md" />
                        <MdDelete size={24} className="cursor-pointer" onClick={removeImage} />
                    </div>
                }
            </div>

            <TextField title="Quiz title" placeholder="Type a question..." icon={null} onChange={(e) => dispatch(editQuizActions.setQuestion(e.target.value))} noLabel />

            {/* TODO: Radio button styles */}
            <div className="flex gap-4">
                <div className="flex gap-2">
                    <input id="choice" defaultChecked name="qType" type="radio" onChange={onTypeChange} />
                    <p className="text-xl">Choice</p>
                </div>

                <div className="flex gap-2">
                    <input id="boolean" name="qType" type="radio" onChange={onTypeChange} />
                    <p className="text-xl">Boolean</p>
                </div>
            </div>


            {
                questionType === QuestionType.Choice
                && <div className="w-fit flex flex-col gap-4">
                    <div className="flex gap-4">
                        <OptionField placeholder="Option 1" onChange={onChoiceChange} onSelected={onCorrectAnswerChange} inputId="option1" groupName="option" />
                        <OptionField placeholder="Option 2" onChange={onChoiceChange} onSelected={onCorrectAnswerChange} inputId="option2" groupName="option" />

                    </div>

                    <div className="flex gap-4">
                        <OptionField placeholder="Option 3" onChange={onChoiceChange} onSelected={onCorrectAnswerChange} inputId="option3" groupName="option" />
                        <OptionField placeholder="Option 4" onChange={onChoiceChange} onSelected={onCorrectAnswerChange} inputId="option4" groupName="option" />
                    </div>
                </div>
            }

            {
                questionType === QuestionType.Boolean
                && <div className="w-fit flex gap-4">
                    <div className="flex gap-2">
                        <input defaultChecked id="true" name="boolOption" type="radio" onChange={onCorrectAnswerChange} />
                        <p className="text-xl">True</p>
                    </div>
                    <div className="flex gap-2">
                        <input id="false" name="boolOption" type="radio" onChange={onCorrectAnswerChange} />
                        <p className="text-xl">False</p>
                    </div>
                </div>
            }


            <p className="mt-auto">

            </p>
            {isError && <p className="text-red-500">{error}</p>}
            <Button text="Add" clickHandler={addQuestion} variant="filled" />
            <TextButton text="Cancel" clickHandler={() => { dispatch(editQuizActions.setShowAddDialog(false)) }} />
        </div>
    </div>
}

export default AddQuestionDialog