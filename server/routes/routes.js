const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
app.use(bodyParser.json())
const router = express.Router()
const { addPlacement ,createJwt} = require('../controller/controller')
const verifyJwtToken = require('../middleware/verify_jwt_token')


router.get('/',createJwt)
router.post('/add',verifyJwtToken, addPlacement)


module.exports = router