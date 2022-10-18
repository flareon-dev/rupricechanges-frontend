import axios from 'axios';

class RestClient {
  static getAxios(url) {
    const config = {
      method: 'get',
      url: `${url}`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('authenticatedToken'),
      },
    };
    return axios(config);
  }
  static postAxios(url, id) {
    const config = {
      method: 'post',
      url: `${url}`,

      headers: localStorage.getItem('authenticatedToken')
        ? {
            Authorization: 'Bearer ' + localStorage.getItem('authenticatedToken'),
          }
        : null,
      data: id,
    };
    return axios(config);
  }
}

export default RestClient;
