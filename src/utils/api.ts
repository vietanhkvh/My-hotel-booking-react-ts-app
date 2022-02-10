import axios, {
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
    Cancel,
    Canceler,
  } from 'axios';
  // import { sha256 } from 'js-sha256';
  // import JSONbig from 'json-bigint';
  import { some, ACCESS_TOKEN, DEVICE_ID } from '../const/keyString';
  import { configs } from './serverConfig';
  import { getPlatform, isEmpty, isServer } from './helpers';
  import { checkApiResponse } from './checkApiResponse';
  import sha256 from 'crypto-js/sha256';
  // import hmacSHA512 from 'crypto-js/hmac-sha512';
  import Base64 from 'crypto-js/enc-base64';
  
  const key = `${
    getPlatform() === 'website'
      ? process.env.NEXT_PUBLIC_APP_ID
      : process.env.NEXT_PUBLIC_APP_ID_MOBILE
  }_v2021-05-03`;
  if (!isServer()) {
    let deviceId = '';
    deviceId = `${new Date().valueOf()}-${Math.random()}`;
    const value = localStorage.getItem(key);
    if (value === null) {
      localStorage.setItem(key, deviceId);
    } else {
      deviceId = value;
    }
  }
  const request = axios.create({
    baseURL: configs().BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'device-id': !isServer() ? `${localStorage.getItem(key)}` : '',
      deviceInfo: 'PC-Web',
      version: configs().VERSION,
      // appHash: AppHash,
      appId: configs().APP_ID,
      'ca-id': '17',
    },
  });
  
  request.interceptors.request.use(
    (config: some) => {
      if (config?.readonlyOption) return config;
  
      const timestamp = new Date().getTime();
      const timestampCS = timestamp / 1000 - ((timestamp / 1000) % 300);
      const appHash = Base64.stringify(
        sha256(`${timestampCS}:${configs().APP_KEY}`)
      );
      let temp = {
        ...config,
        headers: {
          ...config?.headers,
          appHash,
          'device-id': !isServer() ? `${localStorage.getItem(DEVICE_ID)}` : '',
        },
      };
      if (
        (!isServer() && isEmpty(localStorage.getItem(ACCESS_TOKEN))) ||
        config.url.includes('/login')
      ) {
        delete temp.headers[`login_token`];
      }
      // config.headers.Authorization = localStorage.getItem('token-key');
      // console.log('config', config.url, typeof config?.headers?.login_token);
      const localToken = localStorage.getItem('token-key');
      // console.log('localToken', localToken);
  
      if (config?.headers?.login_token === undefined)
        temp.headers['login_token'] = localToken;
      else {
        temp.headers['login_token'] = config?.headers?.login_token;
      }
      return temp;
    },
    (error) => Promise.reject(error)
  );
  
  export interface EnhanceAxiosPromise<T> extends AxiosPromise<T> {
    /**
     * Request will be canceled if call this function
     */
    cancel: Function;
    /**
     * This function help check that request can be canceled or not
     */
    isCancelable: Function;
  }
  
  export interface EnhanceAxiosResponse<T> extends AxiosResponse<T, T> {
    /**
     * error
     */
    error?: any;
    /**
     * isOK
     */
    isSuccess: boolean;
  }
  
  export interface EnhanceAxiosRequestConfig<T> extends AxiosRequestConfig<T> {
    /**
     * This option will make timeout before request is executed
     */
    timeoutAction?: number;
    /**
     * This option will ignore throw error message by cancel request
     */
    throwCancelError?: boolean;
    /**
     * Auto notify error on screen
     */
    notifyError?: boolean;
  }
  
  const handleRequest =
    (baseOption?: AxiosRequestConfig<any>) =>
    (url: string, options?: EnhanceAxiosRequestConfig<any>) => {
      let timeoutActionCancel = -1;
      /**
       * This cancelFunction is used to cancel request
       */
      let cancelFunction;
      /**
       * If isCancelable === true then this request still can be canceled
       */
      let isCancelable = true;
      /**
       *
       */
      const throwCancelError = options?.throwCancelError || false;
      /**
       * Create new promise that return main axios request promise
       */
      const promise: EnhanceAxiosPromise<any> = new Promise((resolve, reject) => {
        const timeoutAction = options?.timeoutAction || 0;
        /**
         * Action function that will be executed after timeoutAction is end
         */
        const actionFunction = async () => {
          let errorClb: Function | undefined;
          try {
            const cancelTokenSource = axios.CancelToken.source();
            /** The Second definition of cancelFunction, it can be called if actionFunction is executed */
            cancelFunction = (clb?: Function) => {
              errorClb = clb;
              cancelTokenSource.cancel('Cancel request');
            };
            /**
             * Make axios request
             */
            const response = (await request({
              baseURL: configs().BASE_URL,
              url,
              ...baseOption,
              ...options,
              headers: { 'Accept-Language': 'vi', ...options?.headers },
              cancelToken: cancelTokenSource.token,
              timeout: 2000,
            })) as EnhanceAxiosResponse<any>;
            /**
             * resolve response when it come
             */
  
            checkApiResponse({
              response,
              resolve,
              reject,
              notifyError: options?.notifyError,
            });
            isCancelable = false;
          } catch (error: any) {
            /**
             * If error happened then notify the rejection
             */
            if (
              (!throwCancelError && error?.message !== 'Cancel request') ||
              throwCancelError
            )
              reject(error);
            isCancelable = false;
            if (errorClb) errorClb(error);
          }
        };
        /** The First definition of cancelFunction, it can be called if actionFunction is not executed */
        cancelFunction = (clb?: Function) => {
          clearTimeout(timeoutActionCancel);
          const canceler: Cancel = {
            message: 'Cancel request before timeoutAction value',
          };
          if (throwCancelError) reject(canceler);
          if (clb) clb(canceler);
        };
        timeoutActionCancel = window.setTimeout(actionFunction, timeoutAction);
      }) as EnhanceAxiosPromise<any>;
      promise.cancel = (clb?: Function) => {
        if (cancelFunction) cancelFunction(clb);
      };
      promise.isCancelable = () => isCancelable;
      return promise as EnhanceAxiosPromise<any>;
    };
  
  export const api = {
    request: handleRequest(),
    get: handleRequest({ method: 'get' }),
    post: handleRequest({ method: 'post' }),
    delete: handleRequest({ method: 'delete' }),
    put: handleRequest({ method: 'put' }),
  };
  