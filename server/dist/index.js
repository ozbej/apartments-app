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
const getApartments = (request, response) => {
    pool.query('SELECT * FROM apartments', (error, results) => {
        if (error)
            response.status(500).json({ message: "Error in invocation of API: /apartments" });
        else
            response.status(200).json(results.rows);
    });
};
const getApartmentImages = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query("SELECT ai.link FROM apartments a INNER JOIN apartment_images ai ON a.id = ai.apartment_id WHERE ai.apartment_id = $1", [id], (error, results) => {
        if (error)
            response.status(500).json({ message: "Error in invocation of API: /apartment_images/:id" });
        else {
            let rows = [];
            results.rows.forEach((element) => {
                rows.push(element.link);
            });
            response.status(200).json(rows);
        }
    });
};
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/apartments', getApartments);
app.get('/apartment_images/:id', getApartmentImages);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
