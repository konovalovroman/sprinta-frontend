import { BASE_API_URL } from '@/config';
import { getAccessToken } from '@/helpers';

export default {
    async getSprintsForProject(projectId) {
        const res = await fetch(`${BASE_API_URL}/sprints/projects/${projectId}`, {
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
    async createSprint(payload) {
        const res = await fetch(`${BASE_API_URL}/sprints`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        return {
            status: res.status,
            data,
        };
    },
};
