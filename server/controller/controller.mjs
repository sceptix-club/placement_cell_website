import express from "express";
const app = express();
import "dotenv/config";
import bodyParse from "body-parser";
import Jwt from "jsonwebtoken";
import fs from "fs";

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

export const createJwt = (req, res) => {
    let jwt_token = Jwt.sign(process.env.MANAGER_SECRET_KEY, process.env.MANAGER_SECRET_KEY);

    res.setHeader("Set-Cookie", `jwt_token=${jwt_token}; Path=/; HttpOnly`);
    res.status(200).send({ token: jwt_token });
    return jwt_token;
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
