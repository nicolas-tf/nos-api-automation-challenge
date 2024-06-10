import { AUTHORIZATION, ENDPOINTS, METHODS, PAGINATION } from '../constants/constants'

// Method to return '/id' if id is a non-null
const processId = (id) => id ? `/${id}` : ''

function get_user({ 
    id, 
    page, 
    per_page, 
    valid_access_token = true 
}) {
    return cy.api({
        url: ENDPOINTS.USER + processId(id),
        method: METHODS.GET,
        auth: AUTHORIZATION(valid_access_token),
        qs: PAGINATION(page, per_page),
        failOnStatusCode: false
    })
}

function delete_user({ 
    id, 
    valid_access_token = true 
}) {
    return cy.api({
        url: ENDPOINTS.USER + processId(id),
        method: METHODS.DELETE,
        auth: AUTHORIZATION(valid_access_token),
        failOnStatusCode: false
    })
}

function post_user({
    name,
    email,
    gender,
    status,
    valid_access_token = true
}) {
    return cy.api({
        url: ENDPOINTS.USER,
        method: METHODS.POST,
        auth: AUTHORIZATION(valid_access_token),
        body: {
            name: name,
            email: email,
            gender: gender,
            status: status
        },
        failOnStatusCode: false
    })
}

function patch_user({ 
    id, 
    name, 
    gender, 
    email, 
    status, 
    valid_access_token = true 
}) {
    return cy.api({
        url: ENDPOINTS.USER + processId(id),
        method: METHODS.PATCH,
        auth: AUTHORIZATION(valid_access_token),
        body: {
            name: name,
            gender: gender,
            email: email,
            status: status
        },
        failOnStatusCode: false
    })
}

function put_user({ 
    id, 
    name, 
    gender, 
    email, 
    status, 
    valid_access_token = true 
}) {
    return cy.api({
        url: ENDPOINTS.USER + processId(id),
        method: METHODS.PUT,
        auth: AUTHORIZATION(valid_access_token),
        body: {
            name: name,
            gender: gender,
            email: email,
            status: status
        },
        failOnStatusCode: false
    })
}

export {
    get_user,
    delete_user,
    post_user,
    patch_user,
    put_user
}