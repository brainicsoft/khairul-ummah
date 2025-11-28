import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import passport from "passport";

const middleware = [
  morgan("dev"),

  // ✅ Allow ALL origins manually (credentials এর সাথে compatible)
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    next();
  },

  // NOTE: cors() নিচে দিতে পারো, blocking করবে না
  cors({
    origin: true,
    credentials: true,
  }),

  cookieParser(),
  express.static("docs"),
  express.json({ limit: "50mb" }),
  urlencoded({ extended: true }),

  session({
    secret: "hello",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    },
  }),

  passport.initialize(),
  passport.session(),
  passport.authenticate("session"),
];

export default middleware;
