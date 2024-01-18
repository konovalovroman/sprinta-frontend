export const HttpStatus = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

export function setAccessToken(token) {
    return localStorage.setItem('accessToken', token);
}

export function clearAccessToken() {
    return localStorage.removeItem('accessToken');
}
