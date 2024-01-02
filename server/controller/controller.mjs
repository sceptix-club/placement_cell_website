import express from "express";
const app = express();
import "dotenv/config";
import bodyParse from "body-parser";
import Jwt from "jsonwebtoken";
import fs from "fs";
import cookieParser from "cookie-parser";
app.use(cookieParser())

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

export const addPlacement = async (req, res) => {
    
    // res.status(200).send({ message: `you got access you added ${req.body.company} placement drive` })
    try {
        const json = JSON.stringify(req.body);
        fs.writeFile("data.json", json + "\n ", (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            res.status(200).send({message:"Data added "})
        });
    } catch (err) {
        throw err;
    }
};


export const getDrives = (req, res) => {
    fs.readFile("data.json", "utf-8", (err, data) => {
        if (err) {
            res.send({ error: err });
            return;
        }
        res.send({ data });
    });
};


export const login = (req, res) => {
    console.log("Login function")
}