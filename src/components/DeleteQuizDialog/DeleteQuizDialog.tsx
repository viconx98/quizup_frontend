import { FC, useRef } from "react"
import Button from "../reusable/Button"
import TextButton from "../reusable/TextButton"
import TextField from "../reusable/TextField"
import { useAppDispatch, useAppSelector } from "../../types/hooks"
import { manageQuizActions, manageQuizAsyncActions } from "../../slices/manageQuizSlice"


const AddQuizDialog: FC = () => {
    const dispatch = useAppDispatch()
    const { quizToDelete } = useAppSelector(state => state.manageQuiz)

    return <div className="absolute flex w-full h-full top-0 left-0 items-center justify-center backdrop-blur-sm">
        <div className="flex flex-col min-w-[400px] max-w-[400px] min-h-[200px] items-center p-4 rounded-md shadow-md bg-l_backgroundLight dark:bg-d_backgroundLight gap-4">
            <p className="font-bold">Delete Quiz</p>
            <p className="text-lg">Are you sure you want to delete this quiz? This action is irreversible!</p>

            <p className="mt-auto"></p>
            <div className="flex gap-4">
                <TextButton text="Delete" clickHandler={() => { dispatch(manageQuizAsyncActions.deleteQuiz(quizToDelete)) }} />
                <TextButton text="Cancel" clickHandler={() => { dispatch(manageQuizActions.setShouldShowDelete(false)) }} />
            </div>
        </div>
    </div>
}

export default AddQuizDialog