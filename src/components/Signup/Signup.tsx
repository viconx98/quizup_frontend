import TextField from "../reusable/TextField";
import { useRef, useEffect } from "react";
import { MdPerson, MdEmail, MdOutlinePassword } from "react-icons/md"
import Button from "../reusable/Button";
import TextButton from "../reusable/TextButton";
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { authActions, authAsyncActions } from "../../slices/authSlice";
import { SignupData } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import AppLogo from "../AppLogo/AppLogo";

const signUpValidation = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),

    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

    password: Yup.string()
        .min(6, "Password is too short, minimum 6 characters are required")
        .max(20, "Password is too long, maximum 20 characteres are allowed")
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords don't match")
        .required("Password confirmation required")
})


export default function Signup() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { authComplete, isError, error, isLoading, loading } = useAppSelector(state => state.auth)

    const nameRef = useRef<any>(null)
    const emailRef = useRef<any>(null)
    const passwordRef = useRef<any>(null)
    const confirmPasswordRef = useRef<any>(null)

    useEffect(() => {
        if (authComplete) {
            navigate("/")
        }
    }, [authComplete])
    
    const attemptSignUp = async () => {
        dispatch(authActions.setError([false, null]))

        try {
            const formData = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                confirmPassword: confirmPasswordRef.current.value
            }
    
            await signUpValidation.validate(formData)
            
            const signUpData: SignupData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            }

            dispatch(authAsyncActions.signup(signUpData))
        } catch (err) {
            console.log(err)
            let error = err as Error
            dispatch(authActions.setError([true, error.message]))
        }
    }

    return <div className="w-full h-screen flex items-center justify-end bg-l_background dark:bg-d_background">
        <div className="w-[500px] h-screen p-4 rounded-lg flex flex-col gap-4 items-center bg-l_backgroundLight dark:bg-d_backgroundLight shadow-lg">
            <AppLogo/>

            <TextField title="Name" type="text" icon={<MdPerson size={32} />} placeholder="John Doe" inputRef={nameRef} />
            <TextField title="Email" type="email" icon={<MdEmail size={32} />} placeholder="johndoe@gmail.com" inputRef={emailRef} />
            <TextField title="Password" type="password" icon={<MdOutlinePassword size={32} />} placeholder="•••••••••" inputRef={passwordRef} />
            <TextField title="Confirm password" type="password" icon={<MdOutlinePassword size={32} />} placeholder="•••••••••" inputRef={confirmPasswordRef} />

            {isError && <div className="text-error transition-all">
                {error}
            </div>}

            <div className="flex flex-col gap-4 mt-4 items-center">
                <Button clickHandler={attemptSignUp} text="Create account" variant="filled" />
                <TextButton clickHandler={() => {navigate("/signin")}} text="Sign in" />
            </div>
        </div>
    </div>
}