const express = require("express");
const app = express();
const ErrorHandler = require("./utils/errorHandler");
const cors = require("cors");
const allowedOrigins = [
  "http://localhost:3000",
  "https://dailydoer-web-application-frontend.vercel.app",
  "https://dailydoer-web-application-frontend-iamgauravkhare.vercel.app",
  "https://dailydoer-web-application-frontend-git-master-iamgauravkhare.vercel.app",
];
const corsOptions = {
  origin: true,
  credentials: true,
  exposedHeaders: "Set-Cookie",
  // allowedHeaders: [
  //   "Access-Control-Allow-Origin",
  //   "Access-Control-Allow-Credentials",
  //   "Content-Type",
  //   "Authorization",
  // ],
  // optionSuccessStatus: 200,
  // Headers: true,
  // methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
};
app.use(cors(corsOptions));
const { generateError } = require("./middlewares/generateError");
require("dotenv").config({ path: "./.env" });
require("./models/database").connectDatabase();
const logger = require("morgan");
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const session = require("express-session");
// const connectMongo = require('connect-mongo');
// const MongoStore = new connectMongo(session);
// const mongoStoreInstance = MongoStore({
//   mongooseConnection: mongoose.connection,
// });

// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: process.env.EXPRESS_SESSION_SECRET,
//     cookie: {
//       secure: true, // Set this to true for HTTPS only
//       sameSite: "none", // Set this to 'none' for cross-site cookie
//       httpOnly: true,
//     },
//     // secret: process.env.EXPRESS_SESSION_SECRET, // Replace with your secret key
//     // resave: false,
//     // saveUninitialized: false,
//     // store: mongoStoreInstance
//   })
// );

const MongoStore = require("connect-mongo");
// new code --------------------]

app.set("trust proxy", 1);
// app.enable("trust proxy");
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    // name: 'dahskjhdaskjhash',
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      touchAfter: 24 * 3600, // time period in seconds
    }),
    cookie: {
      secure: true,
      sameSite: "none",
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 60 * 60 * 1000
      ),
    },
  })
);

// new code --------------------]
const cookieparser = require("cookie-parser");
app.use(cookieparser());
const fileUpload = require("express-fileupload");
app.use(fileUpload());
app.use("/api/v1", require("./routes/indexRoutes"));

app.get("/", (req, res) => {
  res.send("Server is up! 😉");
});
app.all("*", (req, res, next) => {
  next(
    new ErrorHandler(
      `Something went wrong at ${req.url}, requested page not found!`,
      404
    )
  );
});
app.use(generateError);
app.listen(
  process.env.PORT,
  console.log(
    `Backend server is running on http://localhost:${process.env.PORT}`
  )
);
