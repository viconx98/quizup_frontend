import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceState } from "../types/slice";
import io from "socket.io-client"
import { Socket } from "socket.io-client"
import { QuestionType, Quiz } from "../types/myquizzes";

interface RunQuizState extends SliceState {
    quizId: string;
    quizRoom: QuizRoom | null;
    socketConnected: boolean;
}

export interface QuizRoom {
    admin: string;
    adminSocketId: string;
    pin: number;
    quizId: string;
    players: any[];
    status: "waiting" | "playing" | "completed";
    quiz: Quiz;
    answerData: any;
    currentIndex: number;
}

const initialState: RunQuizState = {
    isLoading: true,
    loading: null,
    isError: false,
    error: null,
    quizId: "",
    quizRoom: null,
    socketConnected: false
}

// const initialState: RunQuizState = {
//     isLoading: true,
//     loading: null,
//     isError: false,
//     error: null,
//     quizId: '6325d1dcd909f1942c53e04a',
//     quizRoom: {
//       admin: '63215bfc72aadd7c4e7b06ee',
//       adminSocketId: 'JRJ2S6O7gxXWtrSvAACn',
//       quizId: '6325d1dcd909f1942c53e04a',
//       quiz: {
//         _id: '6325d1dcd909f1942c53e04a',
//         author: '63215bfc72aadd7c4e7b06ee',
//         title: 'Test quiz',
//         timePerQuestion: 60,
//         questions: [
//           {
//             question: 'How many planets are there in the solar system',
//             correctAnswer: '9',
//             options: [
//               '7',
//               '8',
//               '9',
//               '10'
//             ],
//             questionType: QuestionType.Choice,
//             _id: '6325d1f1d909f1942c53e04e'
//           },
//           {
//             question: 'Is Pluto a planet?',
//             correctAnswer: 'true',
//             options: [
//               'true',
//               'false'
//             ],
//             questionType: QuestionType.Boolean,
//             _id: '6325d1ffd909f1942c53e053'
//           },
//           {
//             question: 'Which of these planets is a gas giant?',
//             correctAnswer: 'Jupiter',
//             options: [
//               'Mars',
//               'Jupiter',
//               'Venus',
//               'Saturn'
//             ],
//             questionType: QuestionType.Choice,
//             _id: '6325d232d909f1942c53e059'
//           }
//         ],
//       },
//       currentIndex: 0,
//       pin: 500350,
//       players: [
//         {
//           socketId: '5Qsyzc_6dmrBH8AYAACr',
//           username: 'adasd',
//           avatar: 'https://avatars.dicebear.com/api/personas/mqz6F2YdBK.svg'
//         }
//       ],
//       status: 'playing',
//       answerData: {
//         '6325d1f1d909f1942c53e04e': {},
//         '6325d1ffd909f1942c53e053': {},
//         '6325d232d909f1942c53e059': {}
//       }
//     },
//     socketConnected: true
//   }

const runQuizSlice = createSlice({
    name: "runQuizSlice",
    initialState: initialState,
    reducers: {
        setQuizId(state, action: PayloadAction<string>) {
            state.quizId = action.payload
        },
        setSocketConnected(state, action: PayloadAction<boolean>) {
            state.socketConnected = action.payload
        },
        setQuizRoom(state, action: PayloadAction<QuizRoom>) {
            state.quizRoom = action.payload
        }
    }
})


export const runQuizActions = { ...runQuizSlice.actions }
export const runQuizAsyncActions = {}
export default runQuizSlice.reducer