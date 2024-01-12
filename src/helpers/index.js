export const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};

export const HttpStatuses = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export const LocalStorageKeys = {
    ACCESS_TOKEN: 'accessToken',
};

export const getAuthorizationHeader = () => {
    const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);

    return {
        'Authorization': `Bearer ${accessToken}`,
    };
};
