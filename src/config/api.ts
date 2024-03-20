import axios, { AxiosError } from "axios"
import { baseUrl } from "./constants"
import { ApiError, handleError } from "./configuration";

const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true
})

export const reduxRequest = async (
  method: string,
  route: any,
  body: any,
  config: any,
  rejectWithValue: any
) => {
  const requestConfig = {
    method,
    url: route,
    data:body,
    config,
  };
  try {
    const response = await instance(requestConfig);
    return response;
  } catch (error: any) {
    const axiosError = error as AxiosError<ApiError>;
    return handleError(axiosError, rejectWithValue);
  }
}

export const commonRequest = async (
  method: string,
  route: any,
  config: any,
  body?: any,
) => {
  const requestConfig = {
    method,
    url: route,
    headers: config,
    data:body,
  };
  try {
    const response = await instance(requestConfig);
    return response;
  } catch (error: any) {
    return error
  }
}