import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { RootState } from "../mainStore";
import { Question, QuestionType, Quiz } from "../types/myquizzes";
import { SliceState } from "../types/slice";

interface EditQuizState extends SliceState {
    quizId: string | null;
    quiz: Quiz | null;
    question: string;
    correctAnswer: string;
    choiceOptions: {
        [key: string]: string
    };
    questionType: QuestionType;
    shouldShowAdd: boolean;
    shouldShowDelete: boolean;
    questionToDelete: string | null;
    image: string | null;
    isUploadingImage: boolean;
}

const initialState: EditQuizState = {
    isLoading: false,
    isError: false,
    loading: "",
    error: "",
    quizId: null,
    quiz: null,
    shouldShowAdd: false,
    shouldShowDelete: false,
    image: null,
    isUploadingImage: false,

    // For adding questions
    question: "",
    correctAnswer: "",
    choiceOptions: {
        option1: "",
        option2: "",
        option3: "",
        option4: "",
    },
    questionType: QuestionType.Choice,

    // For deleting questions
    questionToDelete: null
}

const loadQuiz = createAsyncThunk(
    "editQuizSlice/loadQuiz",
    async (quizId: string) => {
        const response = await axiosClient.get(Endpoints.Quiz + quizId)

        return response.data as Quiz
    }
)

const addQuestion = createAsyncThunk(
    "editQuizSlice/addQuestion",
    async (data: any) => {
        const response = await axiosClient.post(Endpoints.AddQuestion, data)

        return response.data as Question
    }
)

const uploadQuestionImage = createAsyncThunk(
    "editQuizSlice/uploadQuestionImage",
    async (formData: FormData) => {
        const response = await axiosClient.post(Endpoints.UploadQuestionImage, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })

        console.log(response.data)
        return response.data.fileUrl
    }
)

const deleteQuestion = createAsyncThunk<any, string, {state: RootState}>(
    "editQuizSlice/deleteQuestion",
    async (questionId: string, thunkApi) => {
        const quizId = thunkApi.getState().editQuiz.quizId

        const response = await axiosClient.post(Endpoints.DeleteQuestion, {
            quizId: quizId,
            questionId: questionId
        })

        return questionId
    }
)

const editQuizSlice = createSlice({
    name: "editQuizSlice",
    initialState: initialState,
    reducers: {
        setShowAddDialog(state, action: PayloadAction<boolean>) {
            state.shouldShowAdd = action.payload
        },

        setError(state, action: PayloadAction<[boolean, string]>) {
            state.isError = action.payload[0]
            state.error = action.payload[1]
        },

        setLoading(state, action: PayloadAction<[boolean, string]>) {
            state.isLoading = action.payload[0]
            state.loading = action.payload[1]
        },

        setQuizId(state, action: PayloadAction<string>) {
            state.quizId = action.payload
        },
        setQuestionType(state, action: PayloadAction<QuestionType>) {
            state.questionType = action.payload
            if (action.payload === QuestionType.Boolean) {
                state.correctAnswer = "true"
            } else {
                state.correctAnswer = ""
            }
        },
        setQuestion(state, action: PayloadAction<string>) {
            state.question = action.payload
        },
        setChoiceOption(state, action: PayloadAction<string[]>) {
            const key = action.payload[0]
            const value = action.payload[1]

            state.choiceOptions[key] = value
        },
        setCorrectAnswer(state, action: PayloadAction<string>) {
            console.log(action.payload)
            state.correctAnswer = action.payload
        },

        setShowDeleteDialog(state, action: PayloadAction<boolean>) {
            state.shouldShowDelete = action.payload
        },
        setQuestionToDelete(state, action: PayloadAction<string>) {
            state.questionToDelete = action.payload
        },

        resetAddDialog(state, action: PayloadAction<void>) {
            state.isError = false
            state.error = null
            state.correctAnswer = ""
            state.question = ""
            state.choiceOptions = {
                option1: "",
                option2: "",
                option3: "",
                option4: "",
            }
            state.questionType = QuestionType.Choice
            state.image = null
            state.isUploadingImage = false
        },

        resetDeleteDialog(state, action: PayloadAction<void>) {
            state.questionToDelete = null
        },

        removeImage(state, action: PayloadAction<void>) {
            state.image = null
            state.isUploadingImage = false
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(loadQuiz.pending, (state, action) => {
            state.isLoading = true
        }).addCase(loadQuiz.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.quiz = action.payload
        }).addCase(loadQuiz.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true

            state.error = action.error.message!
        })

        builder.addCase(addQuestion.pending, (state, action) => {
            state.isLoading = true
        }).addCase(addQuestion.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            state.quiz?.questions.push(action.payload)

            state.shouldShowAdd = false
        }).addCase(addQuestion.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true

            state.error = action.error.message!
        })

        builder.addCase(uploadQuestionImage.pending, (state, action) => {
            state.isLoading = true
            state.isUploadingImage = true
        }).addCase(uploadQuestionImage.fulfilled, (state, action) => {
            state.isUploadingImage = false
            state.isLoading = false
            state.isError = false
            
            state.image = action.payload
            
        }).addCase(uploadQuestionImage.rejected, (state, action) => {
            state.isUploadingImage = false
            state.isLoading = false
            state.isError = true

            state.error = action.error.message!
        })

        builder.addCase(deleteQuestion.pending, (state, action) => {
            state.isLoading = true
        }).addCase(deleteQuestion.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            const deletedId = action.payload
            state.quiz!.questions = state.quiz!.questions.filter(que => que._id !== deletedId) 

            state.shouldShowDelete = false
        }).addCase(deleteQuestion.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true

            state.error = action.error.message!
        })
    }
})

export const editQuizActions = { ...editQuizSlice.actions }
export const editQuizAsyncActions = { loadQuiz, addQuestion, deleteQuestion, uploadQuestionImage }
export default editQuizSlice.reducer