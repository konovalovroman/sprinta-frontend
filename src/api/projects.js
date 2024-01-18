import { BASE_API_URL } from '@/config';
import { getAccessToken } from '@/helpers';

export default {
    async getAllUserProjects() {
        const res = await fetch(`${BASE_API_URL}/projects`, {
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
    async createProject(payload) {
        const res = await fetch(`${BASE_API_URL}/projects`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
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
