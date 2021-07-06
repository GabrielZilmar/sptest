import Axios from 'axios';

interface IfetchAPIProps {
  method: string;
  url: string;
  body?: any;
}

const fetchAPI = async (props: IfetchAPIProps): Promise<any> => {
  const { method, url, body } = props;

  const api = Axios.create({ baseURL: 'http://localhost:8000' });

  switch (method) {
    case 'post': {
      let response;
      await api.post(url, body, {
      }).then((data) => {
        response = data;
      }).catch((error) => {
        response = error.response;
      });
      return response;
    }
    case 'get': {
      let response;
      await api.get(url, {
      }).then((data) => {
        response = data;
      }).catch((error) => {
        response = error.response;
      });
      return response;
    }
    case 'delete': {
      let response;
      await api.delete(url, {
      }).then((data) => {
        response = data;
      }).catch((error) => {
        response = error.response;
      });
      return response;
    }
    case 'put': {
      let response;
      await api.put(url, body, {
      }).then((data) => {
        response = data;
      }).catch((error) => {
        response = error.response;
      });
      return response;
    }

    default:
      break;
  }

  return { error: 'Invalid method!' };
};

export default fetchAPI;
