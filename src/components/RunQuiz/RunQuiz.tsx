import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { runQuizActions } from "../../slices/runQuizSlice";
import { Events } from "../../types/events";
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import io, { Socket } from "socket.io-client"
import Button from "../reusable/Button";

const RunQuiz: FC = () => {
    const dispatch = useAppDispatch()
    const { quizId, quizRoom, socketConnected } = useAppSelector(state => state.runQuiz)
    const { user } = useAppSelector(state => state.auth)

    const [socket, setSocket] = useState<Socket | null>(null)

    const params = useParams()

    // TODO: Validation for invalid quizId
    useEffect(() => {
        console.log("useEffect")
        dispatch(runQuizActions.setQuizId(params.quizId!))

        let tempSocket = io("http://localhost:3001")

        tempSocket.on("connect", () => {
            try {
                dispatch(runQuizActions.setSocketConnected(true))
            } catch (err) {
                console.log(err)
            }
        })

        tempSocket.on("connect_error", () => {
            console.log("Run Quiz Error")
        })

        setSocket(tempSocket)

        return () => {
            if (socket !== null) {
                socket.off("connect")
                socket.off("connect_error")
            }
            tempSocket!.off("connect_error")
            tempSocket.off("connect")
        }
    }, [])

    useEffect(() => {
        console.log("useEffect [socketConnected]")

        if (quizId !== "") {
            if (socketConnected && socket !== null) {
                const requestData = {
                    adminId: user?.user.id,
                    quizId: quizId
                }

                socket.emit(Events.RunQuiz, requestData)

                socket.on(Events.QuizCreated, (data) => {
                    console.log("Events.QuizCreated")
                    dispatch(runQuizActions.setQuizRoom(data))
                })

                socket.on(Events.PlayerJoined, (data) => {
                    console.log("Events.PlayerJoined")
                    dispatch(runQuizActions.setQuizRoom(data))
                })

                socket.on(Events.QuizStarted, (data) => {
                    console.log("Events.QuizStarted", data)
                    dispatch(runQuizActions.setQuizRoom(data))
                })

                socket.on(Events.AnswerSubmitted, (data) => {
                    console.log("Events.AnswerSubmitted", data)
                    dispatch(runQuizActions.setQuizRoom(data))
                })

                socket.on(Events.QuizCompleted, (data) => {
                    dispatch(runQuizActions.setQuizRoom(data))
                })
            }
        }

        return () => {
            console.log("useEffect [socketConnected] cleanup")
            if (socket !== null) {
                socket.off(Events.RunQuiz)
                socket.off(Events.QuizCreated)
                socket.off(Events.PlayerJoined)
                socket.off(Events.QuizStarted)
                socket.off(Events.QuizCompleted)
            }
        }
    }, [socketConnected])

    const startQuiz = () => {
        socket!.emit(Events.StartQuiz, quizRoom?.pin)
    }

    const getAnswerCount = (answer: string, questionId: string) => {
        const answers = quizRoom!.answerData[questionId]
        let count = 0

        for (const ans of Object.values(answers)) {
            if (ans === answer) count++
        }

        return count
    }

    const nextQuestion = () => {
        socket?.emit(Events.NextQuestion, quizRoom?.pin)
    }

    const renderQuiz = () => {
        switch (quizRoom?.status) {
            case "waiting":
                return <div className="flex flex-col w-full min-h-screen p-4 gap-2 justify-start items-center bg-l_background dark:bg-d_background">
                    <p className="text-2xl px-4 py-2 rounded-md bg-primary-600">
                        {quizRoom.quiz.title}
                    </p>

                    <div>Waiting for players to join</div>

                    <div className="flex gap-4 p-4 w-full flex-1">
                        <div className="flex flex-col flex-1 bg-l_backgroundLight dark:bg-d_backgroundLight p-4 rounded-md shadow-md">
                            <p>Players</p>
                            <div className="flex flex-col gap-4">
                            {
                                quizRoom.players.map(player => {
                                    return <div className="flex gap-4 p-2 items-center rounded-md bg-l_backgroundLighter dark:bg-d_backgroundLighter">
                                        <img src={player.avatar} alt="player avatar" className="h-[32px] w-[32px]" />
                                        <p>{player.username}</p>
                                    </div>
                                })
                            }
                            </div>
                        </div>

                        <div className="flex flex-col flex-1 justify-center  bg-l_backgroundLight dark:bg-d_backgroundLight p-4 rounded-md shadow-md">

                            <div className="flex flex-col flex-1 p-4">
                                <div className="flex-1 h-full">
                                    <p>dfdsfdsf</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-evenly flex-1 p-4">
                                <p>Share this game pin <span className="text-3xl italic p-2 bg-primary-600/25 rounded-md shadow-md">{quizRoom.pin}</span>
                                </p>
                                <p>Or</p>
                                <p>This link <Link to={"/play?pin=" + quizRoom.pin} target="_blank" className="text-2xl text-primary-500">
                                    {"http://localhost:3000" + "/play?pin=" + quizRoom.pin}
                                </Link></p>
                            </div>

                        </div>
                    </div>

                    {quizRoom.players.length > 0 && <Button text="Start Quiz" clickHandler={startQuiz} variant="filled" />}
                </div>
            case "playing":
                return <div className="w-full min-h-screen justify-start items-center">
                    <p>{quizRoom.quiz.questions[quizRoom.currentIndex].question}</p>

                    <p>{quizRoom.quiz.questions[quizRoom.currentIndex].options.map(opt => {

                        return <p>{opt} {getAnswerCount(opt, quizRoom.quiz.questions[quizRoom.currentIndex]._id)}</p>
                    })}</p>

                    <Button variant="filled" text="Next Question" clickHandler={nextQuestion} />
                </div>
            case "completed":
                return <div>Waiting</div>
        }

        return <h1>Everything went wrong</h1>
    }

    console.log("RunQuiz render")
    return <div className="w-full min-h-screen bg-l_background dark:bg-d_background">
        {
            socketConnected
                ? renderQuiz()
                : "Setting things up"
        }
    </div>
}

export default RunQuiz