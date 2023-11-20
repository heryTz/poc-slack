/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {
  /** only in axios interceptor config*/
  loading?: boolean;
  showError?: boolean;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class AuthService {
  /**
   *
   */
  static signin(
    params: {
      /** requestBody */
      body?: SigninInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/auth/signin';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static signup(
    params: {
      /** requestBody */
      body?: CreateUserInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/auth/signup';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static verifyOtp(
    params: {
      /** requestBody */
      body?: VerifyOtpInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<VerifyOtpResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/auth/verifyOtp';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class UsersService {
  /**
   *
   */
  static me(options: IRequestOptions = {}): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users/me';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static find(options: IRequestOptions = {}): Promise<UserResponse[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/users/find';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class MessageService {
  /**
   *
   */
  static find(
    params: {
      /**  */
      channelId?: number;
      /**  */
      receiverId?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/message/find';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { channelId: params['channelId'], receiverId: params['receiverId'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class ChannelService {
  /**
   *
   */
  static create(
    params: {
      /** requestBody */
      body?: CreateChannelInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ChannelResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/channel/create';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static find(options: IRequestOptions = {}): Promise<ChannelResponse[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/channel/find';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static channel(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<ChannelResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/api/channel/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export interface SigninInput {
  /**  */
  email: string;
}

export interface UserResponse {
  /**  */
  id: number;

  /**  */
  email: string;

  /**  */
  name: string;
}

export interface CreateUserInput {
  /**  */
  email: string;

  /**  */
  name: string;
}

export interface VerifyOtpInput {
  /**  */
  otp: string;

  /**  */
  email: string;
}

export interface VerifyOtpResponse {
  /**  */
  token: string;

  /**  */
  refreshToken: string;

  /**  */
  data: UserResponse;
}

export interface CreateChannelInput {
  /**  */
  name: string;
}

export interface ChannelResponse {
  /**  */
  id: number;

  /**  */
  name: string;

  /**  */
  createdAt: Date;
}
