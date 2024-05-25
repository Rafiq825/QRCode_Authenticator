const express = require('express');
const Datastore = require('nedb-promises');
const userRoutes= require('./routes/usersRoutes')


const app = express();

app.use(express.json());

const port= 3000;

app.use('/api/auth', userRoutes)

app.listen(port, () => {
    console.log(`Server has been started:http://localhost:${port}`);
})