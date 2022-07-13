import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export abstract class BaseAPI {
   protected baseUrl: string;
   private axiosInstance: AxiosInstance;

   protected constructor(baseUrl: string) {
      this.baseUrl = baseUrl
      this.axiosInstance = axios.create({})
   }

   protected get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
      return this.axiosInstance.get<T, R, D>(`${this.baseUrl}${url}`, config)
   }

   protected delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
      return this.axiosInstance.delete<T, R, D>(`${this.baseUrl}${url}`, config)
   }

   protected post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
      return this.axiosInstance.post<T, R, D>(`${this.baseUrl}${url}`, data, config)
   }

   protected put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
      return this.axiosInstance.put<T, R, D>(`${this.baseUrl}${url}`, data, config)
   }

   protected patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
      return this.axiosInstance.patch<T, R, D>(`${this.baseUrl}${url}`, data, config)
   }
}
