if (process.env.NODE_ENV !== 'production'){
   require('dotenv').config()
}

var express = require('express');
var app = express();
const bodyParser = require("body-parser");
const AuthRouter = require('./routes/users')
const indexRouter = require('./routes/index');
const BookingRouter = require('./routes/bookings');
const passportConfig = require('./passportConfig');
const ProfileRouter = require('./routes/profile');
const passportKey = require('./passportKey');
const passport = require("passport");
const cookieSession = require("cookie-session");
const mongoose = require('mongoose');
const methodOverride = require('method-override');
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});

const db = mongoose.connection;
db.on("error", function error (){
   console.error(error)
});
db.once("open", function error (){
   console.log("connected")
});
app.use(cookieSession({
   maxAge:24*60*60*1000,
   keys:[passportKey.session.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.set("layout", __dirname+"/views/layout");
app.use(express.static("public"));
app.use('/profile', ProfileRouter);
app.use('/', indexRouter);
app.use('/bookings', BookingRouter);
app.use('/auth',AuthRouter);






app.listen(process.env.PORT || 3000);