import { BASE_API_URL } from '@/config';

export default {
    async getCurrentUser() {
        const accessToken = localStorage.getItem('accessToken');
        const res = await fetch(`${BASE_API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const data = await res.json();

        return {
            status: res.status,
            data,
        };
    },
};
