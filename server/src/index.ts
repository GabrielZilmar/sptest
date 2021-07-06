import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import GithubRoutes from './routers/github';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(GithubRoutes);

const server = app.listen(process.env.PORT || 8000);

export default server;
