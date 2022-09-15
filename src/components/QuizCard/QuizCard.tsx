import { MdMode, MdDelete, MdPlayCircleFilled } from "react-icons/md"
import { Quiz } from "../../types/myquizzes"
import IconButton from "../reusable/IconButton"
import { FC } from "react"
import { useAppDispatch } from "../../types/hooks"
import { manageQuizActions } from "../../slices/manageQuizSlice"
import { editQuizActions } from "../../slices/editQuizSlice"
import { Link, useNavigate } from "react-router-dom"
import { IconContext } from "react-icons"

export interface QuizProps {
    quiz: Quiz
}

const QuizCard: FC<QuizProps> = ({ quiz }) => {
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

    const startQuiz = () => {
        navigate("/run/" + quiz._id, { replace: false })
    }

    const disabled = quiz.questions.length === 0
    const iconStyle = disabled ? "text-l_textLight" : "text-primary-500"
    const divStyle = disabled ? "p-2 rounded-full transition-all" : "cursor-pointer p-2 rounded-full transition-all hover:bg-primary-500/25"


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
                {
                    disabled
                        ? <div className={divStyle}>
                            <IconContext.Provider value={{ size: "24", className: iconStyle }} >
                                <MdPlayCircleFilled />
                            </IconContext.Provider>
                        </div>
                        : <Link to={"/run/" + quiz._id} target="_blank">
                            <div className={divStyle}>
                                <IconContext.Provider value={{ size: "24", className: iconStyle }} >
                                    <MdPlayCircleFilled />
                                </IconContext.Provider>
                            </div>
                        </Link>
                }
                {/* <IconButton disabled={quiz.questions.length === 0} icon={<MdPlayCircleFilled />} clickHandler={startQuiz} /> */}
                <IconButton icon={<MdMode />} clickHandler={editQuiz} />
                <IconButton icon={<MdDelete />} clickHandler={showDeleteDialog} />
            </div>
        </div>
    </div>
}

export default QuizCard

