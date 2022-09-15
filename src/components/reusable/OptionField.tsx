import { FC } from "react"

interface OptionFieldProps {
    // title: string;
    // type?: string;
    inputId: string;
    placeholder?: string;
    groupName: string;
    onChange?: (e: any) => void;
    onSelected?: (e: any) => void
}

const OptionField: FC<OptionFieldProps> = ({ inputId, placeholder, groupName, onChange = null, onSelected = null }) => {
    return <div className="w-full flex flex-col gap-2">

        <div className="flex items-center gap-2">
            <input id={inputId} placeholder={placeholder} type="text"
                onChange={onChange!}
                className="w-[150px] rounded text-lg text-l_text p-2 border-2 bg-l_input dark:bg-d_input" />
            
            <input type="radio" value={inputId} name={groupName} onChange={onSelected!} />
        </div>
    </div>
}

export default OptionField