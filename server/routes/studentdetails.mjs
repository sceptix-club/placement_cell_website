import express from "express";
const app = express();
import "dotenv/config";
import bodyParser from "body-parser";
app.use(bodyParser.json());
const router = express.Router();
import { getstudent } from '../controller/controller.mjs'

router.get('/:id', getstudent);

export default router