import * as types from './../types'
import axios from 'axios'
import { HOST } from '../../component/Host'

export const handleGetQuery = (id, token) => ({
    type: types.GET_QUERY_LINKS,
    payload: axios({
        method: 'GET',
        url: `${HOST}/api/user/${id}/links/v1`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
})

export const handleAddQuery = (params) => ({
    type: types.ADD_QUERY_LINKS,
    payload: axios({
        method: 'POST',
        url: `${HOST}/api/user/${params.id}/link/v1`,
        headers: {
            Authorization: `Bearer ${params.token}`
        },
        data: {
            title: params.title,
            url_in: params.url,
            redirect: params.redirect
        }
    })
})

export const handleEditQuery = (params) => ({
    type: types.EDIT_QUERY_LINKS,
    payload: axios({
        method: 'PUT',
        url: `${HOST}/api/user/${params.userid}/link/${params.id}/v1`,
        headers: {
            Authorization: `Bearer ${params.token}`
        },
        data: {
            title: params.title,
            url_in: params.url,
            redirect: params.redirect
        }
    })
})

export const handleDeleteQuery = (params) => ({
    type: types.DELETE_QUERY_LINKS,
    payload: axios({
        method: 'DELETE',
        url: `${HOST}/api/user/${params.userid}/link/${params.id}/v1`,
        headers: {
            Authorization: `Bearer ${params.token}`
        }
    }),
})

export const handleRedirect = (params) => ({
    type: types.REDIRECT_QUERY_LINKS,
    payload: axios({
        method: 'PATCH',
        url: `${HOST}/api/user/${params.userid}/link/${params.id}/redirect/v1`,
        headers: {
            Authorization: `Bearer ${params.token}`
        },
        data:{
            redirect: params.redirect
        }
    })
})