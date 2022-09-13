interface TextFieldProps {
    title: string,
    placeholder?: string,
    inputRef: any,
    icon: any,
    type: string,
}

export default function TextField(props: TextFieldProps) {
    return <div className="w-full flex flex-col gap-2">
        <p className="">{props.title}</p>
        <div className="flex items-center gap-2">
        {props.icon}
        <input ref={props.inputRef} placeholder={props.placeholder} type={props.type}
            className="w-full rounded text-lg text-black p-2" />
        </div>
    </div>
}