import { useAppDispatch, useAppSelector } from "../../types/hooks"
import Button from "../reusable/Button"
import TextButton from "../reusable/TextButton"
import QuizCard from "../QuizCard/QuizCard"
import AddQuizDialog from "../AddQuizDialog/AddQuizDialog"
import { useEffect } from "react"
import { myQuizzesAsyncActions } from "../../slices/myQuizzesSlice"
import { manageQuizActions } from "../../slices/manageQuizSlice"
import DeleteQuizDialog from "../DeleteQuizDialog/DeleteQuizDialog"


export default function MyQuizzes() {
    const dispatch = useAppDispatch()
    const { quizzes, isError, error, isLoading, loading } = useAppSelector(state => state.myQuizzes)
    const { shouldShowAdd, shouldShowDelete } = useAppSelector(state => state.manageQuiz)


    useEffect(() => {
        dispatch(myQuizzesAsyncActions.fetchQuizzes())
    }, [])

    const showAddDialog = () => {
        dispatch(manageQuizActions.setShouldShowAdd(true))
    }

    return <div className="flex flex-col h-[100%] bg-l_background dark:bg-d_background">
        {shouldShowAdd && <AddQuizDialog />}
        {shouldShowDelete && <DeleteQuizDialog />}
        {
            isLoading
                ? <div className="flex flex-1 justify-center items-center">
                    Loading quizzes
                </div>
                : <div className="flex flex-col flex-1">
                    {
                        quizzes.length === 0
                            ? <div className="flex flex-col items-center w-full text-center m-4">
                                <p className="text-2xl">You have no quizzes</p>
                                <TextButton text="Create your first quiz!" clickHandler={showAddDialog} />
                            </div>
                            : <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <p>Your quizzes</p>
                                    <TextButton clickHandler={showAddDialog}  text="Add Quiz" />
                                </div>

                                <div className="flex flex-wrap gap-4 mt-4">
                                    {
                                        quizzes.map(quiz => <QuizCard quiz={quiz} />)
                                    }
                                </div>
                            </div>
                    }
                </div>
        }
    </div>
}