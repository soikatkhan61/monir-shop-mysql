const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')
const session = require('express-session')

const authRoute = require('./routes/auth.route');
//import middleware
const setMiddleware = require("./middlewares/middleware")
//import route
const setRoutes = require("./routes/routes")

const { httpLogStream } = require('./utils/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());

//setup view engine
app.set('view engine' ,'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')));




setMiddleware(app)

//set the routes from routes directory
setRoutes(app)


app.use((err, req, res, next) => {
    res.send(err)
   console.log(err)
});

module.exports = app;