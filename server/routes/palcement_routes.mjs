import express from "express";
const app = express();
import "dotenv/config";
import bodyParser from "body-parser";
app.use(bodyParser.json());
const router = express.Router();
import { addPlacement } from "../controller/controller.mjs";
import {verifyManagerJwtToken} from "../middleware/verify_jwt_token.mjs";
import {createJwtForManagers,createJwtForStudents} from '../middleware/create_jwt.mjs'

router.get("/", createJwtForManagers);


export default router;
