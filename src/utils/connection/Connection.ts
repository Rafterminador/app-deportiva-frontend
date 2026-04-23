import { getToken, logoutToken } from "@utils/security/Security";

const freeRoutes = ['users/login'];

interface FetchResponse<Data = unknown> {
    statusCode: number;
    responseData: Data | null;
    error?: string;
    headers?: Record<string, string>;
}

const baseURL: string = import.meta.env.VITE_APP_URL;
const basePath: string = "deportivos-shop/api/";

const buildUrl = (url: string, params?: Record<string, any>): string => {
    if (!params) return url;
    return Object.keys(params).reduce((acc, key) => acc.replace(`{${key}}`, params[key]), url);
};

async function fetchData<Data = unknown>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    params?: Record<string, any>,
    body?: any,
    token?: string,
): Promise<FetchResponse<Data>> {
    try {
        const finalUrl = buildUrl(baseURL + basePath + url, params);
        const isFreeRoute = freeRoutes.some(route => finalUrl.includes(route));
        const storedToken = getToken();

        const response = await fetch(finalUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(!isFreeRoute && storedToken ? { 'Authorization': `Bearer ${storedToken}` } : {}),
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
            responseHeaders[key.toLowerCase()] = value;
        });

        if (!response.ok) {
            if (response.status === 401) {
                if (!isFreeRoute) {
                    logoutToken();
                    window.location.href = '/';
                }
                return { statusCode: 401, responseData: null, headers: responseHeaders };
            }
            if (response.status === 500) {
                return { statusCode: 500, responseData: null, headers: responseHeaders };
            }
            return { statusCode: response.status, responseData: null, headers: responseHeaders };
        }

        if (response.status === 204) {
            return { statusCode: 204, responseData: null, headers: responseHeaders };
        }

        const data: Data | null = await response.json().catch(() => null);
        return { statusCode: response.status, responseData: data, headers: responseHeaders };
    } catch (error) {
        return { statusCode: 500, responseData: null, error: (error as Error).message };
    }
}

export const getData = async (url: string, params?: Record<string, any>) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
    return fetchData(`${url}${queryString}`, 'GET');
};

export const postData = async (url: string, body: any, params?: Record<string, any>) => {
    return fetchData(url, 'POST', params, body);
};

export const putData = async (url: string, body: any, params?: Record<string, any>, token?: string) => {
    return fetchData(url, 'PUT', params, body, token);
};

export const deleteData = async (url: string, params?: Record<string, any>) => {
    return fetchData(url, 'DELETE', params);
};
