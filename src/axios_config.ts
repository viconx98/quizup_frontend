import axios from "axios"

export enum Endpoints {
    Base = "http://localhost:3001",
    Signin = "/auth/signin",
    Signup = "/auth/signup",
    RefreshToken = "/auth/refreshToken",
    Quiz = "/quiz/",
    GetQuizzes = "/quiz/me",
    AddQuiz = "/quiz/add",
    DeleteQuiz = "/quiz/delete"
}


const axiosClient = axios.create({
    baseURL: Endpoints.Base
})

// Response interceptor to replace default error messages with backend error messages
axiosClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        try {
            error.message = error.response.data.message
        } catch (error) {
            console.log("Cannot find error property", error)
        } finally {
            return Promise.reject(error)
        }
    }
)

// Request interceptor to pass the token
axiosClient.interceptors.request.use(
    (request) => {
        if (request.url === Endpoints.Signin || request.url === Endpoints.Signup || request.url === Endpoints.RefreshToken)
            return request

        const user = JSON.parse(localStorage.getItem("user")!)

        const accessToken = user.accessToken

        request.headers!.Authorization = `Bearer ${accessToken}`

        return request
    },
    (error) => {
        return Promise.reject(error)
    }
)


export default axiosClient