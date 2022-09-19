import { useNavigate } from "react-router-dom"
import { authActions, authAsyncActions } from "../../slices/authSlice"
import { uiActions } from "../../slices/uiSlice"
import { useAppDispatch, useAppSelector } from "../../types/hooks"
import AppLogo from "../AppLogo/AppLogo"

export default function NavBar() {
    const dispatch = useAppDispatch()
    const { currentTab } = useAppSelector(state => state.ui)
    const navigate = useNavigate()

    const options = [
        {
            id: "myquizzes",
            title: "My Quizzes"
        },
        {
            id: "reports",
            title: "Reports"
        }, {
            id: "logout",
            title: "Logout"
        }
    ]

    const handleNavItemClick = (tabId: string) => {
        if (tabId === "myquizzes") {
            dispatch(uiActions.setTab(tabId))
            navigate("/")
        } else if (tabId === "logout") {
            dispatch(authAsyncActions.logout())
            navigate("/signin")
        } else {
            dispatch(uiActions.setTab(tabId))
            navigate(tabId)
        }
    }

    return <div className="w-full h-16 fixed bg-l_backgroundLight dark:bg-d_backgroundLight flex justify-center shadow-md">
        <div className="max-w-[1300px] w-full h-16 bg-l_backgroundLight dark:bg-d_backgroundLight flex items-center">
            <div className="mt-2">
                <AppLogo/>
            </div>

            {/* TODO: Styling */}
            <div className="flex ml-auto gap-8 items-center cursor-pointer">
                {
                    options.map(op => {
                        const tabStyle = currentTab === op.id ? "p-2 rounded-md bg-l_backgroundLighter dark:bg-d_backgroundLighter" : "p-2 rounded-md"

                        return <p id={op.id} key={op.id} onClick={e => handleNavItemClick(op.id)} className={tabStyle}>
                            {op.title}
                        </p>
                    }
                    )
                }
            </div>
        </div>
    </div>
}