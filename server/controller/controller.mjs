import express from 'express'
const app = express()
import 'dotenv/config'
import bodyParser from 'body-parser';
import  Jwt  from 'jsonwebtoken';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


export const addPlacement = async (req, res) => {
   
    res.status(200).send({ message: `you got access you added ${req.body.company} placement drive` })
}

export const createJwt = (req,res) => {
    let jwt_token = Jwt.sign(process.env.MANAGER_SECRET_KEY, process.env.MANAGER_SECRET_KEY, {})
    res.status(200).send({token :jwt_token })
}


