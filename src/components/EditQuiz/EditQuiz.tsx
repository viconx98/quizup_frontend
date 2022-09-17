import { FC, useEffect } from "react";
import { editQuizActions, editQuizAsyncActions } from "../../slices/editQuizSlice";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import TextButton from "../reusable/TextButton";
import AddQuestionDialog from "../AddQuestionDialog/AddQuestionDialog";
import QuestionCard from "../QuestionCard/QuestionCard";
import DeleteQuestionDialog from "../DeleteQuestionDialog/DeleteQuestionDialog";

// TODO: Clear dialog states when the dialog closes
// TODO: Clear dialog states when the question type changes
const EditQuiz: FC = () => {
    const { quizId, quiz, isLoading, shouldShowAdd, shouldShowDelete } = useAppSelector(state => state.editQuiz)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(editQuizAsyncActions.loadQuiz(quizId!))
    }, [])

    const showAddDialog = () => {
        dispatch(editQuizActions.setShowAddDialog(true))
    }

    return <div className="w-full flex h-[100%] flex-col">
        {shouldShowAdd && <AddQuestionDialog />}
        {shouldShowDelete && <DeleteQuestionDialog />}
        
        {
            (isLoading || quiz === null)
                ? <div className="w-full h-[300px] flex items-center justify-center">
                    <p className="text-xl">Loading Quiz</p>
                </div>

                : <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-center">
                        <p className="text-xl">Editing - {quiz.title}</p>
                        {quiz.questions.length > 0 && <TextButton text="Add a question" clickHandler={showAddDialog} />}
                    </div>

                    {
                        quiz.questions.length === 0
                            ? <div className="flex flex-col flex-1 justify-center items-center ">
                                <div className="flex flex-col w-fit p-8 items-center gap-8 rounded-md border-2 border-primary-500 border-dotted">
                                    <p className="text-2xl">This quiz has no questions</p>
                                    <TextButton text="Add a question!" clickHandler={showAddDialog} />
                                </div>
                            </div>
                            : <div className="flex flex-col mt-4 gap-4">
                                {
                                    quiz.questions.map(question => <QuestionCard question={question} />)
                                }
                            </div>
                    }
                </div>
        }
    </div>
}

export default EditQuiz
