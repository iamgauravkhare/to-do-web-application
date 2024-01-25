const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const cookieparser = require("cookie-parser");
const logger = require("morgan");
const ErrorHandler = require("./utils/errorHandler");
const { generateError } = require("./middlewares/generateError");
require("./models/database").connectDatabase();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://daily-doer.vercel.app",
  "https://daily-doer-iamgauravkhare.vercel.app",
  "https://daily-doer-git-master-iamgauravkhare.vercel.app",
  "https://*.onrender.com",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  exposedHeaders: "Set-Cookie",
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Content-Type",
    "Authorization",
  ],
  // optionSuccessStatus: 200,
  Headers: true,
  // methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      touchAfter: 24 * 3600,
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
app.use(cookieparser());
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
  PORT,
  console.log(`Backend server is running on http://localhost:${PORT}`)
);
