import { FC } from "react"
import "./AppLogo.css"

interface AppLogoProps {
    scale?: number
}

const AppLogo: FC<AppLogoProps> = ({ scale = "32px" }) => {
    return <div className="app-logo text-primary-600">
        <div className="flex gap-1">
            <p className="char char-q">Q</p>
            <p className="char char-u">u</p>
            <p className="char char-i">i</p>
            <p className="char char-z">z</p>
            <p className="char char-u2">U</p>
            <p className="char char-p">p</p>
            <p className="char char-exc">!</p>
        </div>
    </div>
}

export default AppLogo