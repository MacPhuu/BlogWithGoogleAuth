import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiEndPointPayload } from './payload'
import { CONFIG } from '../index'



const api = axios.create({
  baseURL: CONFIG.APP_URL as string,
})

interface UseCallApiProps {
  endPoint: string
  method: AxiosRequestConfig['method']
  payload?: ApiEndPointPayload
  headers?: AxiosRequestConfig['headers']
  params?: AxiosRequestConfig['params']
}

interface UseCallApiResponse {
  response: AxiosResponse | null
  error: any
}

export const apiCall = async (props: UseCallApiProps): Promise<UseCallApiResponse> => {
  const { endPoint, headers, method, params, payload } = props

  try {
    const result = await api.request({
      method,
      url: endPoint,
      headers,
      data: payload,
      params,
    })

    return {
      response: result,
      error: null,
    }
  } catch (error) {
    return {
      response: null,
      error,
    }
  }
}
