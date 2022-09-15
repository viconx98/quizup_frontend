import { FC, useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { io } from "socket.io-client"
import { playQuizActions } from "../../slices/playQuizSlice"
import { Events } from "../../types/events"
import { useAppDispatch, useAppSelector } from "../../types/hooks"
import Button from "../reusable/Button"
import TextField from "../reusable/TextField"

const socket = io("http://localhost:3001")

const PlayQuiz: FC = () => {
    const [defultPin, setDefaultPin] = useState("")
    const nameRef = useRef<any>(null)
    const pinRef = useRef<any>(null)

    const dispatch = useAppDispatch()

    const [searchParams] = useSearchParams()

    const { status } = useAppSelector(state => state.playQuiz)

    useEffect(() => {
        const pin = searchParams.get("pin")
        if (pin !== undefined && pin !== null) {
            setDefaultPin(pin)
        }

        socket.on(Events.QuizJoined, (data) => {
            dispatch(playQuizActions.setStatus("waiting"))
            dispatch(playQuizActions.setData(data))
        })
    }, [])

    const joinQuiz = () => {
        const username = nameRef.current.value
        if (username === "") return

        socket.emit(Events.JoinQuiz, {
            username: username,
            roomPin: pinRef.current.value
        })
    }

    const renderQuiz = () => {
        switch (status) {
            case "join":
                return <div className="w-[300px] h-fit flex flex-col items-center p-4 gap-4 bg-l_backgroundLight dark:bg-d_backgroundLight">
                    <TextField inputRef={nameRef} title="Game pin" noLabel placeholder="Name" />
                    <TextField defaultValue={defultPin} inputRef={pinRef} title="Game pin" noLabel placeholder="Game pin" />
                    <Button text="Join" variant="filled" clickHandler={joinQuiz} />
                </div>
            case "waiting":
                return <div className="w-[300px] h-fit flex flex-col items-center p-4 gap-4 bg-l_backgroundLight dark:bg-d_backgroundLight">
                    <p>Waiting for admin to start the quiz</p>
                </div>

        }
    }

    return <div className="w-full h-screen flex flex-col items-center justify-center bg-l_background dark:bg-d_background">
        {renderQuiz()}
    </div>
}

export default PlayQuiz 