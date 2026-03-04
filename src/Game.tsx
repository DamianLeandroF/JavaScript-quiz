import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import type { Questions as QuestionType} from "./types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

    const getBackgroundColor = (info: QuestionType,index:number) =>{
        const {userSelectedAnswer, correctAnswer} = info
        if(userSelectedAnswer == null) return "transparent"
        
        if(index === correctAnswer) return "green"
        if(index === userSelectedAnswer ) return "red"

        return "transparent"
    }
    
    const Questions = ({info} : {info : QuestionType}) =>{
        const selectAnswer = useQuestionsStore(state => state.selectAnswer)// recupero el estado global de selectAnswer
        const createHadleClick = (answerIndex:number)=> () =>{
            selectAnswer(info.id, answerIndex)
        }
        
        return(

        <Card variant="outlined" sx={{textAlign : "left", p:2, marginTop:4 }} >
            <Typography variant="h5" >
                {info.question}
            </Typography>
            <SyntaxHighlighter language="JavaScript" style={gradientDark}>
                {info.code}
            </SyntaxHighlighter>
            <List sx={{bgcolor:"#333" }}  disablePadding>
                {info.answers.map((answer,index)=>(
                    <ListItem key={index} divider disablePadding>
                        <ListItemButton onClick={createHadleClick(index)}
                        sx={{backgroundColor: getBackgroundColor(info,index)}}
                        disabled={info.userSelectedAnswer!=null}>
                            <ListItemText primary={answer} sx={{textAlign: "center"}}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}
export const Game = ()=>{
    const questions = useQuestionsStore(state => state.questions)// asi se recuperan los datos del store 
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const questionInfo = questions[currentQuestion]
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)
    return(
        <>
            <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0 }>
                    <ArrowBackIosNew></ArrowBackIosNew>
                </IconButton>
                {currentQuestion +1 } / {questions.length}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length -1  }>
                    <ArrowForwardIos></ArrowForwardIos>
                </IconButton>
            </Stack>
            <Questions info={questionInfo}/>
            <Footer/>
        </>
    )
}