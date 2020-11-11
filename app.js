const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// connect to database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('connected to DB!');
})

// import post routes
const postRoute = require('./routes/postRoutes')

app.use('/posts', postRoute)

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
})

//set port
let port = process.env.PORT || 80

// run server
try {
    app.listen(port);
    console.log('app running');
} catch (error) {
    console.log('error found:\n', error);
}