import { IRestResponse } from '@models';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
const BASE_URL = 'https://reqres.in/api/products';
import { get } from 'lodash';

export interface RequestHandlerType {
  method: 'PUT' | 'POST' | 'GET' | 'DELETE';
  url: string;
  extract: string | number | symbol;
  defaultValue?: [] | '' | null | undefined | '' | 0 | true | false | {};
}
const useFetch = (props: RequestHandlerType) => {
  const { method, url, extract, defaultValue } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData]: [any, any] = useState();

  useEffect(() => {
    console.log('calling');

    if (method === 'DELETE') {
      handleDeleteRequest();
    } else if (method === 'GET') {
      handleGetRequest();
    } else if (method === 'POST') {
      handlePostRequest();
    } else if (method === 'PUT') {
      handlePutRequest();
    }
  }, [props]);
  const handleGetRequest = async (): Promise<any> => {
    try {
      setLoading(true);
      const finalUrl = BASE_URL + url;
      const headers = {
        authorization: Cookies.get('token')
      };
      const config: AxiosRequestConfig = { headers };
      let res: AxiosResponse<IRestResponse> = await axios.get(finalUrl, config);
      res = await get(res, extract, defaultValue || null);
      setData(res);
      return res;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
    // const finalUrl = BASE_URL + url;
    // const headers = {
    //   authorization: Cookies.get('token')
    // };
    // const config: AxiosRequestConfig = { headers };
    // return axios
    //   .get(finalUrl, config)
    //   .then(setData)
    //   .catch((err) => setError(err))
    //   .finally(() => setLoading(false));
  };
  const handlePostRequest = async (): Promise<any> => {
    try {
      setLoading(true);
      const finalUrl = BASE_URL + url;
      const headers = {
        authorization: Cookies.get('token'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
      const config: AxiosRequestConfig = { headers };
      let res: AxiosResponse<IRestResponse> = await axios.post(finalUrl, config);
      res = get(res, extract, defaultValue || null);
      setData(res);
      return res;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const handlePutRequest = async (): Promise<any> => {
    try {
      setLoading(true);
      const finalUrl = BASE_URL + url;
      const headers = {
        authorization: Cookies.get('token'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
      const config: AxiosRequestConfig = { headers };
      let res: AxiosResponse<IRestResponse> = await axios.put(finalUrl, config);
      res = get(res, extract, defaultValue || null);
      setData(res);
      return res;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteRequest = async (): Promise<any> => {
    try {
      setLoading(true);
      const finalUrl = BASE_URL + url;
      const headers = {
        authorization: Cookies.get('token')
      };
      const config: AxiosRequestConfig = { headers };
      let res: AxiosResponse<IRestResponse> = await axios.delete(finalUrl, config);
      res = get(res, extract, defaultValue || null);
      setData(res);
      return res;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    data,
    handleGetRequest,
    handleDeleteRequest,
    handlePostRequest,
    handlePutRequest
  };
};

export { useFetch };

// const { data, isLoading, hasError, handleRequest } = useRequestHandler();
