import { FC } from "react"

interface TextFieldProps {
    title: string;
    inputRef?: any;
    placeholder?: string;
    icon?: any;
    type?: string;
    noLabel?: boolean;
    onChange?: (e: any) => void;
}

const TextField: FC<TextFieldProps> = ({ title, placeholder, inputRef = null, onChange = null, noLabel = false, icon = null, type = "text" }) => {
    return <div className="w-full flex flex-col gap-2">
        {!noLabel && <p className="">{title}</p>}
        <div className="flex items-center gap-2">
            {icon}
            <input ref={inputRef} placeholder={placeholder} type={type}
                onChange={onChange!}
                className="w-full rounded text-lg text-l_text p-2 border-2 bg-l_input dark:bg-d_input" />
        </div>
    </div>
}

export default TextField