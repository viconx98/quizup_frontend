
export default function NavBar() {
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

    return <div className="w-full h-16 fixed bg-l_backgroundLight dark:bg-d_backgroundLight flex justify-center shadow-md">
        <div className="max-w-[1300px] w-full h-16 bg-l_backgroundLight dark:bg-d_backgroundLight flex items-center">
            <div>
                QuizUp
            </div>

            {/* TODO: Styling */}
            <div className="flex ml-auto gap-8 items-center cursor-pointer">
                {options.map(op => <p id={op.id} key={op.id}>
                    {op.title}
                </p>)}
            </div>
        </div>
    </div>
}