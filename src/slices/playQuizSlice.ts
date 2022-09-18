import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceState } from "../types/slice";

type Status = "join" | "waiting" | "playing" | "completed"

// {"question":{"question":"Is react fun?","correctAnswer":"Negative","options":["No","Nope","Nah","Negative"],"questionType":"choice","_id":"6322ef1964895ae81a6598da"}}

interface PlayQuizState extends SliceState {
    status: Status;
    socketConnected: boolean;
    data: any;
    question: any;
    completedQuiz: any;
    disableAnswers: boolean;
    pickedAnswer: string;
}

// TODO: Load preference from local storage
const initialState: PlayQuizState = {
    isLoading: false,
    loading: null,
    isError: false,
    error: null,
    status: "join",
    data: null,
    question: null,
    socketConnected: false,
    completedQuiz: null,
    disableAnswers: false,
    pickedAnswer: ""
}

// TODO: Load preference from local storage
// const initialState: PlayQuizState = {
//     isLoading: false,
//     loading: null,
//     isError: false,
//     error: null,
//     status: 'completed',
//     data: {
//         player: {
//             socketId: 'hbWdi6k1Lqym0mmOAACr',
//             username: 'sdfsdfsdfsf',
//             avatar: 'https://avatars.dicebear.com/api/personas/AwbCFLBT01.svg'
//         },
//         roomPin: '204203'
//     },
//     question: {
//         question: 'Which of these planets is a gas giant?',
//         correctAnswer: 'Jupiter',
//         options: [
//             'Mars',
//             'Jupiter',
//             'Venus',
//             'Saturn'
//         ],
//         questionType: 'choice',
//         _id: '6325d232d909f1942c53e059'
//     },
//     socketConnected: true,
//     completedQuiz: {
//         admin: '63215bfc72aadd7c4e7b06ee',
//         adminSocketId: 'YSOfEFviGFvKw_XoAACp',
//         quizId: '6325d1dcd909f1942c53e04a',
//         quiz: {
//             _id: '6325d1dcd909f1942c53e04a',
//             author: '63215bfc72aadd7c4e7b06ee',
//             title: 'Test quiz',
//             timePerQuestion: 60,
//             questions: [
//                 {
//                     question: 'How many planets are there in the solar system',
//                     correctAnswer: '9',
//                     options: [
//                         '7',
//                         '8',
//                         '9',
//                         '10'
//                     ],
//                     questionType: 'choice',
//                     _id: '6325d1f1d909f1942c53e04e'
//                 },
//                 {
//                     question: 'Is Pluto a planet?',
//                     correctAnswer: 'true',
//                     options: [
//                         'true',
//                         'false'
//                     ],
//                     questionType: 'boolean',
//                     _id: '6325d1ffd909f1942c53e053'
//                 },
//                 {
//                     question: 'Which of these planets is a gas giant?',
//                     correctAnswer: 'Jupiter',
//                     options: [
//                         'Mars',
//                         'Jupiter',
//                         'Venus',
//                         'Saturn'
//                     ],
//                     questionType: 'choice',
//                     _id: '6325d232d909f1942c53e059'
//                 }
//             ],
//             __v: 3
//         },
//         currentIndex: 2,
//         pin: 204203,
//         players: [
//             {
//                 socketId: 'hbWdi6k1Lqym0mmOAACr',
//                 username: 'sdfsdfsdfsf',
//                 avatar: 'https://avatars.dicebear.com/api/personas/AwbCFLBT01.svg'
//             }
//         ],
//         status: 'completed',
//         answerData: {
//             '6325d1f1d909f1942c53e04e': {
//                 hbWdi6k1Lqym0mmOAACr: '9'
//             },
//             '6325d1ffd909f1942c53e053': {
//                 hbWdi6k1Lqym0mmOAACr: 'true'
//             },
//             '6325d232d909f1942c53e059': {
//                 hbWdi6k1Lqym0mmOAACr: 'Jupiter'
//             }
//         }
//     },
//     disableAnswers: true,
//     pickedAnswer: 'Jupiter'
// }

const playQuizSlice = createSlice({
    name: "playQuizSlice",
    initialState: initialState,
    reducers: {
        setStatus(state, action: PayloadAction<Status>) {
            state.status = action.payload
        },
        setSocketConnected(state, action: PayloadAction<boolean>) {
            state.socketConnected = action.payload
        },
        setCompletedQuiz(state, action) {
            state.completedQuiz = action.payload
        },
        setData(state, action) {
            state.data = action.payload
        },
        setQuestion(state, action) {
            state.question = action.payload
        },
        setDisableAnswers(state, action: PayloadAction<boolean>) {
            state.disableAnswers = action.payload
        },
        setPickedAnswer(staet, action: PayloadAction<string>) {
            staet.pickedAnswer = action.payload
        }
    }
})


export const playQuizActions = { ...playQuizSlice.actions }
export default playQuizSlice.reducer