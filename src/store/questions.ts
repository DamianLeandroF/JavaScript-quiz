import { create } from "zustand"; 
import type { Questions } from "../types";
import confetti from "canvas-confetti"
import { persist } from "zustand/middleware";

interface State {
    reset: () => void;
    questions: Questions[],
    currentQuestion: number,
    fetchQuestions: (limit: number )=> Promise<void>
    selectAnswer: (questionId: number, answerIndex:number) => void,
    goNextQuestion : () => void,
    goPreviousQuestion : () => void
}

export const useQuestionsStore = create <State>()(persist((set, get) =>{
    return{
        questions: [],
        currentQuestion : 0,
        fetchQuestions : async (limit: number)=>{
            const res = await fetch('/data.json')
            const json = await res.json() 
            const questions = json.sort(()=> Math.random() -0.5).slice(0,limit) // esto sirve para desordenar los elementos que devuelve el fetch
            set({questions})
        },
        selectAnswer: (questionId: number, answerIndex:number) => {
            const {questions} = get() 
            //clonamos el objeto
            const newQuestions = structuredClone(questions)
            //encontramos el indice de la pregunta
            const questionIndex = newQuestions.findIndex(q=> q.id === questionId)
            //obtenemos la informacion de la pregunta 
            const questionInfo = newQuestions[questionIndex]
            //averiguamos si el usuario ah seleccionado la respuesta correcta
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
            //cambiar esta informacion en la copia de la pregunta
            if(isCorrectUserAnswer) confetti()
            newQuestions[questionIndex]={
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer:answerIndex
                
            }
            //actualizar el estado
            set({questions : newQuestions})
        },
        goNextQuestion : () =>{
            const {currentQuestion, questions} = get()
            const nextQuestion = currentQuestion + 1
            if(nextQuestion < questions.length ){
                set({currentQuestion: nextQuestion})
            }
        },
        goPreviousQuestion:()=>{
            const {currentQuestion} = get()
            const previousQuestion = currentQuestion -1 
            if(previousQuestion >= 0 ){
                set({currentQuestion: previousQuestion})
            }
        },
        reset:()=>{
            set({currentQuestion: 0, questions:[]})
        }
        
    }

        
},{
    name:"questions"
}))