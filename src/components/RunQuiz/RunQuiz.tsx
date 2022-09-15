import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { runQuizActions } from "../../slices/runQuizSlice";
import { Events } from "../../types/events";
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import io from "socket.io-client"
import Button from "../reusable/Button";

const socket = io("http://localhost:3001")

const RunQuiz: FC = () => {
    const dispatch = useAppDispatch()
    const { quizId, quizRoom } = useAppSelector(state => state.runQuiz)
    const { user } = useAppSelector(state => state.auth)

    const params = useParams()

    // TODO: Validation for invalid quizId
    useEffect(() => {
        dispatch(runQuizActions.setQuizId(params.quizId!))
    }, [])

    useEffect(() => {
        if (quizId !== "") {
            console.log('emit')
            const requestData = {
                adminId: user?.user.id,
                quizId: quizId
            }
            socket.emit(Events.RunQuiz, requestData)

            socket.on(Events.QuizCreated, (data) => {
                dispatch(runQuizActions.setQuizRoom(data))
            })
            
            socket.on(Events.PlayerJoined, (data) => {
                console.log(data)
                dispatch(runQuizActions.setQuizRoom(data))
            })
        }
    }, [quizId])

    const startQuiz = () => {
        socket.emit(Events.StartQuiz, quizRoom?.pin)
    }

    const renderQuiz = () => {
        switch (quizRoom?.status) {
            case "waiting":
                return <div className="flex flex-col w-full min-h-screen justify-center items-center bg-l_background dark:bg-d_background">
                    <div>Waiting for players to join</div> 

                    <div className="flex gap-4">
                        <div className="flex flex-col justify-center items-center w-[200px] h-[200px] bg-l_backgroundLight dark:bg-d_backgroundLight p-4 rounded-md shadow-md">
                            {
                                quizRoom.players.map(player => <p>{player.username}</p>)
                            }
                        </div>

                        <div className="flex justify-center items-center w-[200px] h-[200px] bg-l_backgroundLight dark:bg-d_backgroundLight p-4 rounded-md shadow-md">
                            Gamepin: {quizRoom.pin}
                        </div>
                    </div>

                    {quizRoom.players.length > 0 && <Button text="Start Quiz" clickHandler={startQuiz} variant="filled"/>}
                </div>
            case "playing":
                return <div>Waiting</div>
            case "completed":
                return <div>Waiting</div>
        }

        return <h1>Everything went wrong</h1>
    }

    return <div className="w-full min-h-screen bg-l_background dark:bg-d_background">
        {renderQuiz()}
    </div>
}

export default RunQuiz