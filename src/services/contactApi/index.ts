import { ApiCaller } from '../apiCaller';

export class ContactService {
  static getAll = () => {
    return ApiCaller.httpGet(`contacts`);
  };
  static add = (data: any) => {
    return ApiCaller.httpPost(data, `contacts`);
  };
  static delete = (id: string) => {
    return ApiCaller.httpDelete(`contacts/${id}`);
  };
}
