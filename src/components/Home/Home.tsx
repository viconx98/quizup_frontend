import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function Home() {
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (user === null) {
            navigate("/signin")
        }
    }, [])

    return <div className="w-full min-h-screen bg-l_background dark:bg-d_background flex flex-col">
        <NavBar />

        <div className="w-full flex-1 flex justify-center">
            <div className="max-w-[1300px] mt-16 mb-16 w-full flex-1 pt-2">
                <Outlet/>
            </div>
        </div>
    </div>
}