import "dotenv/config"
import express from 'express';
import eventRouter from './routes/event.routes';
import authRouter from "./routes/auth.routes";
import auth from "./middlewares/auth.middleware";


const app = express()

const port = 3000;
app.use(express.json())

app.get('/health',(req,res)=>{
    return res.status(200).json({'status':'ok'})
})
//  auth

app.use('/auth',authRouter)

app.use('/events',auth , eventRouter)


app.listen(port,()=>{
    console.log(`serer is running in port ${port}`);
})