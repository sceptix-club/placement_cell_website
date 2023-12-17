import express from 'express'
const app = express()
import 'dotenv/config'
import bodyParser from 'body-parser';
app.use(bodyParser.json())
const router = express.Router()
import { getDrives } from '../controller/controller.mjs'


router.get('/drives', getDrives)


export default router