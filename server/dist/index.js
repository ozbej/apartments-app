"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8000;
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'mcltypct',
    host: 'hattie.db.elephantsql.com',
    database: 'mcltypct',
    password: '5JvaPQTf4pTkND1gqkvNAqjSn_zWsNAA',
    port: 5432,
});
const getUsers = (request, response) => {
    pool.query('SELECT * FROM apartments', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/apartments', getUsers);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
