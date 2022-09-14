import { FC } from "react"
import { IconContext } from "react-icons";

export interface IconButtonProps {
    icon: any;
    size?: string;
    disabled?: boolean;
}

const IconButton: FC<IconButtonProps> = ({ size = "24", disabled = false, icon }) => {
    const iconStyle = disabled ? "text-l_textLight" : "text-primary-500"
    const divStyle = disabled ? "p-2 rounded-full transition-all" : "cursor-pointer p-2 rounded-full transition-all hover:bg-primary-200"

    return <div className={divStyle}>
        <IconContext.Provider value={{ size: size, className: iconStyle }} >
            {icon}
        </IconContext.Provider>
    </div>
}

export default IconButton