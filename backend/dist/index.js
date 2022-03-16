"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDB = require('./config/dbConfig');
require("dotenv/config");
const app = (0, express_1.default)();
const port = 3001;
const route = require('./routes');
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.json());
connectDB();
app.listen(port, () => {
    console.log('The application is listening on port 3001');
});
route(app);
