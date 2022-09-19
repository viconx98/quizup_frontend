import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { IoMdMoon, IoMdSunny } from "react-icons/io"
import { uiActions } from "../../slices/uiSlice";


export default function Home() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.auth)
    const { isDarkTheme } = useAppSelector(state => state.ui)

    useEffect(() => {
        if (user === null) {
            navigate("/signin")
        }
    }, [])


    return <div className="w-full min-h-screen bg-l_background dark:bg-d_background flex flex-col">
        <NavBar />

        <div className="w-full flex-1 flex justify-center">
            <div className="max-w-[1300px] mt-16 mb-16 w-full flex-1 pt-2">
                <Outlet />
            </div>
        </div>

        <div className="fixed bg-gray-500 p-2 rounded-md bottom-4 right-4 cursor-pointer" onClick={e => dispatch(uiActions.toggleDarkTheme())}>
            {
                isDarkTheme
                ? <IoMdSunny size={32} />
                : <IoMdMoon size={32} />
            }
        </div>
    </div>
}