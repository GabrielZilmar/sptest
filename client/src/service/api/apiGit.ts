import fetchAPI from '../../utils/functions/request';

const HttpClient = {
  listUsers: async (since: number, perPage: number) => fetchAPI({
    method: 'get',
    url: `/users?since=${since}&perPage=${perPage}`,
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
