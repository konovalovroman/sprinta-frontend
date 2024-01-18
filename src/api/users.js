import { BASE_API_URL } from '@/config';
import { getAccessToken } from '@/helpers';

export default {
    async getCurrentUser() {
        const res = await fetch(`${BASE_API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
            },
        });

        const data = await res.json();

        return {
            status: res.status,
            data,
        };
    },
};
