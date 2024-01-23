import express from "express";
const app = express();
import "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
let PORT = process.env.PORT || 3000;
import placementUpdate from "./routes/palcement_routes.mjs";
import getdrives from "./routes/getdrives.mjs";
import login from "./routes/login.mjs";
import studentdetails from "./routes/studentdetails.mjs";

app.use("/api/placement", placementUpdate);
app.use("/api/drives", getdrives);
app.use("/api/login", login);
app.use("/api/student", studentdetails);

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});
