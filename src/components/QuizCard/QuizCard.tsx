import { MdMode, MdDelete, MdPlayCircleFilled } from "react-icons/md"
import { Quiz } from "../../types/myquizzes"
import IconButton from "../reusable/IconButton"
import { FC } from "react"
import { useAppDispatch } from "../../types/hooks"
import { manageQuizActions } from "../../slices/manageQuizSlice"
import { editQuizActions } from "../../slices/editQuizSlice"
import { useNavigate } from "react-router-dom"

export interface QuizProps {
    quiz: Quiz
}

const QuizCard: FC<QuizProps> = ({quiz}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const showDeleteDialog = () => {
        dispatch(manageQuizActions.setQuizToDelete(quiz._id))
        dispatch(manageQuizActions.setShouldShowDelete(true))
    }

    const editQuiz = () => {
        dispatch(editQuizActions.setQuizId(quiz._id))
        navigate("/edit")
    }

    return <div className="flex gap-4 p-4 min-w-fit max-w-sm bg-l_backgroundLight dark:bg-d_backgroundLight rounded-md shadow-md">
        <div className="w-[100px] h-[100px] bg-red-400 rounded-md overflow-hidden">
            {/* TODO: Maybe add image */}
        </div>

        <div className="flex flex-col gap-2">
            <p className="text-xl">{quiz.title}</p>

            {
                quiz.questions.length === 0
                    ? <p className="text-l_textLight">This quiz has no questions</p>
                    : <p>{quiz.questions.length} Questions</p>
            }

            <div className="flex gap-4">
                <IconButton disabled={quiz.questions.length === 0} icon={<MdPlayCircleFilled/>}/>
                <IconButton icon={<MdMode/>} clickHandler={editQuiz}/>
                <IconButton icon={<MdDelete/>} clickHandler={showDeleteDialog}/>
            </div>
        </div>
    </div>
} 

export default QuizCard

