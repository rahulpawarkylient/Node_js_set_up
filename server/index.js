import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"
import Connection from "./db/Connection.js";
import userRouter from "./routers/userRoute.js"

const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(cors());

app.use(morgan('dev'))

//mongodb connection using dotenv
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

//convert in json form
app.use(express.json({ limit: "5mb" }));

// Routes
app.use("/api/", userRouter);

// for testing only
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
