import { BASE_API_URL } from '@/config';
import { getAuthorizationHeader } from '@/helpers';

export default {
    async getCurrentUser() {
        const res = await fetch(`${BASE_API_URL}/users/me`, {
            headers: {
                ...getAuthorizationHeader(),
            },
        });

        const data = await res.json();

        return {
            status: res.status,
            data,
        };
    },
};
