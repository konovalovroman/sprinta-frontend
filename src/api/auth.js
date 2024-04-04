import { BASE_API_URL } from '@/config';
import { getAccessToken } from '@/helpers';

export default {
    async signIn(payload) {
        const res = await fetch(`${BASE_API_URL}/auth/local/signin`, {
            method: 'POST',
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
            method: 'POST',
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
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
            },
        });

        return { status: res.status };
    },
    async refreshTokens() {
        const res = await fetch(`${BASE_API_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        });

        const data = await res.json();

        return {
            status: res.status,
            data,
        };
    },
};
