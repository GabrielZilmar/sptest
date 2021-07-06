import fetch from 'node-fetch';

export default {
  list: async (req: any): Promise<any> => {
    const since = req.query?.since || 0;
    const perPage = req.query?.perPage || 30;

    if (since < 0 || perPage <= 0 || perPage > 100) {
      return {
        message: 'Request error, invalid queries!',
        error: 'The queries need to be numbers. Since need to be >= 0 and perPage > 0 and < 100',
      };
    }

    const users = await fetch(`https://api.github.com/users?since=${since}&per_page=${perPage}`, {
      method: 'GET',
      body: undefined,
    })
      .then((response: any) => response.json())
      .catch((error: any) => ({
        message: 'Request error!',
        error: error.message,
        response: error.response,
      }));

    return users;
  },
};
