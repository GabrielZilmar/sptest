import fetchAPI from '../../utils/functions/request';

const HttpClient = {
  listUsers: async () => fetchAPI({
    method: 'get',
    url: '/users',
  }),
  getUser: async (login: string) => fetchAPI({
    method: 'get',
    url: `/users/${login}/details`,
  }),
  getRepos: async (login: string) => fetchAPI({
    method: 'get',
    url: `/users/${login}/repos`,
  }),
};

export default HttpClient;
