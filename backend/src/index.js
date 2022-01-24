const express = require('express');
const morgan = require('morgan');
const route = require('./routes');
const cors = require('cors');
const app = express();
const port = 5000;

const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(
    express.urlencoded({
        extended: true,
    }),
    cors(),
);

//HTTP logger
app.use(morgan('combined'));

//Routes init
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(flash());

app.use(session({
  secret: 'asdfjalsadsf',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000*60*60*24,
}

}));
app.use(passport.initialize());
app.use(passport.session());

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
