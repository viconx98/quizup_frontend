import TextField from "../reusable/TextField";
import { useRef, useEffect } from "react";
import { MdPerson, MdEmail, MdOutlinePassword } from "react-icons/md"
import Button from "../reusable/Button";
import TextButton from "../reusable/TextButton";
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { authActions, authAsyncActions } from "../../slices/authSlice";
import { SigninData, SignupData } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import AppLogo from "../AppLogo/AppLogo";

const signInValidation = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

    password: Yup.string()
        .required("Password is required"),
})

// TODO: Figure out a good logo for the app 
export default function Signin() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { authComplete, isError, error, isLoading, loading } = useAppSelector(state => state.auth)

    const emailRef = useRef<any>(null)
    const passwordRef = useRef<any>(null)

    useEffect(() => {
        if (authComplete) {
            navigate("/")
        }
    }, [authComplete])
    

    const attemptSignin = async () => {
        dispatch(authActions.setError([false, null]))

        try {
            const formData = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
    
            const signUpData: SigninData = {
                email: formData.email,
                password: formData.password
            }

            await signInValidation.validate(formData)

            dispatch(authAsyncActions.signin(signUpData))
        } catch (err) {
            console.log(err)
            let error = err as Error
            dispatch(authActions.setError([true, error.message]))
        }
    } 

    return <div className="w-full h-screen flex items-center justify-end bg-l_background dark:bg-d_background">
        <div className="w-[500px] h-screen p-4 rounded-lg flex flex-col gap-4 items-center bg-l_backgroundLight dark:bg-d_backgroundLight shadow-lg">
        <AppLogo/>

            <TextField title="Email" type="email" icon={<MdEmail size={32} />} placeholder="johndoe@gmail.com" inputRef={emailRef} />
            <TextField title="Password" type="password" icon={<MdOutlinePassword size={32} />} placeholder="•••••••••" inputRef={passwordRef} />

            {isError && <div className="text-error transition-all">
                {error}
            </div>}

            <div className="flex flex-col gap-4 mt-4 items-center">
                <Button clickHandler={attemptSignin} text="Sign in" variant="filled" />
                <TextButton clickHandler={() => {navigate("/signup")}} text="Create account" />
            </div>
        </div>
    </div>
}