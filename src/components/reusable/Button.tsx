export interface ButtonProps{
    variant: "filled" | "outlined",
    text: string,
    clickHandler: () => void
}

export default function Button(props: ButtonProps){
    const styleString = props.variant === "filled"
        ? "w-[300px] p-4 flex items-center justify-center bg-rose-600 active:bg-rose-800 hover:bg-rose-700 transition-all rounded font-bold"
        : "w-[300px] p-4 flex items-center justify-center border-2 border-rose-600 rounded hover:bg-rose-700/30 active:bg-rose-700/20 font-bold"
    
    
    return <button onClick={props.clickHandler} className={styleString}>Create account</button>
    
}