import express from 'express';

import GithubController from '../app/controller/github';

const routes = express.Router();

routes.get('/', (req: any, res: any) => res.status(200).send('SPTEST ZILMAR API!'));
routes.get('/users?', GithubController.list);
routes.get('/users/:username/details', GithubController.showUserDetails);
routes.get('/users/:username/repos', GithubController.showUserRepos);

export default routes;
