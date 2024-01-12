import { BASE_API_URL } from '@/config';
import { HttpMethods, getAuthorizationHeader } from '@/helpers';

export default {
    async getAllUserProjects() {
        const res = await fetch(`${BASE_API_URL}/projects`, {
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
    async createProject(payload) {
        const res = await fetch(`${BASE_API_URL}/projects`, {
            method: HttpMethods.POST,
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
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
