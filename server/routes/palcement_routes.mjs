import express from 'express'
const app = express()
import 'dotenv/config'
import bodyParser from 'body-parser';
app.use(bodyParser.json())
const router = express.Router()
import { addPlacement, createJwt } from '../controller/controller.mjs'
import verifyJwtToken from '../middleware/verify_jwt_token.mjs'



router.get('/',createJwt)
router.post('/add',verifyJwtToken, addPlacement)


export default router