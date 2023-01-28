import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = 8000;

const Pool: any = require('pg').Pool
const pool: any = new Pool({
  user: 'mcltypct',
  host: 'hattie.db.elephantsql.com',
  database: 'mcltypct',
  password: '5JvaPQTf4pTkND1gqkvNAqjSn_zWsNAA',
  port: 5432,
})

const getUsers = (request: Request, response: Response) => {
  pool.query('SELECT * FROM apartments', (error: any, results: any) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/apartments', getUsers);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});