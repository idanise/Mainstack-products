const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
import { query } from "express-validator";
import { connectToDatabase } from "./src/Services/database.service";
import authRoute from "./src/Routes/authRoutes";
import categoryRoute from "./src/Routes/categoryRoute";
import productRoute from "./src/Routes/productRoute";
import * as bodyParser from "body-parser";
import { logger } from "./logger";
import morganMiddleware from "./morganMiddleware";
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGO_uri as string;

connectToDatabase();

const PORT = process.env.PORT;

const app = express();
app.use(morganMiddleware);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(query());
app.use("/api/user", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

const server = app.listen(PORT, () => {
  logger.info(`App has started on port ${PORT}`);
});

export default server;
