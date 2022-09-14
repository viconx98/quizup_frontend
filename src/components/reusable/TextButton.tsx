export interface TextButtonProps {
    text: string,
    clickHandler: () => void
}

export default function TextButton(props: TextButtonProps) {


    return <button onClick={props.clickHandler} className="w-max p-2 flex items-center justify-center text-primary-600 active:text-primary-800 hover:text-primary-700 transition-all rounded font-bold">
        {props.text}
    </button>

}