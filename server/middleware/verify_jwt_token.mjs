import  Jwt  from "jsonwebtoken";


const verifyJwtToken = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).send({error:"no token provided"})
    }
    else {
        
        let token = authHeader && authHeader.split(" ")[1]
        Jwt.verify(token, process.env.MANAGER_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).send({error:"Invalid token"})
            }
            else { 
                next()
            }
            
        })
        
    }
}
export default verifyJwtToken