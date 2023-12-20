import express from "express";
const app = express();
import "dotenv/config";
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let PORT = process.env.PORT || 3000;
import placementUpdate from "./routes/palcement_routes.mjs";
import getdrives from "./routes/getdrives.mjs";

app.use("/api/placement", placementUpdate);
app.use("/api/getdrives", getdrives);

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});
