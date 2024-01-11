import { BASE_API_URL } from '@/config';

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
        const accessToken = localStorage.getItem('accessToken');
        const res = await fetch(`${BASE_API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
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
