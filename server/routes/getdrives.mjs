import express from 'express'
const app = express()
import 'dotenv/config'
import bodyParser from 'body-parser';
app.use(bodyParser.json())
const router = express.Router()
import { getDrives } from '../controller/controller.mjs'
import {createJwtForStudents} from '../middleware/create_jwt.mjs'
import {verifyManagerJwtToken, verifyMentorJwtToken,verifyStudentJwtToken} from '../middleware/verify_jwt_token.mjs'

router.get('/',createJwtForStudents)
router.get('/getdrives', getDrives)


export default router