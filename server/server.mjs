import express from 'express';
const app = express();
import 'dotenv/config'
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let PORT = process.env.PORT || 3000
import placementUpdate from './routes/palcement_routes.mjs'


app.use('/api/placement', placementUpdate)


app.get('/', (req, res) => {
    
})



app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})