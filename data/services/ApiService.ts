import axios, { AxiosInstance } from 'axios';

export class ApiService {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
  }

  async post<T>(url: string, data: any,token?: string): Promise<T> {
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
      if (data instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data'
    } else {
       headers['Content-Type'] = 'application/json';
    }
  
    const response = await this.client.post<T>(url, data, { headers });
    return response.data;
  }
  async get<T>(endpoint: string, token?: string, params?:any ): Promise<{ data: T }> {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    if(params) {
      return this.client.get(endpoint, { headers , params});
    } else {
      return this.client.get(endpoint, { headers });

    }
  }
  
  async patch<T>(url: string, data: any, options: any = {}): Promise<T> {
    const response = await this.client.patch<T>(url, data, options);
    return response.data;
  }

}
