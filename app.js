const path = require('path');

const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const ejs = require('ejs');
const { sequelize } = require('./models');

const passport = require('passport');
const passportConfig = require('./passport');
const boardrouter = require('./board');
const boardpost = require('./board/board');
const indexrouter = require('./routes');
const member = require('./routes/member');


dotenv.config();
passportConfig();

const app = express();
app.set('port', process.env.PORT || 3000);

app.set('views engine', 'ejs');


sequelize.sync({ force: false })
  .then(() => {})
  .catch(err => console.error(err));

app.use(
    morgan('dev'),
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(process.env.SECRET),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
})

app.use('/member',member);
app.use('/board',boardpost);
app.use('/',indexrouter);
app.use('/',boardrouter);


// app.use((req, res, next) => {
//     res.locals.isAuthenticated  = req.isAuthenticated();
//     res.locals.currentUser = req.user;
//     next();
// });

// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).send(err);
// });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});


