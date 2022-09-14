import { useAppDispatch, useAppSelector } from "../../types/hooks"
import Button from "../reusable/Button"
import TextButton from "../reusable/TextButton"
import { MdMode, MdDelete, MdPlayCircleFilled } from "react-icons/md"
import IconButton from "../reusable/IconButton"
import Quiz from "../Quiz/Quiz"

export default function MyQuizzes() {
    const { quizzes, isError, error, isLoading, loading } = useAppSelector(state => state.myQuizzes)

    return <div className="flex flex-col h-[100%] bg-l_background dark:bg-d_background">
        {
            isLoading
                ? <div className="flex flex-1 justify-center items-center">
                    Loading quizzes
                </div>
                : <div className="flex flex-col flex-1">
                    {
                        quizzes.length !== 0
                            ? <div className="flex flex-col items-center w-full text-center m-4">
                                <p className="text-2xl">You have no quizzes</p>
                                <TextButton text="Create a quiz!" clickHandler={() => { }} />
                            </div>
                            : <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <p>Your quizzes</p>
                                    <Button clickHandler={() => { }} variant="filled" text="Add Quiz" />
                                </div>

                                <div className="flex flex-wrap gap-4 mt-4">
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    <Quiz quiz={{author: "test", questions: [], title: "Test quiz"}}/>
                                    
                                </div>
                            </div>
                    }
                </div>
        }
    </div>
}