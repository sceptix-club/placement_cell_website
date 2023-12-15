const express = require('express')
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let PORT = process.env.PORT || 3000
const placementUpdate = require('./routes/routes')


app.use('/api/placement', placementUpdate)



app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})