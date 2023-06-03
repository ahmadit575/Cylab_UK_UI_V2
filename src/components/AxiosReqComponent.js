import { SessionExpried } from 'Functions';
import axios from 'axios';

const handleRequestError = (error, navigate) => {
  if (error.response) {
    const { status } = error.response;

    if (status === 401) {
      // Redirect to login
      SessionExpried(navigate);
    } else if (status === 502) {
      throw new Error('Bad Gateway');
    } else {
      throw error;
    }
  } else {
    throw error;
  }
};

const AxiosRequestComponent = ({ url, payload, method, token, navigate }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: process.env.REACT_APP_API_URL + url,
      data: payload,
      headers: {authorization: `Bearer ${token}`},
    })
      .then(response => resolve(response.data))
      .catch(error => {
        try {
          handleRequestError(error, navigate);
        } catch (error) {
          reject(error);
        }
      });
  });
};

export default AxiosRequestComponent;
