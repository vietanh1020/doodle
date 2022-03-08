"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = require('./routes');
const app = (0, express_1.default)();
const port = 3001;
const db = require('./config/dbConfig');
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).json("LÊN");
});
app.listen(port, () => {
    console.log('The application is listening on port ' + port);
});
route(app);
