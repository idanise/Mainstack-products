"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express_validator_1 = require("express-validator");
const database_service_1 = require("./src/Services/database.service");
const authRoutes_1 = __importDefault(require("./src/Routes/authRoutes"));
const categoryRoute_1 = __importDefault(require("./src/Routes/categoryRoute"));
const productRoute_1 = __importDefault(require("./src/Routes/productRoute"));
const bodyParser = __importStar(require("body-parser"));
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGO_uri;
(0, database_service_1.connectToDatabase)();
const PORT = process.env.PORT;
const logger = require('pino')();
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use((0, express_validator_1.query)());
app.use("/api/user", authRoutes_1.default);
app.use("/api/category", categoryRoute_1.default);
app.use("/api/product", productRoute_1.default);
const server = app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
    logger.info("App has started");
});
exports.default = server;
