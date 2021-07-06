import express from 'express';

const routes = express.Router();

routes.get('/', (req: any, res: any) => res.status(200).send('Hello World!'));

export default routes;
