import { FC, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState } from "react"
import { IoMdMoon, IoMdSunny } from "react-icons/io"
import { useSearchParams } from "react-router-dom"
import io, { Socket } from "socket.io-client"
import { playQuizActions } from "../../slices/playQuizSlice"
import { uiActions } from "../../slices/uiSlice"
import { Events } from "../../types/events"
import { useAppDispatch, useAppSelector } from "../../types/hooks"
import AppLogo from "../AppLogo/AppLogo"
import Button from "../reusable/Button"
import TextField from "../reusable/TextField"

const PlayQuiz: FC = () => {
    const [defultPin, setDefaultPin] = useState("")
    const [socket, setSocket] = useState<Socket | null>(null)

    const nameRef = useRef<any>(null)
    const pinRef = useRef<any>(null)

    const dispatch = useAppDispatch()

    const [searchParams] = useSearchParams()

    const { status, socketConnected, question, data, pickedAnswer, disableAnswers, completedQuiz } = useAppSelector(state => state.playQuiz)
    const { isDarkTheme } = useAppSelector(state => state.ui)

    useEffect(() => {
        const pin = searchParams.get("pin")
        if (pin !== undefined && pin !== null) {
            setDefaultPin(pin)
        }

        let tempSocket = io("http://localhost:3001")

        tempSocket.on("connect", () => {
            dispatch(playQuizActions.setSocketConnected(true))
        })

        tempSocket.on("connect_error", () => {
            console.log("Play Quiz Error")
        })

        setSocket(tempSocket)

        return () => {
            if (socket !== null) socket.off("connect")
            tempSocket.off("connect")
        }
    }, [])

    useEffect(() => {
        if (socketConnected && socket !== null) {
            socket.on(Events.QuizJoined, (data) => {
                dispatch(playQuizActions.setStatus("waiting"))
                dispatch(playQuizActions.setData(data))
            })

            socket.on(Events.QuizStarted, (data) => {
                dispatch(playQuizActions.setStatus("playing"))
                dispatch(playQuizActions.setQuestion(data.question))
            })

            socket.on(Events.QuizCompleted, (data) => {
                console.log("completed")
                dispatch(playQuizActions.setStatus("completed"))
                dispatch(playQuizActions.setCompletedQuiz(data))
            })

            socket.on(Events.AnswerSubmitted, (data) => {
                dispatch(playQuizActions.setDisableAnswers(true))
            })

            socket.on(Events.NewQuestion, (data) => {
                dispatch(playQuizActions.setDisableAnswers(false))
                dispatch(playQuizActions.setPickedAnswer(""))
                dispatch(playQuizActions.setQuestion(data.question))
            })
        }

        return () => {
            if (socket !== null) {
                socket.off(Events.QuizJoined)
                socket.off(Events.QuizStarted)
                socket.off(Events.QuizCompleted)
                socket.off(Events.AnswerSubmitted)
            }
        }
    }, [socketConnected])

    const joinQuiz = () => {
        const username = nameRef.current.value
        if (username === "") return

        socket!.emit(Events.JoinQuiz, {
            username: username,
            roomPin: pinRef.current.value
        })
    }

    const submitAnswer = (answer: string) => {
        const answerData: any = {
            roomPin: data.roomPin,
            questionId: question._id,
            answer: answer,
            playerId: data.player.socketId
        }

        socket?.emit(Events.SubmitAnswer, answerData)
        dispatch(playQuizActions.setPickedAnswer(answer))
    }

    const findQuestionById = (questionId: string) => {
        return completedQuiz.quiz.questions.find((que: any) => que._id === questionId)
    }

    const countCorrectAnswers = () => {
        const playerId = data.player.socketId
        let count = 0

        const answerData = completedQuiz.answerData
        for (const questionId in answerData) {
            const playersAnswer = answerData[questionId][playerId]
            const question = findQuestionById(questionId)

            if (playersAnswer === question.correctAnswer) {
                count++
            }
        }

        return count
    }

    const renderQuiz = () => {
        switch (status) {
            case "join":
                return <div className="w-[300px] h-fit flex flex-col items-center p-4 gap-4 bg-l_backgroundLight dark:bg-d_backgroundLight">
                    <AppLogo />
                    <TextField inputRef={nameRef} title="Game pin" noLabel placeholder="Name" />
                    <TextField defaultValue={defultPin} inputRef={pinRef} title="Game pin" noLabel placeholder="Game pin" />
                    <Button text="Join" variant="filled" clickHandler={joinQuiz} />
                </div>
            case "waiting":
                return <div className="w-fit h-fit flex flex-col items-center p-4 gap-4 bg-l_backgroundLight dark:bg-d_backgroundLight rounded-md">
                    <img src={data.player.avatar} className="h-[128px] w-[128px]" alt="" />
                    <p className="text-2xl">{data.player.username}</p>
                    <p className="text-gray-500">Waiting for admin to start the game</p>
                </div>

            case "playing":
                return <div className="w-full h-screen flex flex-col p-4 gap-4 bg-l_background dark:bg-d_background">
                    <div className="flex items-center gap-4 p-2 w-full rounded-md bg-l_backgroundLight dark:bg-d_backgroundLight">
                        <img src={data.player.avatar} className="h-[40px] w-[40px]" alt="" />
                        <p className="text-2xl">{data.player.username}</p>
                        <p className="ml-auto">Question 1 / 10</p>
                    </div>

                    <div className="flex gap-4">
                        {
                            question.image
                            && <img src={question.image} alt="" className="max-w-[400px] rounded-md" />
                        }

                        <div className="flex flex-1 flex-col gap-4">
                            <p className="text-4xl">
                                {question.question}
                            </p>

                            <div className="flex flex-col gap-4">
                                {
                                    disableAnswers
                                        ? question.options.map((opt: string) => {
                                            const bgColor = pickedAnswer === opt ? "bg-green-600/30 dark:bg-green-600/30" : "bg-l_backgroundLight dark:bg-d_backgroundLight"

                                            return <div className={"p-4 text-2xl rounded-md " + bgColor}>{opt}</div>
                                        })
                                        : question.options.map((opt: string) => {
                                            return <div className="p-4 text-2xl rounded-md cursor-pointer bg-l_backgroundLight dark:bg-d_backgroundLight" onClick={e => submitAnswer(opt)}>{opt}</div>
                                        })
                                }
                            </div>
                        </div>
                    </div>
                </div>


            case "completed":
                return <div className="w-full h-screen flex flex-col items-center p-4 gap-4 bg-l_backgroundLight dark:bg-d_backgroundLight">
                    <p className="text-4xl">Quiz is complete!</p>
                    <img src={data.player.avatar} className="h-[128px] w-[128px]" alt="" />
                    <p className="text-2xl">{data.player.username}</p>
                    <p>You scored {countCorrectAnswers()} / {completedQuiz.quiz.questions.length}</p>

                    <div className="flex h-[300px] gap-4">
                        {
                            completedQuiz.top[1] !== undefined
                            && <div className="flex flex-col items-center">
                                <p className="mt-auto"></p>
                                <img src={completedQuiz.top[1].avatar} className="h-[64px] w-[64px]" alt="" />
                                <p>{completedQuiz.top[1].username}</p>
                                <div className="w-full h-[150px] bg-gray-500 rounded-md"></div>
                            </div>
                        }

                        {
                            completedQuiz.top[0] !== undefined
                            && <div className="flex flex-col items-center">
                                <p className="mt-auto"></p>
                                <img src={completedQuiz.top[0].avatar} className="h-[64px] w-[64px]" alt="" />
                                <p>{completedQuiz.top[0].username}</p>
                                <div className="w-full h-[200px] bg-amber-500 rounded-md"></div>
                            </div>
                        }

                        {
                            completedQuiz.top[2] !== undefined
                            && <div className="flex flex-col items-center">
                                <p className="mt-auto"></p>
                                <img src={completedQuiz.top[2].avatar} className="h-[64px] w-[64px]" alt="" />
                                <p>{completedQuiz.top[2].username}</p>
                                <div className="w-full h-[100px] bg-amber-800 rounded-md"></div>
                            </div>
                        }
                    </div>
                </div>
        }

        return <h1>Something went terribly wrong if this string appears on the screen</h1>
    }

    return <div className="w-full h-screen flex flex-col items-center justify-center bg-l_background dark:bg-d_background">
        {
            socketConnected
                ? renderQuiz()
                : "Setting things up"
        }

        <div className="fixed bg-gray-500 p-2 rounded-md bottom-4 right-4 cursor-pointer" onClick={e => dispatch(uiActions.toggleDarkTheme())}>
            {
                isDarkTheme
                    ? <IoMdSunny size={32} />
                    : <IoMdMoon size={32} />
            }
        </div>
    </div>
}

export default PlayQuiz

