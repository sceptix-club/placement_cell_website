import express from 'express'
const app = express()
import 'dotenv/config'
import bodyParser from 'body-parser';
app.use(bodyParser.json())
const router = express.Router()
import { login } from '../controller/controller.mjs'
import {createJwtForStudents} from '../middleware/create_jwt.mjs'


router.post("/",createJwtForStudents,login);

export default router