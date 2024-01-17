import express from "express";
const app = express();
import "dotenv/config";
import bodyParser from "body-parser";
app.use(bodyParser.json());
const router = express.Router();
import { getstudent } from '../controller/controller.mjs'
import {verifyStudentJwtToken} from '../middleware/verify_jwt_token.mjs'

router.get('/:id',verifyStudentJwtToken, getstudent);

export default router