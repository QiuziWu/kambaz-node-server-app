import express from "express";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import session from "express-session";

const app = express();
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
app.use(cors());
Lab5(app);
app.listen(4000);
