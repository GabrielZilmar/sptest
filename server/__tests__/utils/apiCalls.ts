import request from 'supertest';
import app from '../../src/index';

export default {
  listUsers: (query: any) => request(app)
    .get('/users')
    .query(query)
    .catch((err: any) => err),

  showUserDetails: (param: any) => request(app)
    .get(`/users/${param}/details`)
    .catch((err: any) => err),

  showUserRepos: (param: any) => request(app)
    .get(`/users/${param}/repos`)
    .catch((err: any) => err),

  close: () => app.close(),
};
