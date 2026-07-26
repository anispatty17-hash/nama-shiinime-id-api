import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const upstreamBaseUrl = process.env.UPSTREAM_BASE_URL ?? 'https://www.sankavollerei.web.id';
const requestTimeout = Number(process.env.REQUEST_TIMEOUT ?? 12000);
const maxRetries = Number(process.env.MAX_RETRIES ?? 2);

const client: AxiosInstance = axios.create({
  baseURL: upstreamBaseUrl,
  timeout: requestTimeout,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (compatible; ShiinimeIdProxy/1.0)',
    Referer: upstreamBaseUrl,
  },
});

client.interceptors.request.use((config) => {
  console.log(`[proxy] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.error('[proxy] request failed', error.message);
    return Promise.reject(error);
  },
);

export async function proxyRequest<T = unknown>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      const response = await client.request<T>({
        url: path,
        ...config,
      });
      return response.data;
    } catch (error) {
      lastError = error;
      if (attempt >= maxRetries) {
        throw error;
      }
    }
  }

  throw lastError;
}

export function buildApiResponse<T>(data: T, message = 'Success') {
  return {
    success: true,
    message,
    data,
  };
}

export function buildApiError(message: string, error: unknown, data = null) {
  return {
    success: false,
    message,
    error: error instanceof Error ? error.message : String(error),
    data,
  };
}
