export enum QuestionType {
    Boolean = "boolean",
    Choice = "choice"
}

export interface Question {
    question: string;
    correctAnswer: string | boolean;
    questionType: QuestionType;
    options: (string | boolean)[] 
} 

export interface Quiz {
    author: string;
    title: string;
    questions: Question[]
}