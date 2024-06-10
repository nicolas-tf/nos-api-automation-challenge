
// API Version
const VERSION = Cypress.env('version')

// Request Paramenters
const AUTHORIZATION = (valid = true) => valid ? { bearer: Cypress.env('ACCESS_TOKEN') } : { bearer: 'invalid' }

const PAGINATION = (page = 1, per_page = 20) => { return { page, per_page } }

// Request methods
const METHODS = {
    DELETE: 'DELETE',
    GET: 'GET',
    PATCH: 'PATCH',
    POST: 'POST',
    PUT: 'PUT'
}

// Endpoints
const ENDPOINTS = {
    COMMENTS: VERSION + 'comments',
    POSTS: VERSION + 'posts',
    TODO: VERSION + 'todos',
    USER: VERSION + 'users'
}

export {
    VERSION,
    AUTHORIZATION,
    PAGINATION,
    METHODS,
    ENDPOINTS
}
