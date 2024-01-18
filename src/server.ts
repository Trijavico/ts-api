import express from 'express'
import router from './router'
import cors from 'cors'
import { authMiddleWare } from './modules/auth'
import * as usrHandler from './handlers/user'
import { body } from 'express-validator'
import { errorHandler, errorValidation } from './modules/middlewares'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    console.log("hello from express")
    res.status(200)
    res.json({message: "hello"})
})

app.use('/api/v1', authMiddleWare, router)
app.post("/signup", 
    body(['username', 'password'])
    .exists()
    .isString(),
    errorValidation, 
    usrHandler.createUser
);
app.post("/signin", 
    body(['username', 'password'])
    .exists()
    .isString(),
    errorValidation, 
    usrHandler.signIn
);

app.use(errorHandler);

export default app