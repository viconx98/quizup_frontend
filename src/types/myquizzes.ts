export enum QuestionType {
    Boolean = "boolean",
    Choice = "choice"
}

export interface Question {
    _id: string;
    question: string;
    correctAnswer: string | boolean;
    questionType: QuestionType;
    options: string[] 
} 

export interface Quiz {
    _id: string;
    author: string;
    title: string;
    timePerQuestion: number
    questions: Question[]
}
