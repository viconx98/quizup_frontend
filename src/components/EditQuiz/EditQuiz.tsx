import { FC, useEffect } from "react";
import { editQuizAsyncActions } from "../../slices/editQuizSlice";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import TextButton from "../reusable/TextButton";
import { MdMode, MdDelete, MdPlayCircleFilled } from "react-icons/md"
import IconButton from "../reusable/IconButton";
import { BsFillDice2Fill, BsFillDice4Fill, BsDot } from "react-icons/bs"

const EditQuiz: FC = () => {
    const { quizId, quiz, isLoading } = useAppSelector(state => state.editQuiz)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(editQuizAsyncActions.loadQuiz(quizId!))
    }, [])

    return <div className="w-full flex flex-col">
        {
            (isLoading || quiz === null)
                ? <div className="w-full h-[300px] flex items-center justify-center">
                    <p className="text-xl">Loading Quiz</p>
                </div>
                : <div className="">
                    <p className="text-xl">Editing - Quiz Title</p>

                    {
                        !!!true
                            ? <div className="flex flex-col items-center mt-8">
                                <p>This quiz doesn't have any questions</p>
                                <TextButton text="Add a question!" clickHandler={() => { }} />
                            </div>
                            : <div className="flex flex-col mt-4">
                                <div className="flex p-4 gap-4 rounded-md shadow-md bg-l_backgroundLight dark:bg-d_backgroundLight">
                                    <BsFillDice2Fill size={24}/>
                                    {/* <BsFillDice4Fill size={24}/> */}
                                    <div className="w-[100px] h-[100px] bg-primary-500 rounded-md">
                                    </div>
                                    <div className="flex flex-col gap-4 justify-between">
                                        <p className="text-lg">What is blah blah blah?</p>

                                        <div className="flex gap-4">
                                            <p className="p-2 bg-green-500/25 rounded-md">Option 1</p>
                                            <p className="p-2 bg-red-500/25 rounded-md">Option 2</p>
                                            <p className="p-2 bg-red-500/25 rounded-md">Option 3</p>
                                            <p className="p-2 bg-red-500/25 rounded-md">Option 4</p>
                                        </div>
                                    </div>

                                    <div className="ml-auto">
                                        <IconButton icon={<MdDelete />} clickHandler={() => { }} />
                                    </div>
                                </div>
                            </div>
                    }
                </div>
        }
    </div>
}

export default EditQuiz