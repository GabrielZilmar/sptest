import fetchAPI from '../../utils/functions/request';

const HttpClient = {
  listUsers: async () => fetchAPI({
    method: 'get',
    url: '/users',
  }),
};

export default HttpClient;
