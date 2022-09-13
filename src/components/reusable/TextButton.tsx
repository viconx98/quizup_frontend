export interface TextButtonProps {
    text: string,
    clickHandler: () => void
}

export default function TextButton(props: TextButtonProps) {


    return <button onClick={props.clickHandler} className="w-max p-2 flex items-center justify-center text-rose-600 active:text-rose-800 hover:text-rose-700 transition-all rounded">
        {props.text}
    </button>

}