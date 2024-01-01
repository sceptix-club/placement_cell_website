import express from 'express'
const app = express()
import 'dotenv/config'
import bodyParser from 'body-parser';
app.use(bodyParser.json())
const router = express.Router()
import {login} from '../controller/controller.mjs'

router.post("/", login);

export default router