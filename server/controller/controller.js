const express = require('express');
const app = express()
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const addPlacement = async (req, res) => {
   
    res.status(200).send({ message: `you got access you added ${req.body.company} placement drive` })
}

const createJwt = (req,res) => {
    let jwt_token = jwt.sign(process.env.MANAGER_SECRET_KEY, process.env.MANAGER_SECRET_KEY, {})
    res.status(200).send({token :jwt_token })
}


module.exports = {
    addPlacement: addPlacement,
    createJwt: createJwt
    
}