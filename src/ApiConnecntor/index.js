import ApiConnector from './RestClient';
const ROOT = 'https://ruprice.flareon.ru/api/entities';

class ApiAction {
  static getCities() {
    return ApiConnector.getAxios(`${ROOT}/cities`);
  }

  static getRetailerByCities(data) {
    return ApiConnector.postAxios(`${ROOT}/retailer-by-city`, data);
  }
  static findByParams(data) {
    return ApiConnector.postAxios(`${ROOT}/find-by-params`, data);
  }
  static getOffer(data) {
    return ApiConnector.postAxios(`${ROOT}/offer`, data);
  }
}
export default ApiAction;
