export interface IRestResponse {
  type: string;
  data: any;
  status: number;
  success: boolean;
  message: string;
  moreInfo?: any;
}
