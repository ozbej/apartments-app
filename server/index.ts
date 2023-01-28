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

const getApartments = (request: Request, response: Response) => {
  pool.query('SELECT * FROM apartments', (error: any, results: any) => {
    if (error)
      response.status(500).json({ message: "Error in invocation of API: /apartments"});
    else
      response.status(200).json(results.rows)
  })
}

const getApartmentImages = (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id);
  pool.query("SELECT ai.link FROM apartments a INNER JOIN apartment_images ai ON a.id = ai.apartment_id WHERE ai.apartment_id = $1",
  [id], (error: any, results: any) => {
    if (error)
      response.status(500).json({ message: "Error in invocation of API: /apartment_images/:id" })
    else
      response.status(200).json(results.rows)
  })
}

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/apartments', getApartments);

app.get('/apartment_images/:id', getApartmentImages);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});