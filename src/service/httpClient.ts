export enum HttpMethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export interface RequestConfig<TRequest> {
  method: HttpMethodEnum;
  headers?: Headers;
  body?: TRequest;
}

export interface HttpClientInterface {
  request<TRequest, TResponse>(
    endpoint: string,
    config: RequestConfig<TRequest>
  ): Promise<TResponse>;
  get<TResponse>(
    endpoint: string,
    options?: Omit<RequestConfig<void>, "method" | "body">
  ): Promise<TResponse>;
  post<TResponse, TRequest>(
    endpoint: string,
    data?: TRequest,
    options?: Omit<RequestConfig<void>, "method" | "body">
  ): Promise<TResponse>;
  setAuthToken(token: string): void;
}

export class HttpClient implements HttpClientInterface {
  private static _instance: HttpClient;
  private baseUrl: string;
  private authToken?: string;

  private constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public static getInstance(baseUrl: string): HttpClient {
    if (!this._instance) {
      this._instance = new HttpClient(baseUrl);
    }
    return this._instance;
  }

  public setAuthToken(token: string): void {
    this.authToken = token;
  }

  private getHeaders(
    customHeaders?: Record<string, string> | Headers
  ): Headers {
    const headers = new Headers();

    // Add default headers
    headers.append("Content-type", "application/json");
    if (this.authToken) {
      headers.append("Authorization", `Bearer ${this.authToken}`);
    }

    // Add custom headers
    if (customHeaders) {
      if (customHeaders instanceof Headers) {
        customHeaders.forEach((value, key) => {
          headers.append(key, value);
        });
      } else {
        Object.entries(customHeaders).forEach(([key, value]) => {
          headers.append(key, value);
        });
      }
    }

    return headers;
  }

  public async request<TResponse, TRequest = void>(
    endpoint: string,
    config: RequestConfig<TRequest>
  ): Promise<TResponse> {
    const url = `${this.baseUrl}${endpoint}`;

    const requestConfig = {
      method: config.method,
      headers: this.getHeaders(config.headers),
      body: config.body ? JSON.stringify(config.body) : undefined,
    };
    const response = await fetch(url, requestConfig);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async get<TResponse>(
    endpoint: string,
    options?: Omit<RequestConfig<void>, "method" | "body">
  ): Promise<TResponse> {
    return this.request(endpoint, {
      method: HttpMethodEnum.GET,
      headers: options?.headers ?? undefined,
    });
  }

  async post<TRequest, TResponse>(
    endpoint: string,
    data?: TRequest,
    options?: Omit<RequestConfig<void>, "method" | "body">
  ): Promise<TResponse> {
    return this.request(endpoint, {
      method: HttpMethodEnum.POST,
      body: data,
      headers: options?.headers ?? undefined,
    });
  }
}
