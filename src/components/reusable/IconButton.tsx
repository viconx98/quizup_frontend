import { FC } from "react"
import { IconContext } from "react-icons";

export interface IconButtonProps {
    icon: any;
    size?: string;
    disabled?: boolean;
    clickHandler?: (e: any) => void
}

const IconButton: FC<IconButtonProps> = ({ size = "24", disabled = false, clickHandler = null, icon }) => {
    const iconStyle = disabled ? "text-l_textLight" : "text-primary-500"
    const divStyle = disabled ? "p-2 rounded-full transition-all" : "cursor-pointer p-2 rounded-full transition-all hover:bg-primary-500/25"

    return <div className={divStyle} onClick={clickHandler!}>
        <IconContext.Provider value={{ size: size, className: iconStyle }} >
            {icon}
        </IconContext.Provider>
    </div>
}

export default IconButton