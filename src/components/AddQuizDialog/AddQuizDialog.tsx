import { FC, useRef } from "react"
import Button from "../reusable/Button"
import TextButton from "../reusable/TextButton"
import TextField from "../reusable/TextField"
import { useAppDispatch, useAppSelector } from "../../types/hooks"
import { manageQuizActions, manageQuizAsyncActions } from "../../slices/manageQuizSlice"


const AddQuizDialog: FC = () => {
    const dispatch = useAppDispatch()
    const titleRef = useRef<any>(null)

    const addQuiz = () => {
        if (titleRef.current.value === "") return

        dispatch(manageQuizAsyncActions.addQuiz(titleRef.current.value))
    }


    return <div className="absolute flex w-full h-full top-0 left-0 items-center justify-center backdrop-blur-sm">
        <div className="flex flex-col min-w-[400px] min-h-[300px] items-center p-4 rounded-md shadow-md bg-l_backgroundLight dark:bg-d_backgroundLight gap-4">
            <p>Create a new quiz</p>
            
            <TextField title="Quiz title" placeholder="Javascript Trivia..." icon={null} inputRef={titleRef} noLabel/>

            <p className="mt-auto"></p>
            <Button text="Create" clickHandler={addQuiz} variant="filled"/>
            <TextButton text="Cancel" clickHandler={() => {dispatch(manageQuizActions.setShouldShowAdd(false))}}/>
        </div>
    </div>
}

export default AddQuizDialog