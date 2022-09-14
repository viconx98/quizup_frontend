import { MdMode, MdDelete, MdPlayCircleFilled } from "react-icons/md"
import { Quiz as QuizType } from "../../types/myquizzes"
import IconButton from "../reusable/IconButton"
import { FC } from "react"

export interface QuizProps {
    quiz: QuizType
}

const Quiz: FC<QuizProps> = ({quiz}) => {
    return <div className="flex gap-4 p-4 min-w-fit max-w-sm bg-l_backgroundLight dark:bg-l_backgroundLight rounded-md shadow-md">
        <div className="w-[100px] h-[100px] bg-red-400 rounded-md overflow-hidden">
            {/* TODO: Maybe image */}
        </div>

        <div className="flex flex-col gap-2">
            <p className="text-xl">{quiz.title}</p>

            {
                quiz.questions.length === 0
                    ? <p className="text-l_textLight">This quiz has no questions</p>
                    : <p>{quiz.questions.length} Questions</p>
            }

            <div className="flex gap-4">
                <IconButton icon={<MdPlayCircleFilled/>}/>
                <IconButton icon={<MdMode/>}/>
                <IconButton icon={<MdDelete/>}/>
            </div>
        </div>
    </div>
} 

export default Quiz

