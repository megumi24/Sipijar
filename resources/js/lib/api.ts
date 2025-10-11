import { login } from '@/routes';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface JSONResponse<T = any> {
  data: T;
  [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PaginatedJSONResponse<T = any> extends JSONResponse<T> {
  links: {
    first: string;
    last: string;
    next?: string;
    prev?: string;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links?: unknown;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export class AppError extends Error {
  constructor(
    message?: string,
    public meta?: Record<string, unknown>,
  ) {
    super(message);
  }
}
export class ValidationError extends AppError {
  constructor(
    message: string,
    public meta: {
      errors: {
        [key: string]: string[];
      };
    },
  ) {
    super(message, meta);
  }
}

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401)
      return new Promise((res) => res(login()));
    return Promise.reject(error);
  },
);
export default api;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const get = async <T = any, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
) => {
  const { data } = await api.get<JSONResponse<T>>(url, config);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = async <T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
) => {
  try {
    const { data: responseData } = await api.post<JSONResponse<T>>(
      url,
      data,
      config,
    );
    return responseData;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422)
        throw new ValidationError(error.response.data.message, {
          errors: error.response.data.errors,
        });
      throw new AppError(error.message, error.response?.data);
    }
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const del = async <T = any, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
) => {
  try {
    const { data: responseData } = await api.delete<JSONResponse<T>>(
      url,
      config,
    );
    return responseData;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422)
        throw new ValidationError(error.response.data.message, {
          errors: error.response.data.errors,
        });
      throw new AppError(error.message, error.response?.data);
    }
    throw error;
  }
};
