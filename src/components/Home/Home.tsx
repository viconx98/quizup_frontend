import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (user === null) {
            navigate("/signin")
        }
    }, [])

    return <div>
        Home
    </div>
}