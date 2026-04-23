import { postData } from "@utils/connection/Connection";
import { saveToken } from "@utils/security/Security";
import { LoginInterface } from "@utils/interfaces/pages-interfaces/public-routes/InterfacesLogin";
import { LoginResponse } from "@utils/interfaces/common-interfaces/InterfacesUser";

// Adjust header name to match what the API actually sends (e.g. 'authorization', 'token', 'access-token')
const TOKEN_HEADER = 'authorization';

export const loginService = {
    fetchLogin: async (request: LoginInterface): Promise<LoginResponse | null> => {
        const response = await postData('users/login', request);
        if (response.statusCode !== 200) {
            return null;
        }

        const rawToken = response.headers?.[TOKEN_HEADER];
        if (rawToken) {
            const token = rawToken.startsWith('Bearer ') ? rawToken.slice(7) : rawToken;
            saveToken(token);
        }

        return response.responseData as LoginResponse;
    },
};
