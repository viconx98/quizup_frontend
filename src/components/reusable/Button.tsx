export interface ButtonProps{
    variant: "filled" | "outlined";
    text: string;
    clickHandler: () => void
}

// TODO: Disabled and loading states
export default function Button(props: ButtonProps){
    const styleString = props.variant === "filled"
        ? `w-[200px] p-2 flex items-center justify-center text-rose-50 bg-primary-600 active:bg-primary-800 hover:bg-primary-700 transition-all rounded font-bold`
        : `w-[200px] p-2 flex items-center justify-center border-2 border-primary-600 rounded text-rose-50 hover:bg-primary-700/30 active:bg-primary-700/20 font-bold`
    
    
    return <button onClick={props.clickHandler}  className={styleString}>{props.text}</button>
    
}