import { BASE_API_URL } from '@/config';

export default {
    async getAllUserProjects() {
        const accessToken = localStorage.getItem('accessToken');

        const res = await fetch(`${BASE_API_URL}/projects`, {
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
    async createProject(payload) {
        const accessToken = localStorage.getItem('accessToken');

        const res = await fetch(`${BASE_API_URL}/projects`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
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
