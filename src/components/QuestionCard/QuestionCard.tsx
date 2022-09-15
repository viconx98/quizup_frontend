import { FC, useEffect } from "react";
import { BsFillDice2Fill, BsFillDice4Fill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Question, QuestionType } from "../../types/myquizzes";
import IconButton from "../reusable/IconButton";
import { useAppDispatch, useAppSelector } from "../../types/hooks"
import { editQuizActions } from "../../slices/editQuizSlice";

interface QuestionProps {
    question: Question
}

const QuestionCard: FC<QuestionProps> = ({ question }) => {
    const dispatch = useAppDispatch()

    const deleteQuestion = () => {
        dispatch(editQuizActions.setQuestionToDelete(question._id))
        dispatch(editQuizActions.setShowDeleteDialog(true))
    }

    return <div className="flex p-4 gap-4 rounded-md shadow-md bg-l_backgroundLight dark:bg-d_backgroundLight">
        {
            question.questionType === QuestionType.Boolean
                ? <BsFillDice2Fill size={24} />
                : <BsFillDice4Fill size={24} />
        }
        <div className="w-[100px] h-[100px] bg-primary-500 rounded-md">
        </div>
        <div className="flex flex-col gap-4 justify-between">
            <p className="text-lg">{question.question}</p>

            <div className="flex gap-4">
                {
                    question.options.map(option => {
                        const color = option === question.correctAnswer ? "bg-green-500/25" : "bg-red-500/25"

                        return <p className={`p-2 ${color} rounded-md`}>{option}</p>
                    })
                }

            </div>
        </div>

        <div className="ml-auto">
            <IconButton icon={<MdDelete />} clickHandler={deleteQuestion} />
        </div>
    </div>
}

export default QuestionCard