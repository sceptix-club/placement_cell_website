import Jwt from "jsonwebtoken";

export const verifyManagerJwtToken = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).send({ error: "no token provided" });
    } else {
        let token = authHeader && authHeader.split(" ")[1];
        Jwt.verify(token, process.env.MANAGER_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send({ error: "Invalid token" });
                return false;
            } else {
                next();
                return true;
            }
        });
    }
};

export const verifyMentorJwtToken = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).send({ error: "no token provided" });
    } else {
        let token = authHeader && authHeader.split(" ")[1];
        Jwt.verify(token, process.env.MENTOR_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send({ error: "Invalid token" });
                return false;
            } else {
                console.log("decoded value is ", decoded);
                next();
                return true;
            }
        });
    }
};

export const verifyStudentJwtToken = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).send({ error: "no token provided" });
    } else {
        let token = authHeader && authHeader.split(" ")[1];
        Jwt.verify(token, process.env.STUDENT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send({ error: "Invalid token" });
                return false;
            } else {
                let Paramusn = req.params["id"];
                // console.log("decoded value is " ,decoded)
                if (Paramusn == decoded.usn && decoded.usn == req.headers.usn) {
                    req.isPageSame = true;
                    // res.status(200).json({isPageSame:true})
                    next();
                    return true;
                } else {
                    req.isPageSame = false;

                    res.status(401).json({ isPageSame: false });
                }
            }
        });
    }
};
