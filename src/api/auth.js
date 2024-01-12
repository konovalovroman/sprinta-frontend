import { BASE_API_URL } from '@/config';
import { HttpMethods, getAuthorizationHeader } from '@/helpers';

export default {
    async signIn(payload) {
        const res = await fetch(`${BASE_API_URL}/auth/local/signin`, {
            method: HttpMethods.POST,
            body: JSON.stringify(payload),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        return {
            status: res.status,
            data,
        };
    },
    async signUp(payload) {
        const res = await fetch(`${BASE_API_URL}/auth/local/signup`, {
            method: HttpMethods.POST,
            body: JSON.stringify(payload),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        return {
            status: res.status,
            data,
        };
    },
    async logout() {
        const res = await fetch(`${BASE_API_URL}/auth/logout`, {
            method: HttpMethods.POST,
            credentials: 'include',
            headers: {
                ...getAuthorizationHeader(),
            },
        });

        return { status: res.status };
    },
    async refreshTokens() {
        const res = await fetch(`${BASE_API_URL}/auth/refresh`, {
            method: HttpMethods.POST,
            credentials: 'include',
        });

        const data = await res.json();

        return {
            status: res.status,
            data,
        };
    },
};
